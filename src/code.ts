import { IDisposable } from '@lumino/disposable';
import { LabIcon, Switch } from '@jupyterlab/ui-components';
import { NotebookPanel, NotebookActions, Notebook } from '@jupyterlab/notebook';
import { IChangedArgs } from '@jupyterlab/coreutils';
import { CodeCell, ICodeCellModel, Cell, ICellModel } from '@jupyterlab/cells';
import CodeMirror from 'codemirror';
import { ArrayExt } from '@lumino/algorithm';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { StickyContent, ContentType } from './content';
import { FloatingWindow } from './floating';
import { MyIcons } from './icons';

/**
 * Class that implements the Code cell in StickyLand.
 */
export class StickyCode implements IDisposable {
  node!: HTMLElement;
  toolbar!: HTMLElement;
  cellNode!: HTMLElement;
  editorNode!: HTMLElement | null;
  outputNode!: HTMLElement | null;
  originalExecutionCounter!: HTMLElement | null;
  private _executionCount!: number | null;
  executionCounter!: HTMLElement;
  placeholder!: HTMLElement;
  static numCd = 0;

  stickyContent!: StickyContent;
  originalCell!: CodeCell;
  cell!: CodeCell;
  toggle!: Switch;
  renderer!: IRenderMime.IRenderer;
  notebook!: NotebookPanel;
  codemirror!: CodeMirror.Editor;

  codeObserver!: MutationObserver;
  outputObserver!: MutationObserver;

  autoRun = false;
  autoRunScheduled = false;
  runScheduled = false;
  isDisposed = false;

  isFloating = false;
  floatingWindow: FloatingWindow | null = null;

  /**
   * Factory function for StickyCode when creating if from an existing cell
   * through dragging
   * @param stickyContent The sticky content that contains this markdown cell
   * @param cell The existing markdown cell
   * @param notebook The current notebook
   * @returns A new StickyCode object
   */
  static createFromExistingCell(
    stickyContent: StickyContent,
    cell: CodeCell,
    notebook: NotebookPanel
  ): StickyCode {
    const cd = new StickyCode();
    cd.stickyContent = stickyContent;
    cd.notebook = notebook;

    // Clone the cell
    cd.originalCell = cell;
    cd.cell = cd.originalCell.clone();

    // Register the original execution counter node
    cd.originalExecutionCounter = cd.originalCell.node.querySelector(
      '.jp-InputArea-prompt'
    );

    // Attach the clone node to stickyland
    cd.node = document.createElement('div');
    cd.node.classList.add('sticky-code');
    // Need to add tabindex so it can receive keyboard events
    cd.node.setAttribute('tabindex', '0');
    cd.stickyContent.contentNode.appendChild(cd.node);

    // Need to append the node to DOM first so we can do the cleaning
    cd.cellNode = cd.cell.node;
    cd.cellNode.classList.add('hidden');
    cd.node.appendChild(cd.cellNode);

    // Add a toolbar
    cd.toolbar = cd.createToolbar(cd.toolBarItems);
    cd.stickyContent.headerNode.appendChild(cd.toolbar);

    // Bind the Codemirror
    const codeMirrorNode = cd.cell.node.querySelector('.CodeMirror') as unknown;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cd.codemirror = codeMirrorNode.CodeMirror as CodeMirror.Editor;

    // Wow, for some reason the clone somehow has a different codemirror config
    // from the original cell, need to reset it here
    // https://codemirror.net/doc/manual.html#setOption
    cd.codemirror.setOption('lineWrapping', false);

    cd.executionCount = cd.cell.model.executionCount;

    // Collapse the original cell (both input and output)
    cd.originalCell.inputHidden = true;
    cd.originalCell.outputHidden = true;

    cd.cell.model.stateChanged.connect(cd.handleStateChange, cd);
    NotebookActions.executionScheduled.connect(cd.handleExecutionScheduled, cd);
    NotebookActions.executed.connect(cd.handleExecuted, cd);

    // Bind events
    cd.bindEventHandlers();

    // Clean the unnecessary elements from the node clone
    cd.cleanCellClone();

    // Add a mutation observer so we can style the execution counter based on
    // the code focus
    cd.codeObserver = new MutationObserver(cd.codeClassMutationHandler);
    cd.editorNode = cd.cellNode.querySelector('.jp-CodeMirrorEditor');
    if (cd.editorNode) {
      cd.codeObserver.observe(cd.editorNode, { attributes: true });
    }

    // Add an output area observer because we need to remove the left prompt
    // area every time the output area is updated
    cd.outputObserver = new MutationObserver(cd.codeOutputMutationHandler);
    cd.outputNode = cd.cellNode.querySelector('.jp-OutputArea');
    if (cd.outputNode) {
      cd.outputObserver.observe(cd.outputNode, { childList: true });
    }

    // Add a hidden placeholder element before the input area. We show it when
    // users collapse the input
    cd.placeholder = document.createElement('div');
    cd.placeholder.classList.add('jp-Placeholder-content', 'no-display');
    cd.placeholder.addEventListener('click', cd.expandClicked);

    if (cd.cell.node.firstElementChild !== null) {
      cd.cell.node.insertBefore(
        cd.placeholder,
        cd.cell.node.firstChild as HTMLElement
      );
    }

    const placeholderIcon = document.createElement('div');
    placeholderIcon.classList.add('jp-MoreHorizIcon', 'placeholder-icon');
    MyIcons.ellipsesIcon.element({ container: placeholderIcon });
    cd.placeholder.appendChild(placeholderIcon);

    return cd;
  }

  /**
   * We use a mutation observer to detect if the output area is redrawn.
   * Remember to disconnect the observer in the dispose() method.
   * @param mutationList Array of mutation records
   * @param observer The observer itself
   */
  codeOutputMutationHandler = (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) => {
    mutationList.forEach(d => {
      // Remove the prompt area when the output node is updated
      if (d.addedNodes !== null) {
        this.outputNode
          ?.querySelectorAll('.jp-OutputPrompt')
          ?.forEach(d => d.remove());
      }
    });
  };

  /**
   * We use a mutation observer to detect if user focuses on the code cell in
   * StickyLand. Remember to disconnect the observer in the dispose() method.
   * @param mutationList Array of mutation records
   * @param observer The observer itself
   */
  codeClassMutationHandler = (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) => {
    mutationList.forEach(d => {
      if (d.attributeName === 'class') {
        if (this.editorNode?.classList.contains('jp-mod-focused')) {
          this.executionCounter.classList.add('mod-focused');
        } else {
          this.executionCounter.classList.remove('mod-focused');
        }
      }
    });
  };

  /**
   * We listen to the execution state of this notebook. We use it to change the
   * execution counter to star if the cell is scheduled to run.
   * @param _ any
   * @param args Notebook and cell
   */
  handleExecutionScheduled = (
    _: any,
    args: {
      notebook: Notebook;
      cell: Cell<ICellModel>;
    }
  ) => {
    // Change the execution counter
    if (args.cell.node === this.originalCell.node) {
      this.runScheduled = true;
      this.executionCount = null;
      this.executionCounter.innerText = '[*]';
    }
  };

  /**
   * We listen to the execution state of this notebook. We use it to change the
   * execution counter to star if the cell is scheduled to run.
   * @param _ any
   * @param args Notebook and cell
   */
  handleExecuted = (
    _: any,
    args: {
      notebook: Notebook;
      cell: Cell<ICellModel>;
    }
  ) => {
    // Change the execution counter
    if (args.cell.node === this.originalCell.node) {
      this.runScheduled = false;
      if (this.executionCount === null) {
        this.executionCounter.innerText = '[ ]';
      }
    }
  };

  /**
   * Helper function to handle code model state changes. The state change signal
   * is emitted with anything (input, output, etc.). This function follows the
   * signal pattern from lumino
   * (https://github.com/jupyterlab/extension-examples/tree/master/signals)
   * @param model CodeCellModel
   * @param args Arguments emitted from the model emitter, an example of the
   * signal structure is listed
   * [here](https://github.com/jupyterlab/jupyterlab/blob/5755ea86fef3fdbba10cd05b23703b9d60b53226/packages/cells/src/model.ts#L774)
   * The args is {name: str, oldValue: any, newValue: any}
   */
  handleStateChange = (
    model: ICellModel,
    args: IChangedArgs<any, any, string>
  ) => {
    const codeModel = model as ICodeCellModel;

    switch (args.name) {
      case 'executionCount':
        // Update the execution count
        this.executionCount = codeModel.executionCount;

        // JupyterLab redraws the output area when code is executed, so we need
        // to hide the original output every time here
        // https://github.com/jupyterlab/jupyterlab/blob/e4e323992d24f6c5e48d181381e23c547b665b15/packages/notebook/src/actions.tsx#L1156
        if (this.originalCell.inputHidden) {
          this.originalCell.outputHidden = true;
        }

        break;
      case 'isDirty':
        // Color the execution based on the dirty state
        if (args.newValue) {
          this.executionCounter.classList.add('dirty');
        } else {
          this.executionCounter.classList.remove('dirty');
        }
        break;
      default:
        break;
    }
  };

  /**
   * Setter function for the executionCount. It also updates the count element
   */
  set executionCount(newCount: number | null) {
    this._executionCount = newCount;

    // Update the counter element
    if (newCount !== null) {
      this.executionCounter.innerText = `[${newCount}]`;
      this.runScheduled = false;
    } else {
      if (!this.runScheduled) {
        this.executionCounter.innerText = '[ ]';
      }
    }
  }

  /**
   * Getter function for the executionCount.
   */
  get executionCount() {
    return this._executionCount;
  }

  /**
   * Factory function for StickyCode when creating if from a new code cell.
   * This function would append a new markdown cell to the main notebook.
   * @param stickyContent The sticky content that contains this markdown cell
   * @param notebook The current notebook
   * @returns A new StickyCode object
   */
  static createFromNewCell(
    stickyContent: StickyContent,
    notebook: NotebookPanel
  ): StickyCode {
    // Append a new code cell to the main notebook
    NotebookActions.insertBelow(notebook.content);
    NotebookActions.changeCellType(notebook.content, 'code');

    const newCell = notebook.content.activeCell as CodeCell;

    // Activate the original active cell
    notebook.content.activeCellIndex = notebook.content.activeCellIndex - 1;

    // Construct StickyCode using the new cell as an existing cell
    return this.createFromExistingCell(stickyContent, newCell, notebook);
  }

  /**
   * Strip unnecessary elements from the nodes before appending it to stickyland
   */
  cleanCellClone = () => {
    // Remove the left region (prompt and collapser), header and footer
    this.cellNode.querySelector('.jp-Cell-inputCollapser')?.remove();
    this.cellNode.querySelector('.jp-OutputCollapser')?.remove();
    this.cellNode.querySelector('.jp-InputArea-prompt')?.remove();
    this.cellNode
      .querySelectorAll('.jp-OutputPrompt')
      ?.forEach(d => d.remove());
    this.cellNode.querySelector('.jp-CellHeader')?.remove();
    this.cellNode.querySelector('.jp-CellFooter')?.remove();

    // Add class name to the rendered region
    this.cellNode
      .querySelector('.jp-OutputArea')
      ?.classList.add('sticky-code-output');
    this.cellNode.classList.add('sticky-code-cell');

    this.cellNode.classList.remove('hidden');
  };

  /**
   * Create a toolbar element
   * @param items List of toolbar item names and onclick handlers
   */
  createToolbar = (
    items: {
      name: string;
      title: string;
      icon: LabIcon;
      onClick: (e: Event) => any;
    }[]
  ): HTMLElement => {
    const toolbar = document.createElement('div');
    toolbar.classList.add(
      'sticky-toolbar',
      'jp-Toolbar',
      'sticky-code-toolbar'
    );

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('toolbar-buttons');

    const statusGroup = document.createElement('div');
    statusGroup.classList.add('toolbar-status');

    toolbar.appendChild(buttonGroup);
    toolbar.appendChild(statusGroup);

    // Add buttons into the toolbar
    items.forEach(d => {
      const item = document.createElement('div');
      item.classList.add('jp-ToolbarButton', 'jp-Toolbar-item');
      buttonGroup.appendChild(item);

      const itemElem = document.createElement('button');
      itemElem.classList.add(
        'jp-ToolbarButtonComponent',
        'button',
        'jp-Button',
        'toolbar-button',
        'bp3-button',
        'bp3-minimal',
        `button-${d.name}`
      );
      itemElem.setAttribute('title', d.title);
      itemElem.addEventListener('click', d.onClick);
      item.appendChild(itemElem);

      // Add icon to the button
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('jp-ToolbarButtonComponent-icon');
      itemElem.appendChild(iconSpan);

      d.icon.element({
        container: iconSpan
      });
    });

    // Hide the expand button at first
    buttonGroup
      .querySelector('.button-expand')
      ?.parentElement?.classList.add('no-display');

    // Add a toggle switch into the toolbar
    this.toggle = new Switch();

    this.toggle.valueChanged.connect((_, args) => {
      this.autoRun = args.newValue;
    });
    this.toggle.value = this.autoRun;
    this.toggle.label = 'auto-run';

    // Add a tooltip title
    this.toggle.node.setAttribute(
      'title',
      'Automatically run this cell after any other cell is executed'
    );

    // Here we are not correctly attach the widget to a layout, so we need to
    // manually trigger the event binding
    const toggleSwitchNode = this.toggle.node.querySelector('.jp-switch');
    toggleSwitchNode?.addEventListener('click', this.toggle);

    buttonGroup.appendChild(this.toggle.node);

    // Add an execution counter into the toolbar
    this.executionCounter = document.createElement('div');
    this.executionCounter.classList.add('execution-counter');
    statusGroup.appendChild(this.executionCounter);

    return toolbar;
  };

  /**
   * Run the code cell. The implementation logic is: (1) change the original cell
   * as the active cell, (2) use the NotebookActions to run the current active
   * cell
   */
  execute = (restoreActiveCell = false) => {
    const restoreActiveCellIndex = this.notebook.content.activeCellIndex;

    // Find the cell index of the original cell
    // Note it can change as users can insert cells above and below the cell
    // Jupyter lab internally iterates through all widgets to find the index
    // https://github.com/jupyterlab/jupyterlab/blob/5755ea86fef3fdbba10cd05b23703b9d60b53226/packages/notebook/src/widget.ts#L1803
    const cellIndex = ArrayExt.findFirstIndex(
      this.notebook.content.widgets,
      widget => widget.node === this.originalCell.node
    );

    // Change the active cell to the original cell
    this.notebook.content.activeCellIndex = cellIndex;

    // Blur the focused editor
    this.cell.editor.blur();

    // Run the active cell
    const runPromise = NotebookActions.run(
      this.notebook.content,
      this.notebook.context.sessionContext
    );

    // Restore the active cell if needed
    if (restoreActiveCell) {
      this.notebook.content.activeCellIndex = restoreActiveCellIndex;
    }

    return runPromise;
  };

  /**
   * Float the current code cell.
   */
  float = () => {
    // Create the floating window and put content from stickyland to the floating
    // window
    this.floatingWindow = new FloatingWindow(ContentType.Code, this);

    // Finally, toggle the `isFloating` property
    this.isFloating = true;
  };

  runClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Run the cell
    this.execute(true);
  };

  launchClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.float();
  };

  closeClicked = () => {
    // Show the original cell
    this.originalCell.inputHidden = false;
    this.originalCell.outputHidden = false;

    // TEMP: replace the current content with the dropzone
    this.stickyContent.showDropzone();

    // Remove the code cell
    this.dispose();
  };

  collapseClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Hide the input region
    this.cell.inputHidden = true;

    // Swap the icon in the toolbar
    this.stickyContent.headerNode
      .querySelector('.button-collapse')
      ?.parentElement?.classList.add('no-display');

    this.stickyContent.headerNode
      .querySelector('.button-expand')
      ?.parentElement?.classList.remove('no-display');

    // Show the input placeholder
    this.placeholder.classList.remove('no-display');
  };

  expandClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Hide the input region
    this.cell.inputHidden = false;

    // Swap the icon in the toolbar
    this.stickyContent.headerNode
      .querySelector('.button-collapse')
      ?.parentElement?.classList.remove('no-display');

    this.stickyContent.headerNode
      .querySelector('.button-expand')
      ?.parentElement?.classList.add('no-display');

    // Hide the input placeholder
    this.placeholder.classList.add('no-display');
  };

  toolBarItems = [
    {
      name: 'run',
      title: 'Run the cell',
      icon: MyIcons.runIcon,
      onClick: this.runClicked
    },
    {
      name: 'collapse',
      title: 'Hide the input',
      icon: MyIcons.collapseIcon,
      onClick: this.collapseClicked
    },
    {
      name: 'expand',
      title: 'Show the input',
      icon: MyIcons.expandIcon,
      onClick: this.expandClicked
    },
    {
      name: 'launch',
      title: 'Make the cell float',
      icon: MyIcons.launchIcon,
      onClick: this.launchClicked
    }
  ];

  /**
   * Bind event handlers for sticky code cell.
   */
  bindEventHandlers = () => {
    // Bind keyboard shortcuts
    this.node.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey || e.ctrlKey) {
          // [Shift + enter] or [control + enter] runs the code cell
          this.execute(true);
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
  };

  dispose() {
    // Disconnect signal handlers
    this.codeObserver.disconnect();
    this.toggle.dispose();

    // Disconnect notebook execution signal
    NotebookActions.executionScheduled.disconnect(
      this.handleExecutionScheduled,
      this
    );
    NotebookActions.executed.disconnect(this.handleExecuted, this);

    // Remove nodes
    this.node.remove();
    this.toolbar.remove();

    this.isDisposed = true;
  }
}
