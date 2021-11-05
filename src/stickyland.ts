import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette,
  MainAreaWidget,
  ToolbarButton
} from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { Message } from '@lumino/messaging';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class StickyLand extends Widget {
  stickyContainer: HTMLElement;
  sticky: HTMLElement;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add a child element
    this.sticky = document.createElement('div');
    this.sticky.classList.add('sticky-panel');
    this.stickyContainer.append(this.sticky);

    this.sticky.addEventListener(
      'lm-drop',
      event => {
        event.preventDefault();
        event.stopPropagation();
        console.log('drag drop!');
        console.log(event);
      },
      true
    );

    this.sticky.addEventListener(
      'lm-dragenter',
      event => {
        event.preventDefault();
        event.stopPropagation();
        console.log('drag enter!');
        console.log(event);
      },
      true
    );

    this.sticky.addEventListener(
      'lm-dragover',
      event => {
        event.preventDefault();
        event.stopPropagation();
        console.log('drag over!');
        console.log(event);
      },
      true
    );

    this.sticky.addEventListener(
      'lm-dragleave',
      event => {
        event.preventDefault();
        event.stopPropagation();
        console.log('drag leave!');
        console.log(event);
      },
      true
    );

    this.sticky.innerHTML = 'StickyLand';

    // let override = Drag.overrideCursor('wait');
    //  override.dispose();
  }
}
