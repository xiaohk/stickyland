import { IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel } from '@jupyterlab/notebook';

import { StickyTab } from './tab';
import { StickyContent } from './content';
import { FloatingWindow } from './floating';
import { MyIcons } from './icons';

const MIN_WIDTH = 235;
const MIN_HEIGHT = 240;
const WINDOW_GAP = 29;

type ContainerPos = {
  width: number;
  height: number;
  y: number;
};

export class StickyLand {
  node: HTMLElement;
  header: HTMLElement;
  stickyTab: StickyTab;
  stickyContent: StickyContent | null = null;
  floatingWindows: FloatingWindow[] = [];
  containerSize: ContainerPos;

  constructor(panel: NotebookPanel) {
    this.node = document.createElement('div');
    this.node.classList.add('sticky-container', 'hidden');

    // Put stickyland below the toolbar
    const toolbarHeight = parseFloat(panel.toolbar.node.style.height);
    this.node.style.top = `${toolbarHeight + 30}px`;
    panel.node.appendChild(this.node);

    // Create a header so that users can drag
    this.header = document.createElement('div');
    this.header.classList.add('sticky-header');
    this.node.appendChild(this.header);

    // Bound the window position inside its parent when dragging the header
    if (this.node.parentElement) {
      const containerBBox = this.node.parentElement.getBoundingClientRect();
      this.containerSize = {
        width: containerBBox.width,
        height: containerBBox.height,
        y: containerBBox.y
      };
    } else {
      console.warn('Could not find stickyland container parent.');
      this.containerSize = {
        width: 2000,
        height: 1500,
        y: 0
      };
    }

    this.initHeader();

    // Add the tab element
    this.stickyTab = new StickyTab(this.node, panel, this);

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

    // Draw a few liens to signify the resize affordance
    const line1 = document.createElement('div');
    line1.classList.add('line', 'line-1');
    resizeHandle.appendChild(line1);

    const line2 = document.createElement('div');
    line2.classList.add('line', 'line-2');
    resizeHandle.appendChild(line2);

    const line3 = document.createElement('div');
    line3.classList.add('line', 'line-3');
    resizeHandle.appendChild(line3);

    this.node.append(resizeHandle);
    resizeHandle.addEventListener('mousedown', this.resizeMousedownHandler);
  };

  /**
   * Handle the dragging on the resize handle on the bottom left corner
   * @param e Mouse event
   */
  resizeMousedownHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const bbox = this.node.getBoundingClientRect();
    const rightX = bbox.x + bbox.width;
    const topY = bbox.y;

    // Create a window size mask so that we can override the codemirror cursor
    const cursorMask = document.createElement('div');
    cursorMask.classList.add('cursor-mask');
    cursorMask.style.cursor = 'nesw-resize';
    document.body.appendChild(cursorMask);

    const mouseMoveHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const mouseEvent = e as MouseEvent;

      const newX = mouseEvent.pageX;
      const newWidth = Math.max(MIN_WIDTH, rightX - newX);
      const newY = mouseEvent.pageY;
      const newHeight = Math.max(MIN_HEIGHT, newY - topY);

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

  /**
   * Style the header so that users can reposition StickyLand.
   */
  initHeader = () => {
    // Add the drag icon
    const dragHandle = document.createElement('div');
    dragHandle.classList.add('drag-handle');
    this.header.appendChild(dragHandle);
    MyIcons.dragIcon.element({ container: dragHandle });

    // Allow the user to drag the header to change the vertical position of
    // stickyland
    this.header.addEventListener('mousedown', this.headerMousedownHandler);
  };

  headerMousedownHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const mouseEvent = e as MouseEvent;
    const yOffset = this.node.offsetTop - mouseEvent.pageY;

    // Create a window size mask so that we can override the codemirror cursor
    const cursorMask = document.createElement('div');
    cursorMask.classList.add('cursor-mask');
    cursorMask.style.cursor = 'move';
    document.body.appendChild(cursorMask);

    const mouseMoveHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const mouseEvent = e as MouseEvent;
      const newTop = mouseEvent.pageY + yOffset;

      const nodeBBox = this.node.getBoundingClientRect();
      const maxNewY = this.containerSize.height - nodeBBox.height;
      let newY = Math.max(WINDOW_GAP, newTop);
      newY = Math.min(maxNewY, newY);

      this.node.style.top = `${newY}px`;
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
    document.body.style.cursor = 'move';
  };

  isHidden = () => {
    return this.node.classList.contains('hidden');
  };

  hide = () => {
    this.node.classList.add('hidden');

    // Also hide all floating windows
    this.floatingWindows.forEach(d => {
      d.node.classList.add('hidden');
    });
  };

  show = () => {
    this.node.classList.remove('hidden');

    // Also show all floating windows
    this.floatingWindows.forEach(d => {
      d.node.classList.remove('hidden');
    });
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
    if (this.stickyContent) {
      this.stickyContent.dragDropHandler(event);
    }
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
    if (this.stickyContent) {
      this.stickyContent.dragEnterHandler(event);
    }
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
    if (this.stickyContent) {
      this.stickyContent.dragOverHandler(event);
    }
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
    if (this.stickyContent) {
      this.stickyContent.dragLeaveHandler(event);
    }
  };
}
