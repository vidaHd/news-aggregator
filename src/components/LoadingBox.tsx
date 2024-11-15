import { Skeleton, Typography, Card, CardContent, Grid } from '@mui/material';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme) => ({
  mainContainer: {
    paddingInline: theme.spacing(2),
    '@media (min-width: 800px)': {
      paddingInline: theme.spacing(16),
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid gray',
    paddingInline: theme.spacing(2),
    alignItems: 'center',
    '@media (min-width: 800px)': {
      flexDirection: 'row',
      paddingInline: theme.spacing(16),
      height: 150,
    },
  },
  thinRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1px solid gray',
    paddingInline: theme.spacing(2),
  },
  skeletonCard: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    marginTop: 4,
    border: '1px solid gray',
    borderRadius: 4,
    minHeight: 150,
    position: 'relative',
  },
}));

const LoadingPage: FC = () => {
  const classes = useStyles();

  const renderSkeletonCards = (count: number): JSX.Element[] => {
    const skeletonCards = [];
    for (let i = 0; i < count; i++) {
      skeletonCards.push(
        <Grid item key={i}>
          <Card className={classes.container}>
            <div className={classes.thinRow}>
              <Skeleton variant="rectangular" height={120} width={'39%'} style={{ borderRadius: '4px 4px 0 0' }} />
              <Skeleton variant="rectangular" height={120} width={'60%'} style={{ borderRadius: '4px 4px 0 0' }} />
            </div>

            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <Skeleton width="80%" />
                </div>

                <div style={{ flex: 1, marginLeft: 8 }}>
                  <Skeleton width="70%" height={60} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>,
      );
    }
    return skeletonCards;
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width={300} height={150} />
        </Typography>

        <Typography variant="h4" gutterBottom>
          <Skeleton width={200} height={120} />
        </Typography>
      </div>

      <Grid container direction="column" spacing={2}>
        {renderSkeletonCards(4)}
      </Grid>
    </div>
  );
};

export default LoadingPage;
