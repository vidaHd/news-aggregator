import { useStyles } from './DrawerStyles';
import { MenuItem, Typography } from '@mui/material';

import type { FC, ReactElement } from 'react';
import type { DrawerViewProps, MenuItemInterface } from './DrawerTypes';

const DrawerView: FC<DrawerViewProps> = (props) => {
  const { isDrawerOpen, menuItems, openDrawerWidth = 240, closeDrawerWidth = 40 } = props;

  const classes = useStyles({ openDrawerWidth, closeDrawerWidth });

  const createMenuItem = (item: MenuItemInterface, minimalMode: boolean, isLastItem: boolean): ReactElement => {
    const { title, icon, link } = item;

    return (
      <MenuItem key={Math.random()} className={`${classes.menuItem} ${isLastItem ? classes.ignoreBorderBottom : ''}`}>
        <a href={link} className={classes.textAndIcon}>
          {icon}
          {!minimalMode && <Typography>{title}</Typography>}
        </a>
      </MenuItem>
    );
  };

  return (
    <div className={`${classes.drawer} ${isDrawerOpen ? classes.openDrawer : ''}`}>
      {menuItems.map((item, index, array) => createMenuItem(item, !isDrawerOpen, array.length === index + 1))}
    </div>
  );
};

export default DrawerView;
