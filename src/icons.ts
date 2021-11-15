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
import iconLand from '../style/img/icon-land.svg';
import iconExpand from '../style/img/icon-expand.svg';
import iconClose2 from '../style/img/icon-close2.svg';

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

  static landIcon = new LabIcon({
    name: 'icon-land',
    svgstr: iconLand
  });

  static closeIcon2 = new LabIcon({
    name: 'icon-close2',
    svgstr: iconClose2
  });

  static expandIcon = new LabIcon({
    name: 'icon-expand',
    svgstr: iconExpand
  });
}
