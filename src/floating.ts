import { IDisposable } from '@lumino/disposable';
import { ContentType } from './content';
import { MyIcons } from './icons';

/**
 * Class that implements the Code cell in StickyLand.
 */
export class FloatingWindow implements IDisposable {
  node: HTMLElement;
  header: HTMLElement;
  cellType: ContentType;
  isDisposed = false;
  isMousedown = false;
  lastMousePos = [0, 0];

  constructor(cellType: ContentType, cellIndex = 0) {
    // Create the floating window element
    this.node = document.createElement('div');
    this.node.classList.add('floating-window');
    document.querySelector('#jp-main-content-panel')?.appendChild(this.node);

    // Add a top header to the window
    this.header = document.createElement('div');
    this.header.classList.add('floating-header');
    this.node.appendChild(this.header);

    const headerText = document.createElement('span');
    this.cellType = cellType;

    if (cellType === ContentType.Code) {
      headerText.innerText = `Code Cell ${cellIndex}`;
    } else {
      headerText.innerText = 'Markdown Cell';
    }
    this.header.appendChild(headerText);

    const headerIcons = document.createElement('div');
    headerIcons.classList.add('button-group');
    this.header.appendChild(headerIcons);

    const icon1 = document.createElement('div');
    icon1.classList.add('header-button');
    icon1.setAttribute('title', 'Put pack the cell to StickyLand');
    MyIcons.landIcon.element({ container: icon1 });
    headerIcons.appendChild(icon1);

    const icon2 = document.createElement('div');
    icon2.classList.add('header-button');
    icon2.setAttribute('title', 'Close the cell');
    MyIcons.closeIcon2.element({ container: icon2 });
    headerIcons.appendChild(icon2);

    // Allow users to drag the window to change the position
    this.header.addEventListener(
      'mousedown',
      this.headerMousedownHandler,
      true
    );
  }

  /**
   * Event handler for mouse down. It trigger the document to listen to mouse
   * move events
   * @param e Event
   */
  headerMousedownHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const mouseEvent = e as MouseEvent;

    this.isMousedown = true;

    // Register the offset from the initial click position to the div location
    this.lastMousePos = [mouseEvent.pageX, mouseEvent.pageY];

    const mouseMoveHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const mouseEvent = e as MouseEvent;

      const newX =
        this.node.offsetLeft + mouseEvent.pageX - this.lastMousePos[0];
      const newY =
        this.node.offsetTop + mouseEvent.pageY - this.lastMousePos[1];

      this.lastMousePos[0] = mouseEvent.pageX;
      this.lastMousePos[1] = mouseEvent.pageY;

      this.node.style.left = `${newX}px`;
      this.node.style.top = `${newY}px`;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler, true);
      document.removeEventListener('mouseup', mouseUpHandler, true);
      document.body.style.cursor = 'default';

      // Restore the old style for code mirror elements
      document.querySelectorAll('.jp-Editor').forEach(e => {
        const elem = e as HTMLElement;
        const oldStyle = elem.getAttribute('old-style');
        if (oldStyle) {
          elem.setAttribute('style', oldStyle);
        } else {
          elem.removeAttribute('style');
        }
      });
    };

    // Bind the mouse event listener to the document so we can track the movement
    // if outside the header region
    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, true);
    document.body.style.cursor = 'move';

    // Override the pointer events for all code mirror elements
    document.querySelectorAll('.jp-Editor').forEach(e => {
      const elem = e as HTMLElement;
      const oldStyle = elem.getAttribute('style');
      if (oldStyle) {
        elem.setAttribute('old-style', oldStyle);
      }
      elem.setAttribute('style', 'pointer-events: none;');
    });
  };

  dispose() {
    this.header.removeEventListener(
      'mousedown',
      this.headerMousedownHandler,
      true
    );
    this.isDisposed = true;
  }
}
