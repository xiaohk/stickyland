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
    this.stickyContainer.addEventListener(
      'lm-drop',
      e => this.dragDropHandler(e as IDragEvent),
      true
    );

    this.stickyContainer.addEventListener(
      'lm-dragenter',
      e => this.dragEnterHandler(e as IDragEvent),
      true
    );

    this.stickyContainer.addEventListener(
      'lm-dragover',
      e => this.dragOverHandler(e as IDragEvent),
      true
    );

    this.stickyContainer.addEventListener(
      'lm-dragleave',
      e => this.dragLeaveHandler(e as IDragEvent),
      true
    );
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

    // Let the content handle drag drop
    this.stickyContent.dragDropHandler(event);
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

    // Change the view of content
    this.stickyContent.dragEnterHandler(event);
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

    // Change the view of content
    this.stickyContent.dragOverHandler(event);
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

    // Change the view of content
    this.stickyContent.dragLeaveHandler(event);
  };
}
