import { Widget, BoxLayout } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import {
  LabIcon,
  runIcon,
  editIcon,
  launcherIcon,
  closeIcon
} from '@jupyterlab/ui-components';
import {
  NotebookPanel,
  INotebookModel,
  INotebookTracker,
  NotebookActions
} from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';
import { ICodeMirror } from '@jupyterlab/codemirror';
import CodeMirror from 'codemirror';
import { toArray } from '@lumino/algorithm';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { StickyContent, ContentType } from './content';

/**
 * Class that implements the Code cell in StickyLand.
 */
export class StickyCode implements IDisposable {
  stickyContent!: StickyContent;
  node!: HTMLElement;
  cellNode!: HTMLElement;
  originalCell!: CodeCell;
  cell!: CodeCell;
  renderer!: IRenderMime.IRenderer;
  notebook!: NotebookPanel;
  codemirror!: CodeMirror.Editor;
  isDisposed = false;

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

    // Attach the clone node to stickyland
    cd.node = document.createElement('div');
    cd.node.classList.add('sticky-code');
    // Need to add tabindex so it can receive keyboard events
    cd.node.setAttribute('tabindex', '0');
    cd.stickyContent.contentNode.appendChild(cd.node);

    // Need to append the node to DOM first so we can do the cleaning
    cd.cellNode = cd.cell.node;
    // cd.cellNode.classList.add('hidden');
    cd.node.appendChild(cd.cellNode);

    console.log(notebook.model);

    return cd;
  }

  /**
   * Factory function for StickyCode when creating if from a new markdown
   * cell. This function would append a new markdown cell to the main notebook.
   * @param stickyContent The sticky content that contains this markdown cell
   * @param notebook The current notebook
   * @returns A new StickyCode object
   */
  static createFromNewCell(
    stickyContent: StickyContent,
    notebook: NotebookPanel
  ): StickyCode {
    // Append a new markdown cell to the main notebook
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
    // this.cellNode.querySelector('.jp-Cell-inputCollapser')?.remove();
    // this.cellNode.querySelector('.jp-InputArea-prompt')?.remove();
    // this.cellNode.querySelector('.jp-CellHeader')?.remove();
    // this.cellNode.querySelector('.jp-CellFooter')?.remove();
    // // Add class name to the rendered region
    // this.cellNode
    //   .querySelector('.jp-MarkdownOutput')
    //   ?.classList.add('sticky-md-output');
    // this.cellNode.classList.add('sticky-md-cell');
    // this.cellNode.classList.remove('hidden');
  };

  /**
   * Bind event handlers for sticky markdown cell.
   */
  bindEventHandlers = () => {
    // Double click the rendered view should trigger editor
    this.node.addEventListener('dblclick', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    });

    // Click on the rendered view should focus the current element
    this.node.addEventListener('click', (e: MouseEvent) => {
      // if (this.cell.rendered) {
      //   this.node.focus();
      // }
    });

    // Bind keyboard short cuts
    this.node.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey || e.ctrlKey) {
          // [Shift + enter] or [control + enter] render the markdown cell
          e.preventDefault();
          e.stopPropagation();
        } else {
          // [Enter] in rendered mode triggers the editor
        }
      }
    });
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
    toolbar.classList.add('sticky-toolbar', 'jp-Toolbar');

    // Add buttons into the toolbar
    items.forEach(d => {
      const item = document.createElement('div');
      item.classList.add('jp-ToolbarButton', 'jp-Toolbar-item');
      toolbar.appendChild(item);

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

    return toolbar;
  };

  editClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Show the editing area
  };

  runClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Render the markdown
  };

  launchClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(this.cell.editor.getCursorPosition());

    console.log('Launch clicked!');
  };

  closeClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('Close clicked!');
  };

  toolBarItems = [
    {
      name: 'run',
      title: 'Run the cell',
      icon: runIcon,
      onClick: this.runClicked
    },
    {
      name: 'edit',
      title: 'Edit the cell',
      icon: editIcon,
      onClick: this.editClicked
    },
    {
      name: 'launch',
      title: 'Make the cell float',
      icon: launcherIcon,
      onClick: this.launchClicked
    },
    {
      name: 'close',
      title: 'Remove the cell',
      icon: closeIcon,
      onClick: this.closeClicked
    }
  ];

  dispose() {
    this.node.remove();
    this.isDisposed = true;
  }
}
