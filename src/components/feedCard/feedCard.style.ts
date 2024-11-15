import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    padding: 8,
    marginTop: 4,
    border: '1px solid gray',
    borderRadius: 4,
    minHeight: 150,
    position: 'relative',

    '@media (min-width: 800px)': {
      flexDirection: 'row',
    },
  },
  publisherInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2px 4px',
    borderRadius: 4,
  },
  image: {
    objectFit: 'contain',
    width: '90%',
    maxHeight: 250,
    alignSelf: 'center',
    margin: '30px 0px 10px 0px',
    '@media (min-width: 800px)': {
      flexDirection: 'row',
    },
    '&:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)',
    },
  },
  logo: {
    objectFit: 'contain',
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  summery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 40%',
    '@media (min-width: 800px)': {
      borderRight: '1px dashed gray',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 60%',
    '@media (min-width: 800px)': {
      padding: 8,
    },
  },
  emptyArea: {
    flex: 1,
  },
}));
