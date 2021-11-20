import { IDisposable } from '@lumino/disposable';
import { LabIcon } from '@jupyterlab/ui-components';
import { NotebookPanel, NotebookActions } from '@jupyterlab/notebook';
import { MarkdownCell } from '@jupyterlab/cells';
import CodeMirror from 'codemirror';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { FloatingWindow } from './floating';
import { StickyContent, ContentType } from './content';
import { MyIcons } from './icons';

/**
 * Class that implements the Markdown cell in StickyLand.
 */
export class StickyMarkdown implements IDisposable {
  stickyContent!: StickyContent;
  node!: HTMLElement;
  toolbar!: HTMLElement;
  cellNode!: HTMLElement;
  originalCell!: MarkdownCell;
  cell!: MarkdownCell;
  renderer!: IRenderMime.IRenderer;
  notebook!: NotebookPanel;
  codemirror!: CodeMirror.Editor;
  isDisposed = false;
  floatingWindow!: FloatingWindow;
  isFloating = false;

  /**
   * Factory function for StickyMarkdown when creating if from an existing cell
   * through dragging
   * @param stickyContent The sticky content that contains this markdown cell
   * @param cell The existing markdown cell
   * @param notebook The current notebook
   * @returns A new StickyMarkdown object
   */
  static createFromExistingCell(
    stickyContent: StickyContent,
    cell: MarkdownCell,
    notebook: NotebookPanel
  ): StickyMarkdown {
    const md = new StickyMarkdown();
    md.stickyContent = stickyContent;
    md.notebook = notebook;

    // Clone the cell
    md.originalCell = cell;
    md.cell = md.originalCell.clone();

    // Collapse the original cell
    if (!md.originalCell.inputHidden) {
      md.originalCell.inputHidden = true;
    }

    // Save a reference to the cell's renderer (private)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    md.renderer = md.cell._renderer;

    // Add a markdown cell element
    md.node = document.createElement('div');
    md.node.classList.add('sticky-md');
    // Need to add tabindex so it can receive keyboard events
    md.node.setAttribute('tabindex', '0');
    md.stickyContent.contentNode.appendChild(md.node);

    // Add a toolbar
    md.toolbar = md.createToolbar(md.toolBarItems);
    md.stickyContent.headerNode.appendChild(md.toolbar);

    // Clean the markdown cell
    // Need to append the node to DOM first so we can do the cleaning
    md.cellNode = md.cell.node;
    md.cellNode.classList.add('hidden');
    md.node.appendChild(md.cellNode);

    // Bind the Codemirror
    const codeMirrorNode = md.cell.node.querySelector('.CodeMirror') as unknown;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    md.codemirror = codeMirrorNode.CodeMirror as CodeMirror.Editor;

    // Bind events
    md.bindEventHandlers();

    // Clean the unnecessary elements from the node clone
    md.cleanCellClone();

    return md;
  }

  /**
   * Factory function for StickyMarkdown when creating if from a new markdown
   * cell. This function would append a new markdown cell to the main notebook.
   * @param stickyContent The sticky content that contains this markdown cell
   * @param notebook The current notebook
   * @returns A new StickyMarkdown object
   */
  static createFromNewCell(
    stickyContent: StickyContent,
    notebook: NotebookPanel
  ): StickyMarkdown {
    // Append a new markdown cell to the main notebook
    NotebookActions.insertBelow(notebook.content);
    NotebookActions.changeCellType(notebook.content, 'markdown');

    const newCell = notebook.content.activeCell as MarkdownCell;

    // Activate the original active cell
    notebook.content.activeCellIndex = notebook.content.activeCellIndex - 1;

    // Construct StickyMarkdown using the new cell as an existing cell
    return this.createFromExistingCell(stickyContent, newCell, notebook);
  }

  /**
   * Strip unnecessary elements from the nodes before appending it to stickyland
   */
  cleanCellClone = () => {
    // Remove the left region (prompt and collapser), header and footer
    this.cellNode.querySelector('.jp-Cell-inputCollapser')?.remove();
    this.cellNode.querySelector('.jp-InputArea-prompt')?.remove();
    this.cellNode.querySelector('.jp-CellHeader')?.remove();
    this.cellNode.querySelector('.jp-CellFooter')?.remove();

    // Add class name to the rendered region
    this.cellNode
      .querySelector('.jp-MarkdownOutput')
      ?.classList.add('sticky-md-output');

    this.cellNode.classList.add('sticky-md-cell');
    this.cellNode.classList.remove('hidden');

    // Render the latex on the clone node
    this.renderLatex();
  };

  /**
   * Bind event handlers for sticky markdown cell.
   */
  bindEventHandlers = () => {
    // Double click the rendered view should trigger editor
    this.node.addEventListener('dblclick', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.cell.rendered) {
        this.enterEditor();
      }
    });

    // Click on the rendered view should focus the current element
    this.node.addEventListener('click', (e: MouseEvent) => {
      if (this.cell.rendered) {
        this.node.focus();
      }
    });

    // Bind keyboard short cuts
    this.node.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey || e.ctrlKey) {
          // [Shift + enter] or [control + enter] render the markdown cell
          if (!this.cell.rendered) {
            this.quitEditor();
          }
          e.preventDefault();
          e.stopPropagation();
        } else {
          // [Enter] in rendered mode triggers the editor
          if (this.cell.rendered) {
            this.enterEditor();
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    });
  };

  /**
   * Create a toolbar element
   * @param items List of toolbar item names and onclick handlers
   */
  createToolbar = (
    items: {
      name: string;
      title: string;
      icon: LabIcon;
      onClick: (e: Event) => any;
    }[]
  ): HTMLElement => {
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
  };

  /**
   * Helper function to enter the editor mode.
   */
  enterEditor = () => {
    // Trigger the editor
    this.cell.rendered = false;

    // Move the cursor on the first line before the first character
    this.cell.editor.focus();
    this.cell.editor.setCursorPosition({ line: 0, column: 0 });
  };

  /**
   * Helper function to quit the editor mode.
   */
  quitEditor = () => {
    // Trigger the rendered output
    this.cell.rendered = true;

    // Focus the cell node so we can listen to keyboard events
    this.node.focus();

    /**
     * Since we are not attaching the renderer widget to any other widget, the
     * onAttach method is never called, so the latex typesetter is never called
     * We need to manually call it after rendering the node
     */
    this.renderLatex();
  };

  /**
   * A helper function to force render latex after timeout.
   * @param timeout Call the latex renderer after `timeout` ms
   */
  renderLatex = (timeout = 100) => {
    /**
     * Since we are not attaching the renderer widget to any other widget, the
     * onAttach method is never called, so the latex typesetter is never called
     * We need to manually call it after rendering the node
     * https://github.com/jupyterlab/jupyterlab/blob/d48e0c04efb786561137fb20773fc15788507f0a/packages/rendermime/src/widgets.ts#L225
     */
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.renderer.latexTypesetter?.typeset(this.renderer.node);
    }, timeout);
  };

  /**
   * Float the current code cell.
   */
  float = () => {
    // Create the floating window and put content from stickyland to the floating
    // window
    this.floatingWindow = new FloatingWindow(ContentType.Markdown, this);

    // Finally, toggle the `isFloating` property
    this.isFloating = true;
  };

  editClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Show the editing area
    if (this.cell.rendered) {
      this.enterEditor();
    }
  };

  runClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    // Render the markdown
    if (!this.cell.rendered) {
      this.quitEditor();
    }
  };

  launchClicked = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.float();
  };

  closeClicked = () => {
    // Show the original cell
    this.originalCell.inputHidden = false;

    // TEMP: replace the current content with the dropzone
    this.stickyContent.showDropzone();

    // Remove the code cell
    this.dispose();
  };

  toolBarItems = [
    {
      name: 'run',
      title: 'Run the cell',
      icon: MyIcons.runIcon,
      onClick: this.runClicked
    },
    {
      name: 'edit',
      title: 'Edit the cell',
      icon: MyIcons.editIcon,
      onClick: this.editClicked
    },
    {
      name: 'launch',
      title: 'Make the cell float',
      icon: MyIcons.launchIcon,
      onClick: this.launchClicked
    }
  ];

  dispose() {
    this.node.remove();
    this.toolbar.remove();
    this.isDisposed = true;
  }
}
