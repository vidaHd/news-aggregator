import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResourcesState } from './types';
import { NewsResources } from '../dataProvider/dataProviderTypes';
// import NYTMockData from '../NYTMockData.json'; you can uncomment this line to use mock data

import type { SetDataPayload, SetErrorPayload, SetBulkParametersPayload, SetParameterPayload } from './types';
import type {
  NewsApiArticleInterface,
  TheGuardianArticleInterface,
  NYTimesArticleInterface,
} from '../../components/feedsPage/newsTypes';

//  initial data
const initialState: ResourcesState = {
  [NewsResources.NewsApi]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      pageSize: 10,
      q: 'software',
    },
  },
  [NewsResources.TheGuardian]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      perPage: 10,
    },
  },
  [NewsResources.NewYorkTimes]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      pageSize: 10,
    },
  },
};

// create slice
const resourcesSlice = createSlice({
  name: 'newsResources',
  initialState,
  reducers: {
    setData: <
      T extends
        | Omit<NewsApiArticleInterface, 'parameters'>
        | Omit<TheGuardianArticleInterface, 'parameters'>
        | Omit<NYTimesArticleInterface, 'parameters'>,
    >(
      state: ResourcesState,
      action: PayloadAction<SetDataPayload<T>>,
    ) => {
      const { resourceName, data } = action.payload;
      state[resourceName].data = data;
      state[resourceName].isLoading = false;
    },

    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      const { resourceName } = action.payload;
      state[resourceName].hasError = true;
      state[resourceName].isLoading = false;

      /*
       * you can uncomment these lines to use mock data 👇

       * state[resourceName].data = NYTMockData.response as any;
       * state[resourceName].isLoading = false;
       */
    },

    setParameter: (state, action: PayloadAction<SetParameterPayload>) => {
      const { resource, parameters } = action.payload;
      state[resource].parameters = { ...state[resource].parameters, ...parameters };
    },

    setBulkParameters: (state, action: PayloadAction<SetBulkParametersPayload>) => {
      state[NewsResources.NewsApi].parameters = { ...state.NEWS_API.parameters, ...action.payload[NewsResources.NewsApi] };
      state[NewsResources.TheGuardian].parameters = {
        ...state.THE_GUARDIAN.parameters,
        ...action.payload[NewsResources.TheGuardian],
      };
      state[NewsResources.NewYorkTimes].parameters = {
        ...state.NEW_YORK_TIMES.parameters,
        ...action.payload[NewsResources.NewYorkTimes],
      };
    },
  },
});

// export actions
export const { setData, setError, setParameter, setBulkParameters } = resourcesSlice.actions;

// export reducer
export default resourcesSlice.reducer;
