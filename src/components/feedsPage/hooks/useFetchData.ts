import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  NewYorkTimesParameters,
  NewsApiParameters,
  NewsResources,
  TheGuardianParameters,
} from '../../../core/dataProvider/dataProviderTypes';
import { fetchData } from '../../../core/dataProvider';
import { setBulkParameters, setParameter } from '../../../core/redux/resourcesSlice';
import { ReduxState } from '../feedsPageTypes';
import { useEffect } from 'react';

type SetBulkQueryParameters = (parameters: { query?: string; page?: number; perPage?: number }) => void;
type SetQueryParameterToResource = (
  parameters: Partial<NewsApiParameters | TheGuardianParameters | NewYorkTimesParameters>,
  resource: NewsResources.NewsApi | NewsResources.TheGuardian | NewsResources.NewYorkTimes,
) => void;

interface UseFetchData {
  setBulkQueryParameters: SetBulkQueryParameters;
  setQueryParameterToResource: SetQueryParameterToResource;
}

const useFetchData = (): UseFetchData => {
  const dispatch: ThunkDispatch<void, void, AnyAction> = useDispatch();

  // gather all parameters from redux store in separate variables for each resource
  const newsApiCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewsApi]?.parameters,
  ) as NewsApiParameters;
  const theGuardianCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.TheGuardian]?.parameters,
  ) as TheGuardianParameters;
  const newYorkTimesCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewYorkTimes]?.parameters,
  ) as NewYorkTimesParameters;

  // define three functions to fetch data from each resource
  const fetchNewsApiDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.NewsApi,
        parameters: newsApiCurrentParameters as NewsApiParameters | undefined,
      }),
    );
  };
  const fetchTheGuardianDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.TheGuardian,
        valueKeyName: 'response',
        parameters: theGuardianCurrentParameters as TheGuardianParameters | undefined,
      }),
    );
  };
  const fetchNewYorkTimesDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.NewYorkTimes,
        valueKeyName: 'response',
        parameters: newYorkTimesCurrentParameters as NewYorkTimesParameters | undefined,
      }),
    );
  };

  // call fetch functions when parameters are changed
  useEffect(() => {
    fetchNewsApiDada();
  }, [
    newsApiCurrentParameters.q,
    newsApiCurrentParameters.page,
    newsApiCurrentParameters.pageSize,
    newsApiCurrentParameters.country,
    newsApiCurrentParameters.category,
  ]);
  useEffect(() => {
    fetchTheGuardianDada();
  }, [
    theGuardianCurrentParameters.q,
    theGuardianCurrentParameters.page,
    theGuardianCurrentParameters.perPage,
    theGuardianCurrentParameters.section,
    theGuardianCurrentParameters.tag,
  ]);
  useEffect(() => {
    fetchNewYorkTimesDada();
  }, [
    newYorkTimesCurrentParameters.q,
    newYorkTimesCurrentParameters.page,
    newYorkTimesCurrentParameters.pageSize,
    newYorkTimesCurrentParameters.begin_date,
    newYorkTimesCurrentParameters.end_date,
  ]);

  // bulk set parameters will be used to set parameters for all resources
  const setBulkQueryParameters: SetBulkQueryParameters = (newParameters) => {
    if ('query' in newParameters) {
      // search has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { q: newParameters.query },
          [NewsResources.TheGuardian]: { q: newParameters.query },
          [NewsResources.NewYorkTimes]: { q: newParameters.query },
        }),
      );
    } else if ('page' in newParameters) {
      // pagination has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { page: newParameters.page },
          [NewsResources.TheGuardian]: { page: newParameters.page },
          [NewsResources.NewYorkTimes]: { page: newParameters.page },
        }),
      );
    } else if ('perPage' in newParameters) {
      // perPage has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { pageSize: newParameters.perPage },
          [NewsResources.TheGuardian]: { perPage: newParameters.perPage },
          [NewsResources.NewYorkTimes]: { pageSize: newParameters.perPage },
        }),
      );
    } else {
      throw new Error('Invalid parameters');
    }
  };

  // set query parameter to a specific resource
  const setQueryParameterToResource: SetQueryParameterToResource = (newParameters, resource) => {
    dispatch(
      setParameter({
        resource: resource,
        parameters: newParameters,
      }),
    );
  };

  return { setBulkQueryParameters, setQueryParameterToResource };
};

export default useFetchData;
