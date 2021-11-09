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
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';
import { ICodeMirror } from '@jupyterlab/codemirror';
import CodeMirror from 'codemirror';
import { toArray } from '@lumino/algorithm';
import { StickyContent, ContentType } from './content';

/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
export class StickyMarkdown implements IDisposable {
  stickyContent!: StickyContent;
  node!: HTMLElement;
  cellNode!: HTMLElement;
  originalCell!: MarkdownCell;
  cell!: MarkdownCell;
  notebook!: NotebookPanel;
  codemirror!: CodeMirror.Editor;
  isDisposed = false;

  /**
   * Factory function for StickyMarkdown when creating if from an existing cell
   * through dragging
   * @param stickyContent The sticky content that contains this markdown cell
   * @param cell The existing markdown cell
   * @param notebook The current notebook
   * @returns A new StickyMarkdown object
   */
  static createFromExistingCell(
    stickyContent: StickyContent,
    cell: MarkdownCell,
    notebook: NotebookPanel
  ): StickyMarkdown {
    const md = new StickyMarkdown();
    md.stickyContent = stickyContent;
    md.cell = cell;
    md.notebook = notebook;

    // Clone the cell
    md.originalCell = cell;
    md.cell = md.originalCell.clone();

    // Collapse the original cell
    if (!md.originalCell.inputHidden) {
      md.originalCell.inputHidden = true;
    }

    console.log(md.originalCell);
    console.log(md.cell);

    // Add a dropzone element (providing feedback of drag-and-drop)
    md.node = document.createElement('div');
    md.node.classList.add('sticky-md');
    // Need to add tabindex so it can receive keyboard events
    md.node.setAttribute('tabindex', '0');
    md.stickyContent.contentNode.appendChild(md.node);

    console.log(notebook.model);

    // Add a toolbar
    const toolbar = md.createToolbar(md.toolBarItems);
    md.stickyContent.headerNode.appendChild(toolbar);

    // Clean the markdown cell
    // Need to append the node to DOM first so we can do the cleaning
    md.cellNode = md.cell.node;
    md.cellNode.classList.add('hidden');
    md.node.appendChild(md.cellNode);

    // Bind the Codemirror
    const codeMirrorNode = md.cell.node.querySelector('.CodeMirror') as unknown;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    md.codemirror = codeMirrorNode.CodeMirror as CodeMirror.Editor;
    console.log(md.codemirror);

    // Bind events
    md.bindEventHandlers();

    // Clean the unnecessary elements from the node clone
    md.cleanCellClone();

    return md;
  }

  /**
   * Strip unnecessary elements from the nodes before appending it to stickyland
   */
  cleanCellClone = () => {
    // Remove the left region (prompt and collapser), header and footer
    this.cellNode.querySelector('.jp-Cell-inputCollapser')?.remove();
    this.cellNode.querySelector('.jp-InputArea-prompt')?.remove();
    this.cellNode.querySelector('.jp-CellHeader')?.remove();
    this.cellNode.querySelector('.jp-CellFooter')?.remove();

    // Add class name to the rendered region
    this.cellNode
      .querySelector('.jp-MarkdownOutput')
      ?.classList.add('sticky-md-output');

    this.cellNode.classList.add('sticky-md-cell');
    this.cellNode.classList.remove('hidden');
  };

  /**
   * Bind event handlers for sticky markdown cell.
   */
  bindEventHandlers = () => {
    // Double click the rendered view should trigger editor
    this.node.addEventListener('dblclick', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.cell.rendered) {
        this.enterEditor();
      }
    });

    // Click on the rendered view should focus the current element
    this.node.addEventListener('click', (e: MouseEvent) => {
      if (this.cell.rendered) {
        this.node.focus();
      }
    });

    // Bind keyboard short cuts
    this.node.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey || e.ctrlKey) {
          // [Shift + enter] or [control + enter] render the markdown cell
          if (!this.cell.rendered) {
            this.quitEditor();
          }
          e.preventDefault();
          e.stopPropagation();
        } else {
          // [Enter] in rendered mode triggers the editor
          if (this.cell.rendered) {
            this.enterEditor();
            e.preventDefault();
            e.stopPropagation();
          }
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

  /**
   * Helper function to enter the editor mode.
   */
  enterEditor = () => {
    // Trigger the editor
    this.cell.rendered = false;

    // Move the cursor on the first line before the first character
    this.cell.editor.focus();
    this.cell.editor.setCursorPosition({ line: 0, column: 0 });
  };

  /**
   * Helper function to quit the editor mode.
   */
  quitEditor = () => {
    // Trigger the rendered output
    this.cell.rendered = true;

    // Focus the cell node so we can listen to keyboard events
    this.node.focus();
  };

  editClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Show the editing area
    if (this.cell.rendered) {
      this.enterEditor();
    }
  };

  runClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Render the markdown
    if (!this.cell.rendered) {
      this.quitEditor();
    }
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
