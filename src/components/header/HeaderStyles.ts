import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';
import { HEADER_HEIGHT } from '../../core/constants';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(2)}`,
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
  },
  menuContainer: {
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.primary.light,
    '@media (min-width: 800px)': {
      display: 'flex',
    },
  },
  iconButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 1,
    '&:focus': {
      outline: 'none',
    },
  },
}));
