import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    display: 'none',
    width: 40,
    flexDirection: 'column',
    boxShadow: `0.5px 0px 4px 0.5px ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
    zIndex: 1,
    transition: 'width 0.5s',
    '@media (min-width: 800px)': {
      display: 'flex',
    },
  },
  openDrawer: {
    width: 240,
  },
  menuItem: {
    display: 'flex',
    height: 40,
    justifyContent: 'center !important',
    borderBottom: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    } !important`,
  },
  ignoreBorderBottom: {
    borderBottom: 'unset !important',
    background: 'green',
  },
  textAndIcon: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
  },
}));
