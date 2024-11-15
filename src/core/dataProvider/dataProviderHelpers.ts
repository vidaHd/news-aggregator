import querystring from 'qs';

import {
  NEWS_API_API_KEY,
  NEWS_API_BASE_URL,
  THE_GUARDIAN_BASE_URL,
  THE_GUARDIAN_API_KEY,
  NY_TIMES_BASE_URL,
  NY_TIMES_API_KEY,
} from '../constants';

import { type ApiKeyInformation, type GetBaseUrlByResourceName, type FetchDataOptions, NewsResources } from './dataProviderTypes';

// receive resource name and return base url and api key for that
export const getBaseUrlByResourceName: GetBaseUrlByResourceName = (resource) => {
  if (resource === NewsResources.NewsApi) {
    return {
      baseUrl: NEWS_API_BASE_URL,
      apiKey: NEWS_API_API_KEY,
    };
  }

  if (resource === NewsResources.TheGuardian) {
    return {
      baseUrl: THE_GUARDIAN_BASE_URL,
      apiKey: THE_GUARDIAN_API_KEY,
    };
  }

  if (resource === NewsResources.NewYorkTimes) {
    return {
      baseUrl: NY_TIMES_BASE_URL,
      apiKey: NY_TIMES_API_KEY,
    };
  }

  throw new Error('invalid Resource');
};

// merge request parameters with api key, then change it to query parameter format
export const createQueryParameters = (parameters: FetchDataOptions['parameters'], apiKey: ApiKeyInformation): string => {
  return querystring.stringify({ ...parameters, ...apiKey });
};
