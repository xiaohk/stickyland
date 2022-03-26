import { IDisposable } from '@lumino/disposable';
import { ContentType } from './content';
import { StickyCode } from './code';
import { StickyMarkdown } from './markdown';
import { StickyTab, Tab } from './tab';
import { StickyLand } from './stickyland';
import { MyIcons } from './icons';

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Size = {
  width: number;
  height: number;
};

const WINDOW_GAP = 5;

/**
 * Class that implements the Code cell in StickyLand.
 */
export class FloatingWindow implements IDisposable {
  container: HTMLElement | null;
  containerSize: Size;
  node: HTMLElement;
  stickyCell: StickyCode | StickyMarkdown;
  stickyTab: StickyTab;
  stickyLand: StickyLand;
  tab: Tab | null;
  header: HTMLElement;
  placeholder: HTMLElement;
  cellType: ContentType;
  isDisposed = false;
  lastMousePos = [0, 0];

  // Properties for FLIP animation
  startPos: Position | null = null;
  endPos: Position | null = null;

  constructor(cellType: ContentType, stickyCell: StickyCode | StickyMarkdown) {
    // Create the floating window element
    this.node = document.createElement('div');
    this.node.classList.add('floating-window', 'hidden');

    // Append the floating window to different elements for notebook/lab
    if (document.querySelector('#jp-main-content-panel') !== null) {
      this.container = document.querySelector('#jp-main-content-panel');
    } else {
      this.container = document.querySelector('#main-panel');
    }
    this.container?.appendChild(this.node);

    if (this.container === null) {
      console.warn(
        'StickyLand: Cannot find container to inject the floating cell!'
      );
    }

    // Set max size to bound the floating window
    this.containerSize = {
      width: 2000,
      height: 1500
    };
    if (this.container !== null) {
      const containerBBox = this.container.getBoundingClientRect();
      this.containerSize.width = containerBBox.width;
      this.containerSize.height = containerBBox.height;
    }

    // Add a top header to the window
    this.header = document.createElement('div');
    this.header.classList.add('floating-header');
    this.node.appendChild(this.header);

    const headerText = document.createElement('span');
    this.cellType = cellType;
    this.stickyCell = stickyCell;
    this.stickyTab = this.stickyCell.stickyContent.stickyLand.stickyTab;
    this.tab = this.stickyTab.activeTab;
    this.stickyLand = this.stickyCell.stickyContent.stickyLand;

    // We first put the cell on the left edge of the notebook panel
    const initLeft =
      this.stickyCell.notebook.node.getBoundingClientRect().x + 10;

    // Position the node to the inner region and offset it a little bit when
    // users create multiple windows
    const curLeft = initLeft + this.stickyLand.floatingWindows.length * 20;
    const curTop = 100 + this.stickyLand.floatingWindows.length * 20;
    this.node.style.left = `${curLeft}px`;
    this.node.style.top = `${curTop}px`;

    this.node.style.maxWidth = `${
      this.containerSize.width - curLeft - WINDOW_GAP
    }px`;
    this.node.style.maxHeight = `${
      this.containerSize.height - curTop - WINDOW_GAP
    }px`;

    // Query the cell index for this cell
    let cellIndex = 1;
    if (this.stickyTab.activeTab) {
      cellIndex = this.stickyTab.activeTab.cellIndex;
    }

    if (cellType === ContentType.Code) {
      headerText.innerText = `Code-${cellIndex}`;
    } else {
      headerText.innerText = `Markdown-${cellIndex}`;
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

    // Need to cancel mousedown event to avoid header dragging
    icon1.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    icon2.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    // Allow users to drag the window to change the position
    this.header.addEventListener('mousedown', this.headerMousedownHandler);

    // Push itself to the floating window array
    this.stickyLand.floatingWindows.push(this);

    // Hide the launching icon
    const launchIcon =
      this.stickyCell.stickyContent.headerNode.querySelector(
        '.button-launch'
      )?.parentElement;
    launchIcon?.classList.add('no-display');

    // Register the start position
    this.startPos = this.registerStartPos();

    // Add the content from the cell to the floating window
    const floatingContent = this.stickyCell.stickyContent.wrapperNode.cloneNode(
      false
    ) as HTMLElement;
    floatingContent.append(
      ...this.stickyCell.stickyContent.wrapperNode.childNodes
    );
    this.node.append(floatingContent);

    // Set the initial width to fit the codemirror default width
    const cmSizer = this.node.querySelector(
      '.CodeMirror-sizer'
    ) as HTMLElement | null;

    if (cmSizer !== null) {
      this.node.style.width = `${parseInt(cmSizer.style.minWidth) + 20}px`;
    }

    // Register the end position
    this.endPos = this.registerEndPos();

    // Override the auto height from code mirror
    this.node.style.height = `${this.endPos.height}px`;

    // Play the animation
    this.node.classList.remove('hidden');
    this.playLaunchingAnimation();

    // Add a placeholder in the original sticky content
    this.placeholder = this.addPlaceholder();
  }

  /**
   * Compute the initial window position + size
   */
  registerStartPos = () => {
    const bbox =
      this.stickyCell.stickyContent.wrapperNode.getBoundingClientRect();

    const headerHeight = 28;

    return {
      x: bbox.x,
      y: bbox.y - headerHeight,
      width: bbox.width,
      height: bbox.height
    };
  };

  /**
   * Compute the ending floating window position + size
   */
  registerEndPos = () => {
    // pass
    const bbox = this.node.getBoundingClientRect();

    return {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height
    };
  };

  /**
   * Animate the launching process of the floating window
   */
  playLaunchingAnimation = () => {
    if (this.startPos && this.endPos) {
      // Compute the transformation from end to the start
      const widthScale = this.startPos.width / this.endPos.width;
      const heightScale = this.startPos.height / this.endPos.height;
      const xTranslate = this.startPos.x - this.endPos.x;
      const yTranslate = this.startPos.y - this.endPos.y;

      // Apply the transform
      this.node.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `
            translate(${xTranslate}px, ${yTranslate}px)
            scale(${widthScale}, ${heightScale})
          `
          },
          {
            transformOrigin: 'top left',
            transform: 'none'
          }
        ],
        {
          duration: 200,
          easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }
      );
    }
  };

  /**
   * Animate the landing process of the floating window
   */
  playLandingAnimation = (callback: () => void) => {
    if (this.startPos && this.endPos) {
      this.registerEndPos();

      // Compute the transformation from start to the end
      const widthScale = this.startPos.width / this.endPos.width;
      const heightScale = this.startPos.height / this.endPos.height;
      const xTranslate = this.startPos.x - this.endPos.x;
      const yTranslate = this.startPos.y - this.endPos.y;

      // Apply the transform
      const animation = this.node.animate(
        [
          {
            transformOrigin: 'top left',
            transform: 'none',
            opacity: 1
          },
          {
            transformOrigin: 'top left',
            transform: `
              translate(${xTranslate}px, ${yTranslate}px)
              scale(${widthScale}, ${heightScale})
            `,
            opacity: 0
          }
        ],
        {
          duration: 350,
          easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
        }
      );

      animation.onfinish = e => {
        callback();
      };
    }
  };

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

  /**
   * Put the cell back to StickyLand.
   * @param e Event
   */
  landButtonClicked = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.land();

    const callback = () => {
      this.dispose();
    };

    this.playLandingAnimation(callback);
  };

  /**
   * Land the sticky window and close the corresponding tab
   * @param e Event
   */
  closeButtonClicked = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const callback = () => {
      // First put back the cell
      this.land();

      // Close the tab
      if (this.tab) {
        this.stickyTab.closeTab(this.tab);
      }

      this.dispose();
    };

    // We don't need to play animation if user wants to close the cell
    callback();
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

    // Show the launching icon
    const launchIcon =
      this.stickyCell.stickyContent.headerNode.querySelector(
        '.button-launch'
      )?.parentElement;
    launchIcon?.classList.remove('no-display');

    // Remove the FloatingWindow object from the sticky content
    const windowIndex =
      this.stickyCell.stickyContent.stickyLand.floatingWindows.indexOf(this);
    this.stickyCell.stickyContent.stickyLand.floatingWindows.splice(
      windowIndex,
      1
    );

    this.stickyCell.isFloating = false;
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

    // Raise the clicked window
    this.node.parentNode?.appendChild(this.node);

    // Create a window size mask so that we can override the codemirror cursor
    const cursorMask = document.createElement('div');
    cursorMask.classList.add('cursor-mask');
    cursorMask.style.cursor = 'move';
    document.body.appendChild(cursorMask);

    // Also need to mask the internal region
    const innerCursorMask = document.createElement('div');
    innerCursorMask.classList.add('cursor-mask');
    innerCursorMask.style.cursor = 'move';
    this.node.appendChild(innerCursorMask);

    // Register the offset from the initial click position to the div location
    this.lastMousePos = [mouseEvent.pageX, mouseEvent.pageY];

    const mouseMoveHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const mouseEvent = e as MouseEvent;

      let newX = this.node.offsetLeft + mouseEvent.pageX - this.lastMousePos[0];
      let newY = this.node.offsetTop + mouseEvent.pageY - this.lastMousePos[1];

      this.lastMousePos[0] = mouseEvent.pageX;
      this.lastMousePos[1] = mouseEvent.pageY;

      const nodeBBox = this.node.getBoundingClientRect();

      // Bound x and y so the window is not out of its container
      const maxNewX = this.containerSize.width - nodeBBox.width - WINDOW_GAP;
      newX = Math.max(0, newX);
      newX = Math.min(maxNewX, newX);

      const maxNewY = this.containerSize.height - nodeBBox.height - WINDOW_GAP;
      newY = Math.max(0, newY);
      newY = Math.min(maxNewY, newY);

      this.node.style.left = `${newX}px`;
      this.node.style.top = `${newY}px`;

      // Also bound the max width and max height to avoid resize overflow
      if (newX !== maxNewX) {
        this.node.style.maxWidth = `${
          this.containerSize.width - newX - WINDOW_GAP
        }px`;
      }

      if (newY !== maxNewY) {
        this.node.style.maxHeight = `${
          this.containerSize.height - newY - WINDOW_GAP
        }px`;
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler, true);
      document.removeEventListener('mouseup', mouseUpHandler, true);
      document.body.style.cursor = 'default';
      cursorMask.remove();
      innerCursorMask.remove();
    };

    // Bind the mouse event listener to the document so we can track the movement
    // if outside the header region
    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, true);
    document.body.style.cursor = 'move';
  };

  dispose() {
    this.header.removeEventListener('mousedown', this.headerMousedownHandler);
    this.node.remove();
    this.isDisposed = true;
  }
}
