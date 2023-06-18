import { JupyterFrontEnd } from '@jupyterlab/application';
import { ToolbarButton } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { Widget } from '@lumino/widgets';
import {
  NotebookPanel,
  INotebookModel,
  INotebookTracker
} from '@jupyterlab/notebook';
import { StickyLand } from './stickyland';

export class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  // This maps each stickyLand object to a notebook title
  stickyLandMap: Map<string, StickyLand>;
  shell: JupyterFrontEnd.IShell;
  notebookTracker: INotebookTracker;
  documentManager: IDocumentManager;

  constructor(
    shell: JupyterFrontEnd.IShell,
    notebookTracker: INotebookTracker,
    documentManager: IDocumentManager
  ) {
    this.shell = shell;
    this.stickyLandMap = new Map<string, StickyLand>();
    this.notebookTracker = notebookTracker;
    this.documentManager = documentManager;

    // Listen to the notebook tracker to update stickyLandMap when a user closes
    // a notebook
    this.notebookTracker.currentChanged.connect((sender, panel) => {
      setTimeout(() => {
        const widgetIter = this.shell.widgets();
        const openPaths: Set<string> = new Set();
        let nextWidget = widgetIter.next();
        while (nextWidget !== undefined) {
          const context = this.documentManager.contextForWidget(nextWidget);
          if (context !== undefined) {
            openPaths.add(context.path);
          }
          nextWidget = widgetIter.next();
        }

        // Remove stickylands where their associated notebooks are closed
        for (const path of this.stickyLandMap.keys()) {
          if (!openPaths.has(path)) {
            this.stickyLandMap.delete(path);
          }
        }
      }, 500);
    });
  }

  createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    /**
     * Handler for the click event.
     */
    const onClickHandler = () => {
      // Check if we have already created stickyland
      const curPath = context.path;

      // Create it if we don't have it yet
      if (!this.stickyLandMap?.has(curPath)) {
        this.stickyLandMap?.set(curPath, new StickyLand(panel));
      }

      const curStickyLand = this.stickyLandMap?.get(curPath);

      // Check if we should show or hide this container
      if (curStickyLand?.isHidden()) {
        curStickyLand?.show();
      } else {
        curStickyLand?.hide();
      }

      // Alternative way to insert StickyLand to the notebook widget (boxLayout)
      // const stickyLand = new StickyLand();
      // const panelLayout = panel.layout as BoxLayout;
      // panelLayout.addWidget(stickyLand);
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
