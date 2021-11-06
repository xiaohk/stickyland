import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class StickyTab extends Widget {
  stickyContainer: HTMLElement;
  stickyTabNode: HTMLElement;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the tab element
    this.stickyTabNode = document.createElement('div');
    this.stickyTabNode.classList.add('sticky-tab');
    this.stickyContainer.append(this.stickyTabNode);

    // Initialize the tab
  }
}
