import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ButtonExtension } from './button';

const plugin = {
  id: 'jupyterlab_stickyland',
  autoStart: true,
  requires: [ICommandPalette],
  activate: function (app: JupyterFrontEnd) {
    console.log('Activating StickyLand.');
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
  }
};

export default plugin;
