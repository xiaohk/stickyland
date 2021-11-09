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
import { toArray } from '@lumino/algorithm';
import { StickyContent, ContentType } from './content';

/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
export class StickyMarkdown implements IDisposable {
  stickyContent: StickyContent;
  node: HTMLElement;
  cellNode: HTMLElement;
  cell: MarkdownCell;
  notebook: NotebookPanel;
  iCodeMirror: ICodeMirror;
  isDisposed = false;

  constructor(
    stickyContent: StickyContent,
    cell: MarkdownCell,
    notebook: NotebookPanel
  ) {
    this.stickyContent = stickyContent;
    this.cell = cell;
    this.notebook = notebook;

    console.log(this.cell);

    // Add a dropzone element (providing feedback of drag-and-drop)
    this.node = document.createElement('div');
    this.node.classList.add('sticky-md');
    this.stickyContent.contentNode.appendChild(this.node);

    console.log(notebook.model);

    // Initialize the content
    // const layout = panel.layout as BoxLayout;
    // layout.addWidget(cell);

    // Add a toolbar
    const toolBarItems = [
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
    const toolbar = this.createToolbar(toolBarItems);
    this.stickyContent.headerNode.appendChild(toolbar);

    // Clean the markdown cell
    // Need to append the node to DOM first so we can do the cleaning
    this.cellNode = this.cell.node;
    this.cellNode.classList.add('hidden');
    this.node.appendChild(this.cellNode);

    // Bind the Codemirror
    const codeMirrorNode = this.cell.node.querySelector(
      '.CodeMirror'
    ) as unknown;
    this.iCodeMirror = codeMirrorNode as ICodeMirror;

    console.log(this.iCodeMirror.CodeMirror);

    this.cleanCellClone();
  }

  cleanCellClone = () => {
    // Remove the left region (prompt and collapser), header and footer
    console.log(this.cellNode);
    console.log(this.cellNode.querySelector('.jp-Cell-inputCollapser'));
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
    this.cell.rendered = false;
    console.log(this.cell.inputArea);

    console.log('Edit clicked!');
  };

  runClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(this.cell.editorWidget.node);
    this.cell.editorWidget.node.scrollIntoView(false);

    console.log(this.cell.editor.getCursorPosition());

    console.log('Run clicked!');
  };

  launchClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // this.cell.editor.revealPosition(this.cell.editor.getCursorPosition());
    console.log(
      this.cell.editor.getCoordinateForPosition(
        this.cell.editor.getCursorPosition()
      )
    );
    console.log(this.cell.editorWidget.node.offsetHeight);
    console.log('Launch clicked!');
  };

  closeClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('Close clicked!');
  };

  dispose() {
    this.node.remove();
    this.isDisposed = true;
  }
}
