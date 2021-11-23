import { IDisposable } from '@lumino/disposable';
import { NotebookActions } from '@jupyterlab/notebook';
import { NotebookPanel, Notebook } from '@jupyterlab/notebook';
import { Cell, ICellModel } from '@jupyterlab/cells';
import { StickyContent } from './content';
import { StickyMarkdown } from './markdown';
import { StickyCode } from './code';
import { StickyLand } from './stickyland';
import { ContentType } from './content';
import { MyIcons } from './icons';

export type Tab = {
  cellType: ContentType;
  cellIndex: number;
  tabNode: HTMLElement;
  tabContent: StickyContent;
  hasNewUpdate: boolean;
};

export class StickyTab implements IDisposable {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  stickyLand: StickyLand;
  notebook: NotebookPanel;
  addButton: HTMLElement;
  activeTab: Tab | null = null;
  tabs: Tab[] = [];

  autoRunTimeout: number | null = null;
  autoRunningCellNodes: Set<HTMLElement> = new Set([]);
  autoRunCells = new Array<StickyCode>();
  autoRunTabs = new Array<Tab>();
  isDisposed = false;

  constructor(
    stickyContainer: HTMLElement,
    panel: NotebookPanel,
    stickyLand: StickyLand
  ) {
    this.stickyContainer = stickyContainer;
    this.stickyLand = stickyLand;
    this.notebook = panel;

    // Add the tab element
    this.node = document.createElement('div');
    this.node.classList.add('sticky-tab', 'sticky-tab-bar');
    this.stickyContainer.append(this.node);

    // Add new cell button
    this.addButton = document.createElement('button');
    this.addButton.classList.add('add-tab');
    this.node.appendChild(this.addButton);
    MyIcons.addIcon2.element({ container: this.addButton });

    this.addButton.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Create a new tab and switch the active tab
      this.createTab();
    });

    // Create the first tab
    this.createTab();

    /**
     * Listen to the notebook execution events so we can auto-run the code cell
     * We need to register the listener at the tab level because there can be
     * multiple code cells with auto-run turned on. If each triggers its own
     * listener then there will be a race and infinite auto-runs.
     */
    NotebookActions.executionScheduled.connect(
      this.handleExecutionScheduled,
      this
    );
    NotebookActions.executed.connect(this.handleExecuted, this);
  }

  /**
   * Handle the executionScheduled signal.
   */
  handleExecutionScheduled = (
    _: any,
    args: {
      notebook: Notebook;
      cell: Cell<ICellModel>;
    }
  ) => {
    if (this.autoRunningCellNodes.size !== 0) {
      return;
    }

    // Get all the code cells that have auto-run turned on
    const autoRunCells = new Array<StickyCode>();
    const autoRunTabs = new Array<Tab>();

    this.tabs.forEach(d => {
      if (d.cellType === ContentType.Code) {
        const curContent = d.tabContent.curContent as StickyCode;
        if (curContent.autoRun) {
          autoRunCells.push(curContent);
          autoRunTabs.push(d);
        }
      }
    });

    // We need to set a timeout to workaround the current executionScheduled
    // emit order
    // https://github.com/jupyterlab/jupyterlab/pull/11453

    // Also users might run multiple cells at one time, we can set a short
    // timeout so that we only run the sticky code cell once in a series of
    // other executions of other cells
    if (this.autoRunTimeout !== null) {
      clearTimeout(this.autoRunTimeout);
    }

    this.autoRunTimeout = setTimeout(() => {
      // Run the auto-run code cells
      const toRunCells = new Array<StickyCode>();

      autoRunCells.forEach(d => {
        // If the signal source is the cell itself, we mark it as autoRunScheduled
        // so we won't run it again after its peers finish running
        if (d.originalCell.node === args.cell.node) {
          d.autoRunScheduled = true;
        } else {
          if (!d.autoRunScheduled) {
            d.autoRunScheduled = true;

            // d.execute returns a promise but the promise can be fulfilled before
            // the cell is executed, so we manually keep a record of all running
            // cells and resolve them manually
            toRunCells.push(d);
            this.autoRunningCellNodes.add(d.originalCell.node);
          }
        }
      });

      toRunCells.forEach(d => d.execute(true));

      // Move the local autoRunCells/autoRunTabs to object level
      this.autoRunCells = autoRunCells;
      this.autoRunTabs = autoRunTabs;
    }, 200);
  };

  /**
   * Handle the executed signal.
   */
  handleExecuted = (
    _: any,
    args: {
      notebook: Notebook;
      cell: Cell<ICellModel>;
    }
  ) => {
    // Check if the cell that just finishes running is scheduled by us
    if (this.autoRunningCellNodes.has(args.cell.node)) {
      // Remove watching this cell
      this.autoRunningCellNodes.delete(args.cell.node);

      // If all auto-running cells finish running, we allow all these cells to
      // be auto-run again in the future
      if (this.autoRunningCellNodes.size === 0) {
        this.autoRunCells.forEach(d => {
          d.autoRunScheduled = false;
        });

        // Also mark the tab to indicate there is new update in this tab
        this.autoRunTabs.forEach(d => {
          // const curCell = d.tabContent.curContent as StickyCode;
          if (!d.tabNode.classList.contains('current')) {
            d.tabNode.classList.add('new-update');
          }
        });

        this.autoRunCells = [];
        this.autoRunTabs = [];
      }
    }
  };

  /**
   * Create a tab containing a dropzone content. The tab name is always 'new'
   * for new tabs. Creating a different content (after interacting with the
   * dropzone will update the tab name).
   * @returns New tab
   */
  createTab = (): Tab => {
    // Create a new tab node
    const tabNode = document.createElement('button');
    tabNode.classList.add('tab', 'new-tab');
    tabNode.setAttribute('title', 'New tab');

    // Add a label to the button
    const tabLabel = document.createElement('span');
    tabLabel.classList.add('tab-label');
    tabNode.appendChild(tabLabel);

    // Add a delete icon
    const tabIcon = document.createElement('div');
    tabIcon.classList.add('tab-icon');
    MyIcons.tabCloseIcon.element({ container: tabIcon });
    tabNode.appendChild(tabIcon);

    // New tab always has the dropzone content
    tabLabel.innerHTML = 'New';
    const tabContent = new StickyContent(
      this.stickyContainer,
      this.notebook,
      this.stickyLand
    );

    // Add this tab to the model and view
    const newTab: Tab = {
      cellType: ContentType.Dropzone,
      cellIndex: 0,
      tabNode: tabNode,
      tabContent: tabContent,
      hasNewUpdate: false
    };

    // Handle delete icon clicked
    tabIcon.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeTab(newTab);
    });

    this.tabs.push(newTab);
    this.node.insertBefore(newTab.tabNode, this.addButton);

    // Handle tab clicked
    tabNode.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Switch the active tab to the current one
      if (this.activeTab?.tabNode !== tabNode) {
        this.switchActiveTab(newTab);

        // Remove the new update if it's there
        newTab.tabNode.classList.remove('new-update');
      }
    });

    // Move the current active tab to this new one
    this.switchActiveTab(newTab);

    // Return this tab
    return newTab;
  };

  /**
   * Close the given tab
   * @param tab Tab to close
   */
  closeTab = (tab: Tab) => {
    // Case 1: this tab is the only tab
    if (this.tabs.length === 1) {
      // Swap the content to dropzone
      tab.tabContent.swapToDropzone();

      // Update the tab name
      this.updateActiveTab();
    } else {
      // Case 2: if there are other tabs
      // First swap the content to dropzone
      tab.tabContent.swapToDropzone();

      // Then remove the content
      tab.tabContent.dispose();

      // Prepare to remove the tab
      const tabIndex = this.tabs.indexOf(tab);

      // Change the active tab to the one on the left or on the right if there
      // is no tab on the left
      if (tabIndex !== 0) {
        this.switchActiveTab(this.tabs[tabIndex - 1]);
      } else {
        this.switchActiveTab(this.tabs[tabIndex + 1]);
      }

      // Remove the tab from model
      this.tabs.splice(tabIndex, 1);

      // Remove the tab from the DOM
      tab.tabNode.remove();
    }
  };

  /**
   * Change the currently active tab to the new tab
   */
  switchActiveTab = (newTab: Tab) => {
    if (this.activeTab) {
      // Hide the old active tab's content
      this.activeTab.tabContent.wrapperNode.classList.add('no-display');
      this.activeTab.tabNode.classList.remove('current');
    }

    this.activeTab = newTab;
    newTab.tabNode.classList.add('current');
    newTab.tabContent.wrapperNode.classList.remove('no-display');
    this.stickyLand.stickyContent = newTab.tabContent;
  };

  /**
   * Update the tab name for the active tab. This function is called when user
   * creates a new code/md cell.
   */
  updateActiveTab = () => {
    if (this.activeTab) {
      const newContent = this.activeTab?.tabContent.curContent;

      // Find the new content type
      let newCellType = ContentType.Dropzone;
      if (newContent instanceof StickyCode) {
        newCellType = ContentType.Code;
      } else if (newContent instanceof StickyMarkdown) {
        newCellType = ContentType.Markdown;
      }

      // Find the new cell index
      let newCellIndex = 1;
      this.tabs.forEach(d => {
        if (d.cellType === newCellType) {
          newCellIndex++;
        }
      });

      // Update the tab name
      const tabLabel = this.activeTab.tabNode.querySelector('.tab-label');

      if (tabLabel) {
        switch (newCellType) {
          case ContentType.Code:
            tabLabel.innerHTML = `Code-${newCellIndex}`;
            this.activeTab.tabNode.setAttribute(
              'title',
              `Code-${newCellIndex}`
            );
            this.activeTab.tabNode.classList.remove('new-tab');
            break;

          case ContentType.Markdown:
            tabLabel.innerHTML = `Markdown-${newCellIndex}`;
            this.activeTab.tabNode.setAttribute(
              'title',
              `Markdown-${newCellIndex}`
            );
            this.activeTab.tabNode.classList.remove('new-tab');
            break;

          case ContentType.Dropzone:
            tabLabel.innerHTML = 'New';
            this.activeTab.tabNode.setAttribute('title', 'New tab');
            this.activeTab.tabNode.classList.add('new-tab');
            break;

          default:
            break;
        }
      }

      // Update the model data
      this.activeTab.cellIndex = newCellIndex;
      this.activeTab.cellType = newCellType;
    }
  };

  dispose = () => {
    this.isDisposed = true;
    NotebookActions.executionScheduled.disconnect(
      this.handleExecutionScheduled,
      this
    );
    NotebookActions.executed.disconnect(this.handleExecuted, this);
  };
}
