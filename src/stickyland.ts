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
import { FloatingWindow } from './floating';

export class StickyLand {
  node: HTMLElement;
  stickyTab: StickyTab;
  stickyContent: StickyContent;
  floatingWindows: FloatingWindow[] = [];

  constructor(panel: NotebookPanel) {
    this.node = document.createElement('div');
    this.node.classList.add('sticky-container');
    this.node.classList.add('hidden');

    // Put the node below the toolbar
    const toolbarHeight = parseFloat(panel.toolbar.node.style.height);
    this.node.style.top = `${toolbarHeight}px`;

    panel.node.append(this.node);

    // Add the tab element
    this.stickyTab = new StickyTab(this.node);

    // Add the content element (the content can be different cells)
    this.stickyContent = new StickyContent(this.node, panel, this);

    // Allow users to drag to resize
    this.enableResize();

    // Register the drag-and-drop events
    this.node.addEventListener(
      'lm-drop',
      e => this.dragDropHandler(e as IDragEvent),
      true
    );

    this.node.addEventListener(
      'lm-dragenter',
      e => this.dragEnterHandler(e as IDragEvent),
      true
    );

    this.node.addEventListener(
      'lm-dragover',
      e => this.dragOverHandler(e as IDragEvent),
      true
    );

    this.node.addEventListener(
      'lm-dragleave',
      e => this.dragLeaveHandler(e as IDragEvent),
      true
    );
  }

  /**
   * Allow users to drag the bottom left corner to resize the container
   */
  enableResize = () => {
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');

    this.node.append(resizeHandle);
    resizeHandle.addEventListener('mousedown', this.resizeMousedownHandler);
  };

  resizeMousedownHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const bbox = this.node.getBoundingClientRect();
    const rightX = bbox.x + bbox.width;
    const topY = bbox.y;

    const cursorMask = document.createElement('div');
    cursorMask.classList.add('cursor-mask');
    cursorMask.style.cursor = 'nesw-resize';
    document.body.appendChild(cursorMask);

    const mouseMoveHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const mouseEvent = e as MouseEvent;

      const newX = mouseEvent.pageX;
      const newWidth = Math.max(0, rightX - newX);
      const newY = mouseEvent.pageY;
      const newHeight = Math.max(0, newY - topY);

      this.node.style.width = `${newWidth}px`;
      this.node.style.height = `${newHeight}px`;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler, true);
      document.removeEventListener('mouseup', mouseUpHandler, true);
      document.body.style.cursor = 'default';
      cursorMask.remove();
    };

    // Bind the mouse event listener to the document so we can track the movement
    // if outside the header region
    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, true);
    document.body.style.cursor = 'newsw-resize';
  };

  isHidden = () => {
    return this.node.classList.contains('hidden');
  };

  hide = () => {
    this.node.classList.add('hidden');
  };

  show = () => {
    this.node.classList.remove('hidden');
  };

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
