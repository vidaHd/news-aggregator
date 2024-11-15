import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },

  headerAndContentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  contentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
    padding: 8,
  },
}));
