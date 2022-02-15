import { ToolbarButton } from '@jupyterlab/apputils';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { StickyLand } from './stickyland';

export class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  // This maps each stickyLand object to a notebook title
  stickyLandMap: Map<string, StickyLand> | null;

  constructor() {
    this.stickyLandMap = new Map();
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
