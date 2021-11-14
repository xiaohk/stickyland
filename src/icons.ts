import {
  LabIcon,
  runIcon,
  editIcon,
  ellipsesIcon,
  caretDownEmptyIcon,
  closeIcon
} from '@jupyterlab/ui-components';

import iconAdd from '../style/img/icon-add.svg';
import iconCollapse from '../style/img/icon-collapse.svg';
import iconLaunch from '../style/img/icon-launch.svg';
import iconExpand from '../style/img/icon-expand.svg';

export class MyIcons {
  static runIcon = runIcon;
  static editIcon = editIcon;
  static ellipsesIcon = ellipsesIcon;
  static closeIcon = closeIcon;
  static caretDownEmptyIcon = caretDownEmptyIcon;

  static addIcon = new LabIcon({
    name: 'icon-add',
    svgstr: iconAdd
  });

  static collapseIcon = new LabIcon({
    name: 'icon-collapse',
    svgstr: iconCollapse
  });

  static launchIcon = new LabIcon({
    name: 'icon-launch',
    svgstr: iconLaunch
  });

  static expandIcon = new LabIcon({
    name: 'icon-expand',
    svgstr: iconExpand
  });
}
