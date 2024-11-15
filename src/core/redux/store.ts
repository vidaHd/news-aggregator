import { configureStore } from '@reduxjs/toolkit';
import ResourcesReducer from './resourcesSlice';

export const store = configureStore({
  reducer: {
    resources: ResourcesReducer,
  },
});
