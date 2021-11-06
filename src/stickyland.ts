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

import { StickyTab } from './tab';
import { StickyContent } from './content';

export class StickyLand extends Widget {
  stickyContainer: HTMLElement;
  stickyTab: StickyTab;
  stickyContent: StickyContent;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the tab element
    this.stickyTab = new StickyTab(this.stickyContainer);

    // Add the content element (the content can be different cells)
    this.stickyContent = new StickyContent(this.stickyContainer);

    // Register the drag-and-drop events
    // this.sticky.addEventListener(
    //   'lm-drop',
    //   e => this.dragDropHandler(e as IDragEvent),
    //   true
    // );

    // this.sticky.addEventListener(
    //   'lm-dragenter',
    //   e => this.dragEnterHandler(e as IDragEvent),
    //   true
    // );

    // this.sticky.addEventListener(
    //   'lm-dragover',
    //   e => this.dragOverHandler(e as IDragEvent),
    //   true
    // );

    // this.sticky.addEventListener(
    //   'lm-dragleave',
    //   e => this.dragLeaveHandler(e as IDragEvent),
    //   true
    // );
  }

  /**
   * Handle drag drop event
   *
   * ### Note
   * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
   * We need to call preventDefault() to cancel (dispose) the event to have our
   * own action
   *
   * @param event Lumino IDragEVent
   */
  dragDropHandler = (event: IDragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('drag drop!');
    console.log(event);
  };

  /**
   * Handle drag enter event
   *
   * ### Note
   * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
   * We need to call preventDefault() to cancel (dispose) the event to have our
   * own action
   *
   * @param event Lumino IDragEVent
   */
  dragEnterHandler = (event: IDragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // First need to change the cursor from no drop to copy
    // We can use the overrideCursor method from drag
    // this.override = Drag.overrideCursor('copy');
    // console.log(this.override);

    console.log('drag enter!');
    console.log(event);
  };

  /**
   * Handle drag over events
   *
   * ### Note
   * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
   * We need to call preventDefault() to cancel (dispose) the event to have our
   * own action
   *
   * @param event Lumino IDragEVent
   */
  dragOverHandler = (event: IDragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Changer the cursor style (only way to change cursor style here)
    // Lumino's drag's dispatch checks the `dropAction` field to call
    // overrideCursor() internally
    // https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
    // https://github.com/jupyterlab/lumino/blob/e6612f622c827b2e85cffb1858fcc3bf1b09be76/packages/dragdrop/src/index.ts#L474
    event.dropAction = 'copy';
  };

  /**
   * Handle drag leave event
   *
   * ### Note
   * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
   * We need to call preventDefault() to cancel (dispose) the event to have our
   * own action
   *
   * @param event Lumino IDragEVent
   */
  dragLeaveHandler = (event: IDragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('drag leave!');
    console.log(event);
  };
}
