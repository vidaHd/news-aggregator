import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
    minHeight: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 0),
    borderBottom: `1px dashed ${theme.palette.divider}`,
    paddingInline: theme.spacing(1),
    boxSizing: 'border-box',

    '@media (min-width: 800px)': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  selectResourceContainer: {
    m: 1,
    minWidth: 200,
    width: '100%',
    '@media (min-width: 800px)': {
      width: 'unset',
    },
  },
  searchAreaContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100% ',
    justifyContent: 'end',
    '@media (min-width: 800px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: 'unset',
    },
  },
  bulkTextFieldContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    '@media (min-width: 800px)': {
      width: 'unset',
    },
  },
  bulkTextField: {
    width: '100%',
    '@media (min-width: 800px)': {
      width: 'unset',
    },
  },
  customizeButtonText: {
    display: 'none',
    '@media (min-width: 800px)': {
      display: 'block',
    },
  },
}));
