import { Widget, SingletonLayout } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';
import { toArray } from '@lumino/algorithm';

import { Dropzone } from './dropzone';
import { StickyMarkdown } from './markdown';

export enum ContentType {
  Dropzone,
  Code,
  Markdown,
  TableOfContent
}

export class StickyContent extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  curContent: Dropzone | StickyMarkdown;
  panel: NotebookPanel;

  constructor(stickyContainer: HTMLElement, panel: NotebookPanel) {
    super();
    this.stickyContainer = stickyContainer;
    this.panel = panel;

    // Add the content element
    console.log('init content!');
    this.node = document.createElement('div');
    this.node.classList.add('sticky-content');
    this.stickyContainer.append(this.node);

    // Show a dropzone at first
    this.curContent = new Dropzone(this);
  }

  swapOutDropZone(
    cell: Cell,
    newCellType: ContentType,
    notebook: NotebookPanel
  ) {
    if (newCellType === ContentType.Markdown) {
      // Remove the dropzone
      this.curContent.dispose();

      // Initialize a markdown cell
      this.curContent = new StickyMarkdown(
        this,
        cell as MarkdownCell,
        notebook
      );
    }
  }

  /**
   * Handle drag enter according to the current content type
   * @param event Lumino IDragEvent
   */
  dragEnterHandler(event: IDragEvent) {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragEnterHandler(event);
    }
  }

  /**
   * Handle drag over according to the current content type
   * @param event Lumino IDragEvent
   */
  dragOverHandler(event: IDragEvent) {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragOverHandler(event);
    }
  }

  /**
   * Handle drop leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragDropHandler(event: IDragEvent) {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragDropHandler(event);
    }
  }

  /**
   * Handle drag leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragLeaveHandler(event: IDragEvent) {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragLeaveHandler(event);
    }
  }
}
