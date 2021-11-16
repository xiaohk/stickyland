import { IDisposable } from '@lumino/disposable';
import { ContentType } from './content';
import { StickyCode } from './code';
import { StickyMarkdown } from './markdown';
import { MyIcons } from './icons';

/**
 * Class that implements the Code cell in StickyLand.
 */
export class FloatingWindow implements IDisposable {
  node: HTMLElement;
  stickyCell: StickyCode | StickyMarkdown;
  header: HTMLElement;
  placeholder: HTMLElement;
  cellType: ContentType;
  isDisposed = false;
  lastMousePos = [0, 0];

  constructor(
    cellType: ContentType,
    stickyCell: StickyCode | StickyMarkdown,
    cellIndex = 0
  ) {
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
    this.stickyCell = stickyCell;

    if (cellType === ContentType.Code) {
      headerText.innerText = `Code Cell ${cellIndex}`;
    } else {
      headerText.innerText = 'Markdown Cell';
    }
    this.header.appendChild(headerText);

    // Add two buttons to the header
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

    // Bind event handlers for those two buttons
    icon1.addEventListener('click', this.landButtonClicked);
    icon2.addEventListener('click', this.closeButtonClicked);

    // Allow users to drag the window to change the position
    this.header.addEventListener(
      'mousedown',
      this.headerMousedownHandler,
      true
    );

    // Push itself to the floating window array
    this.stickyCell.stickyContent.stickyLand.floatingWindows.push(this);

    // Add the content from the cell to the floating window
    const floatingContent = this.stickyCell.stickyContent.wrapperNode.cloneNode(
      false
    ) as HTMLElement;
    floatingContent.append(
      ...this.stickyCell.stickyContent.wrapperNode.childNodes
    );
    this.node.append(floatingContent);

    // Add a placeholder in the original sticky content
    this.placeholder = this.addPlaceholder();
  }

  /**
   * Add a place holder in the content node in StickyLand when the cell is floating
   * @returns Placeholder node
   */
  addPlaceholder = () => {
    const placeholder = document.createElement('div');
    placeholder.classList.add('floating-placeholder');
    this.stickyCell.stickyContent.wrapperNode.appendChild(placeholder);

    // Add an icon
    const addIconElem = document.createElement('div');
    addIconElem.classList.add('svg-icon');
    placeholder.append(addIconElem);

    MyIcons.launchIcon.element({ container: addIconElem });

    // Add a text label
    const label = document.createElement('span');
    label.classList.add('placeholder-label');
    label.innerText = 'This cell is floating';
    placeholder.append(label);

    // Add bottom container
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('placeholder-bottom-container');
    placeholder.append(bottomContainer);

    // Create a button to summon the floating window
    const button = document.createElement('button') as HTMLButtonElement;
    button.classList.add('placeholder-button', 'button');
    bottomContainer.append(button);
    button.type = 'button';
    button.innerText = 'summon';
    button.addEventListener('click', this.landButtonClicked);

    return placeholder;
  };

  landButtonClicked = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  closeButtonClicked = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    this.land();
    this.stickyCell.closeClicked(e);
    this.dispose();
  };

  /**
   * Put back the elements to the StickyLand.
   */
  land = () => {
    // Remove the placeholder
    this.placeholder.remove();

    // Put back the elements to stickyland
    const floatingWrapper = this.node.querySelector('.sticky-content');
    if (floatingWrapper) {
      this.stickyCell.stickyContent.wrapperNode.append(
        ...floatingWrapper.childNodes
      );
    }

    // Remove the FloatingWindow object from the sticky content
    const windowIndex =
      this.stickyCell.stickyContent.stickyLand.floatingWindows.indexOf(this);
    this.stickyCell.stickyContent.stickyLand.floatingWindows.splice(
      windowIndex,
      1
    );
  };

  /**
   * Event handler for mouse down. It trigger the document to listen to mouse
   * move events
   * @param e Event
   */
  headerMousedownHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const mouseEvent = e as MouseEvent;

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
    this.node.remove();
    this.isDisposed = true;
  }
}
