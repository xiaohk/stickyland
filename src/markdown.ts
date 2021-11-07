import { Widget, BoxLayout } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { LabIcon, caretDownEmptyIcon } from '@jupyterlab/ui-components';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';
import { toArray } from '@lumino/algorithm';
import { StickyContent, ContentType } from './content';

import iconAdd from '../style/img/icon-add.svg';

/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
export class StickyMarkdown implements IDisposable {
  stickyContent: StickyContent;
  node: HTMLElement;
  cell: MarkdownCell;
  notebook: NotebookPanel;
  isDisposed = false;

  constructor(
    stickyContent: StickyContent,
    cell: MarkdownCell,
    notebook: NotebookPanel
  ) {
    this.stickyContent = stickyContent;
    this.cell = cell;
    this.notebook = notebook;

    // Add a dropzone element (providing feedback of drag-and-drop)
    this.node = document.createElement('div');
    this.node.classList.add('sticky-md');
    this.stickyContent.node.append(this.node);

    console.log(notebook.model);

    // Initialize the content
    // const layout = panel.layout as BoxLayout;
    // layout.addWidget(cell);

    // Add a text label
    const label = document.createElement('span');
    label.classList.add('md-label');
    label.innerHTML = 'markdown cell';
    this.node.append(label);
  }

  dispose() {
    this.node.remove();
    this.isDisposed = true;
  }
}
