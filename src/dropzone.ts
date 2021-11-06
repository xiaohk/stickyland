import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { LabIcon, caretDownEmptyIcon } from '@jupyterlab/ui-components';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';
import { StickyContent, ContentType } from './content';

import iconAdd from '../style/img/icon-add.svg';

/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
export class Dropzone extends Widget {
  stickyContent: StickyContent;
  node: HTMLElement;

  constructor(stickyContent: StickyContent) {
    super();
    this.stickyContent = stickyContent;

    // Add a dropzone element (providing feedback of drag-and-drop)
    this.node = document.createElement('div');
    this.node.classList.add('dropzone');
    this.stickyContent.node.append(this.node);

    // Initialize the content

    // Add an icon
    const addIconElem = document.createElement('div');
    addIconElem.classList.add('svg-icon');
    this.node.append(addIconElem);

    const addIcon = new LabIcon({
      name: 'icon-add',
      svgstr: iconAdd
    });

    addIcon.element({
      container: addIconElem
    });

    // Add a text label
    const label = document.createElement('span');
    label.classList.add('dropzone-label');
    label.innerHTML = 'Create a cell or drag one here';
    this.node.append(label);

    // Add bottom container
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('dropzone-bottom-container');
    this.node.append(bottomContainer);

    // Add a select option
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('dropzone-select-container');
    bottomContainer.append(selectContainer);

    const select = document.createElement('select');
    select.classList.add('dropzone-select');
    selectContainer.append(select);

    // Add a small caret down icon (from jp)
    const selectIcon = document.createElement('span');
    selectContainer.append(selectIcon);
    caretDownEmptyIcon.element({
      container: selectIcon
    });

    const selectButton = document.createElement('button');
    selectButton.classList.add('dropzone-button', 'button');
    bottomContainer.append(selectButton);
    selectButton.type = 'button';
    selectButton.innerText = 'Create';

    // Add options to the select list
    const newCellOptions = [
      { name: 'Select new cell type', type: ContentType.Dropzone },
      { name: 'Code', type: ContentType.Code },
      { name: 'Markdown', type: ContentType.Markdown },
      { name: 'Table of content', type: ContentType.TableOfContent }
    ];

    newCellOptions.forEach(o => {
      const option = document.createElement('option');
      option.value = ContentType[o.type];
      option.innerText = o.name;
      select.append(option);
    });
  }

  /**
   * Handle drag enter (highlight the border)
   * @param event Lumino IDragEvent
   */
  dragEnterHandler(event: IDragEvent) {
    // Highlight the border to indicate dragover
    this.node.classList.add('drag-over');
  }

  /**
   * Handle drag leave (dehighlight the border)
   * @param event Lumino IDragEvent
   */
  dragLeaveHandler(event: IDragEvent) {
    // Dehighlight the border to indicate dragover
    this.node.classList.remove('drag-over');
  }
}
