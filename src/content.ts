import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

import { Dropzone } from './dropzone';

export class StickyContent extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;

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
    const dropzone = new Dropzone(this);
  }

  dragEnterHandler(event: IDragEvent) {
    console.log('content drag enter');
  }
}
