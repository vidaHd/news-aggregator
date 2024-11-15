import { useSelector } from 'react-redux';
import { DisplayableArticle, ReduxState } from '../feedsPageTypes';
import { NewsResources } from '../../../core/dataProvider/dataProviderTypes';
import { debounce, mergeArticles, sortFeeds } from '../feedsPageHelper';

import { useState } from 'react';
import { allSelectableResources } from '../../searchBar/searchBarHelper';

export interface UserCustomSort {
  author: string;
  category: string;
  sources: string;
}

interface UsePrepareData {
  data: DisplayableArticle[];
  isLoading: boolean;
  onResourceSelect: (selectedResources: string[]) => void;
  totalCount: number;
  userCustomSorts: UserCustomSort;
}

const usePrepareData = (): UsePrepareData => {
  const [selectedResources, setSelectedResources] = useState<string[]>(allSelectableResources);

  // gather all data from redux store in separate variables
  const newsApiData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewsApi],
  ) as ReduxState[NewsResources.NewsApi];
  const theGuardianData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.TheGuardian],
  ) as ReduxState[NewsResources.TheGuardian];
  const newYorkTimesData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewYorkTimes],
  ) as ReduxState[NewsResources.NewYorkTimes];

  // extract user custom sorts from redux
  const userCustomSorts: UserCustomSort = {
    author: newsApiData?.parameters.author ?? '',
    category: newsApiData?.parameters.category ?? '',
    sources: theGuardianData?.parameters.tag ?? '',
  };

  // app should be loading only when all of resources are in loading state and there is no data in redux store
  const isLoading = !!newsApiData?.isLoading && !!theGuardianData?.isLoading && !!newYorkTimesData?.isLoading;

  // merge data from all resources
  const mergedData = mergeArticles({
    newsApiData,
    theGuardianData,
    newYorkTimesData,
  });

  // sort feeds by reference
  sortFeeds(mergedData, userCustomSorts);

  // filter by resource is client side filtering
  const filteredData = mergedData.filter((article) => selectedResources.includes(article.resource));

  // calculate total count
  const totalCount =
    (newsApiData?.data?.totalResults ?? 0) + (theGuardianData?.data?.total ?? 0) + (newYorkTimesData?.data?.meta.time ?? 0);

  const onResourceSelect = debounce((selectedResources: string[]): void => {
    setSelectedResources((allSelectableResources as string[]).filter((resource) => selectedResources.includes(resource)));
  }, 500);

  return {
    data: filteredData,
    isLoading,
    onResourceSelect,
    totalCount,
    userCustomSorts,
  };
};

export default usePrepareData;
