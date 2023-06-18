import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IToolbarWidgetRegistry } from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ToolbarButton } from '@jupyterlab/apputils';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import {
  NotebookPanel,
  INotebookModel,
  NotebookWidgetFactory
} from '@jupyterlab/notebook';
import { StickyLand } from './stickyland';

const FACTORY = 'name';

// function activatePlugin(
//   app: JupyterFrontEnd,
//   // ...
//   toolbarRegistry: IToolbarWidgetRegistry | null,
//   settingRegistry: ISettingRegistry | null
// ): NotebookWidgetFactory.IFactory {
//   const { commands } = app;
//   let toolbarFactory:
//     | ((widget: NotebookPanel) => DocumentRegistry.IToolbarItem[])
//     | undefined;

//   // Register notebook toolbar specific widgets
//   if (toolbarRegistry) {
//     toolbarRegistry.registerFactory<NotebookPanel>(FACTORY, 'cellType', panel =>
//       ToolbarItems.createCellTypeItem(panel, translator)
//     );

//     toolbarRegistry.registerFactory<NotebookPanel>(
//       FACTORY,
//       'kernelStatus',
//       panel => Toolbar.createKernelStatusItem(panel.sessionContext, translator)
//     );
//     // etc...

//     if (settingRegistry) {
//       // Create the factory
//       toolbarFactory = createToolbarFactory(
//         toolbarRegistry,
//         settingRegistry,
//         // Factory name
//         FACTORY,
//         // Setting id in which the toolbar items are defined
//         '@jupyterlab/notebook-extension:panel',
//         translator
//       );
//     }
//   }

//   const factory = new NotebookWidgetFactory({
//     name: FACTORY,
//     fileTypes: ['notebook'],
//     modelName: 'notebook',
//     defaultFor: ['notebook'],
//     // ...
//     toolbarFactory,
//     translator: translator
//   });
//   app.docRegistry.addWidgetFactory(factory);
