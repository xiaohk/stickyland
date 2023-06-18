import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-stickyland extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-stickyland:plugin',
  description:
    'Break free from the linear presentation of Jupyter Notebooks with sticky cells!',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-stickyland is activated!');

    const { commands } = app;
    const command = 'stickyland:command';

    // Add a command
    commands.addCommand(command, {
      label: 'Execute stickyland:command Command',
      caption: 'Execute stickyland:command Command',
      execute: (args: any) => {
        const orig = args['origin'];
        console.log(`stickyland:command has been called from ${orig}.`);
        if (orig !== 'init') {
          window.alert(`stickyland:command has been called from ${orig}.`);
        }
      }
    });

    // Call the command execution
    // commands.execute(command, { origin: 'init' }).catch(reason => {
    //   console.error(
    //     `An error occurred during the execution of stickyland:command.\n${reason}`
    //   );
    // });
  }
};

export default plugin;
