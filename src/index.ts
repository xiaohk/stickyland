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
import { DocumentRegistry } from '@jupyterlab/docregistry';
import {
  NotebookActions,
  NotebookPanel,
  INotebookModel
} from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    /**
     * Handler for the click event.
     */
    const onClickHandler = () => {
      console.log('button clicked, yo!');
      console.log(panel);
      console.log(context);

      // Check if we have already created stickyland
      let stickyContainer: HTMLElement | null =
        document.querySelector('.sticky-container');

      // Create it if we don't have it yet
      if (stickyContainer === null) {
        stickyContainer = document.createElement('div');
        stickyContainer.classList.add('sticky-container');
        stickyContainer.classList.add('hidden');

        stickyContainer.innerHTML = 'StickyLand';

        // Put the stickyContainer below the toolbar
        const toolbarHeight = parseFloat(panel.toolbar.node.style.height);
        stickyContainer.style.top = `${toolbarHeight}px`;

        panel.node.append(stickyContainer);
      }

      // Check if we should show or hide this container
      if (stickyContainer?.classList.contains('hidden')) {
        stickyContainer?.classList.remove('hidden');
      } else {
        stickyContainer?.classList.add('hidden');
      }
    };

    const button = new ToolbarButton({
      className: 'sticky-button',
      iconClass: 'far fa-sticky-note',
      onClick: onClickHandler,
      tooltip: 'Show/Hide StickyLand'
    });

    // const numItems = toArray(panel.toolbar.children()).length;
    const insertIndex = 10;
    panel.toolbar.insertItem(insertIndex, 'stickyLand', button);

    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

const plugin = {
  id: 'jupyterlab_stickyland',
  autoStart: true,
  requires: [ICommandPalette],
  activate: function (app: JupyterFrontEnd) {
    console.log('activating button!');
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
  }
};

export default plugin;
