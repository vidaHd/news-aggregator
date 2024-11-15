import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { FeedCardViewProps } from './feedCard.type';
import { Button, Typography } from '@mui/material';
import { useStyles } from './feedCard.style';
import { NewsResources } from '../../core/dataProvider/dataProviderTypes';

const FeedCardView: FC<FeedCardViewProps> = (props) => {
  const { article } = props;
  const { author, date, description, images, resource, sourceName, title, url } = article;

  const resourceLogo =
    resource === NewsResources.NewsApi ? '/na.png' : resource === NewsResources.TheGuardian ? '/tg.png' : '/nt.png';

  const classes = useStyles();
  const { t } = useTranslation();

  // if there is an image, show it
  if (images[0]) {
    return (
      <div className={classes.container}>
        <div className={classes.summery}>
          <div className={classes.publisherInfo}>
            <Typography color="ButtonFace" className={classes.publisherInfoText}>
              {sourceName} / {author}
            </Typography>
          </div>

          <img src={images[0]} alt={title} className={classes.image} />

          <Typography>{title}</Typography>
        </div>
        <div className={classes.content}>
          <Typography>{description}</Typography>
          <Typography color="ButtonFace">{date}</Typography>
          <img src={resourceLogo} alt={title} className={classes.logo} />
          <div className={classes.emptyArea}></div>
          <Button
            onClick={() => {
              window.open(url, '_blank');
            }}
          >
            {t('feeds.continueToFullPage')}
          </Button>
        </div>
      </div>
    );
  }

  // if there is no image, show a text only card
  return (
    <div className={classes.divWithPadding}>
      <div className={classes.container}>
        <div className={classes.summery}>
          <img src={resourceLogo} alt={title} className={classes.logo} />
          <Typography color="ButtonFace" className={classes.publisherInfoText}>
            {sourceName} / {author}
          </Typography>

          <Typography>{title}</Typography>
        </div>
        <div className={classes.content}>
          <Typography>{description}</Typography>
          <Typography color="ButtonFace">{date}</Typography>
          <div className={classes.emptyArea}></div>
          <Button
            onClick={() => {
              window.open(url, '_blank');
            }}
          >
            {t('feeds.continueToFullPage')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedCardView;
