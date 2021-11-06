import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class StickyContent extends Widget {
  stickyContainer: HTMLElement;
  stickyContentNode: HTMLElement;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the content element
    console.log('init content!');
    this.stickyContentNode = document.createElement('div');
    this.stickyContentNode.classList.add('sticky-content');
    this.stickyContainer.append(this.stickyContentNode);

    // Initialize the content
    this.stickyContentNode.innerHTML = 'Sticky Content';
  }

}
