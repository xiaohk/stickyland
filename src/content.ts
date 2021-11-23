import { IDisposable } from '@lumino/disposable';
import { IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel } from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';

import { Dropzone } from './dropzone';
import { StickyMarkdown } from './markdown';
import { StickyCode } from './code';
import { StickyLand } from './stickyland';

export enum ContentType {
  Dropzone = 'Dropzone',
  Code = 'Code',
  Markdown = 'Markdown'
}

export class StickyContent implements IDisposable {
  stickyContainer: HTMLElement;
  wrapperNode: HTMLElement;
  headerNode: HTMLElement;
  contentNode: HTMLElement;
  curContent: Dropzone | StickyMarkdown | StickyCode;
  notebook: NotebookPanel;
  stickyLand: StickyLand;
  isDisposed = false;

  constructor(
    stickyContainer: HTMLElement,
    panel: NotebookPanel,
    stickyLand: StickyLand
  ) {
    this.stickyContainer = stickyContainer;
    this.notebook = panel;
    this.stickyLand = stickyLand;

    // Add the content element
    this.wrapperNode = document.createElement('div');
    this.wrapperNode.classList.add('sticky-content');
    this.stickyContainer.appendChild(this.wrapperNode);

    // Add a header and a content
    this.headerNode = document.createElement('div');
    this.headerNode.classList.add('header');
    this.wrapperNode.appendChild(this.headerNode);

    this.contentNode = document.createElement('div');
    this.contentNode.classList.add('content');
    this.wrapperNode.appendChild(this.contentNode);

    // Show a dropzone at first
    this.curContent = new Dropzone(this);
  }

  /**
   * Replace the current content with a dropzone
   */
  showDropzone = () => {
    this.curContent = new Dropzone(this);

    // It only happens when the user closes the last sticky code/md cell
    // Dehighlight the tab name
    this.stickyLand.stickyTab.activeTab?.tabNode.classList.remove('new-update');
  };

  /**
   * Replace the dropzone content with a clone of an existing cell
   * @param cell Existing cell that the users drag over
   * @param newCellType Cell type of the current cell
   */
  swapDropzoneWithExistingCell = (cell: Cell, newCellType: ContentType) => {
    // Remove the dropzone
    this.curContent.dispose();

    // Add a new cell
    switch (newCellType) {
      case ContentType.Markdown:
        // Initialize a markdown cell
        this.curContent = StickyMarkdown.createFromExistingCell(
          this,
          cell as MarkdownCell,
          this.notebook
        );
        break;

      case ContentType.Code:
        // Initialize a code cell
        this.curContent = StickyCode.createFromExistingCell(
          this,
          cell as CodeCell,
          this.notebook
        );
        break;

      default:
        break;
    }

    // Notify the tab to update tab name
    this.stickyLand.stickyTab.updateActiveTab();
  };

  /**
   * Replace the dropzone content with a new cell. This operation will append a
   * new cell to the main notebook.
   * @param newCellType New cell type
   */
  swapDropzoneWithNewCell = (newCellType: ContentType) => {
    switch (newCellType) {
      case ContentType.Code:
        // Remove the dropzone
        this.curContent.dispose();

        // Initialize a new code cell
        this.curContent = StickyCode.createFromNewCell(this, this.notebook);
        break;

      case ContentType.Markdown:
        // Remove the dropzone
        this.curContent.dispose();

        // Initialize a markdown cell
        this.curContent = StickyMarkdown.createFromNewCell(this, this.notebook);
        break;

      default:
        break;
    }

    // Notify the tab to update tab name
    this.stickyLand.stickyTab.updateActiveTab();
  };

  /**
   * Handle drag enter according to the current content type
   * @param event Lumino IDragEvent
   */
  dragEnterHandler = (event: IDragEvent) => {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragEnterHandler(event);
    }
  };

  /**
   * Handle drag over according to the current content type
   * @param event Lumino IDragEvent
   */
  dragOverHandler = (event: IDragEvent) => {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragOverHandler(event);
    }
  };

  /**
   * Handle drop leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragDropHandler = (event: IDragEvent) => {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragDropHandler(event);
    }
  };

  /**
   * Handle drag leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragLeaveHandler = (event: IDragEvent) => {
    if (this.curContent instanceof Dropzone) {
      this.curContent.dragLeaveHandler(event);
    }
  };

  swapToDropzone = () => {
    // Dispose the current content
    this.curContent.closeClicked();
  };

  dispose = () => {
    // Dispose the current content
    this.curContent.closeClicked();

    // Dispose the dropzone
    this.curContent.dispose();
    this.wrapperNode.remove();
    this.isDisposed = true;
  };
}
