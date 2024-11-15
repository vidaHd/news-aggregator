import { type FC } from 'react';
import { Pagination, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useStyles } from './feedsPageStyles';
import { FeedCard } from '../feedCard';
import { SearchBar } from '../searchBar';

import type { FeedsPageViewProps } from './feedsPageTypes';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
  const { articles, totalCount, userCustomSorts, onSearch, onPageChange, onResourceSelect } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <SearchBar userCustomSorts={userCustomSorts} onSearch={onSearch} onResourceSelect={onResourceSelect} />

      {!articles.length && (
        <div className={classes.noData}>
          <Typography variant="h2" sx={{ color: 'gold' }}>
            Oops!
          </Typography>
          <Typography>{t('feeds.noData')}</Typography>
        </div>
      )}

      {articles.map((article, index) => (
        <FeedCard article={article} key={index} />
      ))}

      {!!articles.length && (
        <Pagination
          count={totalCount}
          sx={{ marginTop: 2 }}
          onChange={(_event, selectedPage) => {
            onPageChange(selectedPage);
          }}
        />
      )}
    </div>
  );
};

export default FeedsPageView;
