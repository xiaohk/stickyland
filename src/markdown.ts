import { Widget, BoxLayout } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import {
  LabIcon,
  runIcon,
  editIcon,
  launcherIcon,
  closeIcon
} from '@jupyterlab/ui-components';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { CodeCell, MarkdownCell, Cell } from '@jupyterlab/cells';
import { toArray } from '@lumino/algorithm';
import { StickyContent, ContentType } from './content';

/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
export class StickyMarkdown implements IDisposable {
  stickyContent: StickyContent;
  node: HTMLElement;
  cell: MarkdownCell;
  notebook: NotebookPanel;
  isDisposed = false;

  constructor(
    stickyContent: StickyContent,
    cell: MarkdownCell,
    notebook: NotebookPanel
  ) {
    this.stickyContent = stickyContent;
    this.cell = cell;
    this.notebook = notebook;

    // Add a dropzone element (providing feedback of drag-and-drop)
    this.node = document.createElement('div');
    this.node.classList.add('sticky-md');
    this.stickyContent.node.append(this.node);

    console.log(notebook.model);

    // Initialize the content
    // const layout = panel.layout as BoxLayout;
    // layout.addWidget(cell);

    // Add a toolbar
    const toolBarItems = [
      {
        name: 'run',
        title: 'Run the cell',
        icon: runIcon,
        onClick: this.runClicked
      },
      {
        name: 'edit',
        title: 'Edit the cell',
        icon: editIcon,
        onClick: this.editClicked
      },
      {
        name: 'launch',
        title: 'Make the cell float',
        icon: launcherIcon,
        onClick: this.launchClicked
      },
      {
        name: 'close',
        title: 'Remove the cell',
        icon: closeIcon,
        onClick: this.closeClicked
      }
    ];
    const toolbar = this.createToolbar(toolBarItems);
    this.node.appendChild(toolbar);

    // Add a text label
    const label = document.createElement('span');
    label.classList.add('md-label');
    label.innerHTML = 'markdown cell';
    this.node.appendChild(label);
  }

  /**
   * Create a toolbar element
   * @param items List of toolbar item names and onclick handlers
   */
  createToolbar(
    items: {
      name: string;
      title: string;
      icon: LabIcon;
      onClick: (e: Event) => any;
    }[]
  ): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.classList.add('sticky-toolbar', 'jp-Toolbar');

    // Add buttons into the toolbar
    items.forEach(d => {
      const item = document.createElement('div');
      item.classList.add('jp-ToolbarButton', 'jp-Toolbar-item');
      toolbar.appendChild(item);

      const itemElem = document.createElement('button');
      itemElem.classList.add(
        'jp-ToolbarButtonComponent',
        'button',
        'jp-Button',
        'toolbar-button',
        'bp3-button',
        'bp3-minimal',
        `button-${d.name}`
      );
      itemElem.setAttribute('title', d.title);
      itemElem.addEventListener('click', d.onClick);
      item.appendChild(itemElem);

      // Add icon to the button
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('jp-ToolbarButtonComponent-icon');
      itemElem.appendChild(iconSpan);

      d.icon.element({
        container: iconSpan
      });
    });

    return toolbar;
  }

  editClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('Edit clicked!');
  }

  runClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('Run clicked!');
  }

  launchClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('Launch clicked!');
  }

  closeClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('Close clicked!');
  }

  dispose() {
    this.node.remove();
    this.isDisposed = true;
  }
}
