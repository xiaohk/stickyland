import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

import { Dropzone } from './dropzone';

export enum ContentType {
  Dropzone,
  Code,
  Markdown,
  TableOfContent
}

export class StickyContent extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  curContentType: ContentType;
  curContent: Dropzone;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the content element
    console.log('init content!');
    this.node = document.createElement('div');
    this.node.classList.add('sticky-content');
    this.stickyContainer.append(this.node);

    // Initialize the content
    // this.node.innerHTML = 'Sticky Content';

    // Show a dropzone at the first
    this.curContent = new Dropzone(this);
    this.curContentType = ContentType.Dropzone;
  }

  /**
   * Handle drag enter according to the current content type
   * @param event Lumino IDragEvent
   */
  dragEnterHandler(event: IDragEvent) {
    if (this.curContentType === ContentType.Dropzone) {
      this.curContent.dragEnterHandler(event);
    }
  }

  /**
   * Handle drag over according to the current content type
   * @param event Lumino IDragEvent
   */
  dragOverHandler(event: IDragEvent) {
    if (this.curContentType === ContentType.Dropzone) {
      this.curContent.dragOverHandler(event);
    }
  }

  /**
   * Handle drop leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragDropHandler(event: IDragEvent) {
    if (this.curContentType === ContentType.Dropzone) {
      this.curContent.dragDropHandler(event);
    }
  }

  /**
   * Handle drag leave according to the current content type
   * @param event Lumino IDragEvent
   */
  dragLeaveHandler(event: IDragEvent) {
    if (this.curContentType === ContentType.Dropzone) {
      this.curContent.dragLeaveHandler(event);
    }
  }
}
