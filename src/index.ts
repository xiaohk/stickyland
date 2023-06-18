import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { ButtonExtension } from './button';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';

const plugin = {
  id: 'jupyterlab_stickyland',
  autoStart: true,
  requires: [INotebookTracker, IDocumentManager],
  activate: function (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    documentManager: IDocumentManager
  ) {
    console.log('Activating StickyLand.');

    app.docRegistry.addWidgetExtension(
      'Notebook',
      new ButtonExtension(app.shell, notebookTracker, documentManager)
    );
  }
};

export default plugin;
