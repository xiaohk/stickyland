import {
  LabIcon,
  runIcon,
  editIcon,
  ellipsesIcon,
  caretDownEmptyIcon,
  closeIcon,
  addIcon
} from '@jupyterlab/ui-components';

import iconAdd from '../style/img/icon-add.svg';
import iconCollapse from '../style/img/icon-collapse.svg';
import iconLaunch from '../style/img/icon-launch.svg';
import iconLand from '../style/img/icon-land.svg';
import iconExpand from '../style/img/icon-expand.svg';
import iconClose2 from '../style/img/icon-close2.svg';
import iconChevron from '../style/img/icon-chevron.svg';
import iconDrag from '../style/img/icon-drag.svg';
import iconTabClose from '../style/img/icon-tabclose.svg';

export class MyIcons {
  static runIcon = runIcon;
  static editIcon = editIcon;
  static ellipsesIcon = ellipsesIcon;
  static closeIcon = closeIcon;
  static caretDownEmptyIcon = caretDownEmptyIcon;
  static addIcon2 = addIcon;

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

  static chevronIcon = new LabIcon({
    name: 'icon-chevron',
    svgstr: iconChevron
  });

  static dragIcon = new LabIcon({
    name: 'icon-drag',
    svgstr: iconDrag
  });

  static tabCloseIcon = new LabIcon({
    name: 'icon-tabClose',
    svgstr: iconTabClose
  });
}
