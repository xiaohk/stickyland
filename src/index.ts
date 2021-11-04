import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ICommandPalette, MainAreaWidget, ToolbarButton } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { Message } from '@lumino/messaging';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { NotebookActions, NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {

    /**
     * Handler for the click event.
     */
    const onClickHandler = () => {
      console.log('button clicked');
      console.log(panel);
      console.log(context);
      // NotebookActions.runAll(panel.content, context.sessionContext);
      console.log(panel.constructor.name);
      console.log(panel.content);

      let stickyContainer = document.createElement('div');
      stickyContainer.innerHTML = 'StickyLand';

      // Put the stickyContainer below the toolbar
      const toolbarHeight = parseFloat(panel.toolbar.node.style.height);
      stickyContainer.style.top = `${toolbarHeight}px`;

      stickyContainer.classList.add('sticky-container');
      panel.node.append(stickyContainer);
    };

    let button = new ToolbarButton({
      className: 'sticky-button',
      iconClass: 'far fa-sticky-note',
      onClick: onClickHandler,
      tooltip: 'Open StickyLand'
    });

    // const numItems = toArray(panel.toolbar.children()).length;
    const insertIndex = 9;
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
