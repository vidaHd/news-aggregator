import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createQueryParameters, getBaseUrlByResourceName } from './dataProviderHelpers';
import { setData, setError } from '../redux/resourcesSlice';

import type { ApiKeyInformation, FetchData } from './dataProviderTypes';

const getDataFromApi: FetchData = async (payload, { dispatch }) => {
  const { resource, parameters, valueKeyName } = payload;
  const { baseUrl, apiKey } = getBaseUrlByResourceName(resource);

  const apiKeyInformation = { [apiKey.key]: apiKey.value } as ApiKeyInformation;
  const queryParameters = createQueryParameters(parameters, apiKeyInformation);

  try {
    const response = await axios.get(`${baseUrl}${queryParameters}`, { timeout: 10000 });
    const data = valueKeyName ? response.data[valueKeyName] : response.data;

    dispatch(setData({ resourceName: resource, data }));
    return data;
  } catch (error) {
    dispatch(setError({ resourceName: resource }));
    throw error; // Re-throw the error for the component to handle if needed
  }
};

export const fetchData = createAsyncThunk('newsResources/fetchData', getDataFromApi);
