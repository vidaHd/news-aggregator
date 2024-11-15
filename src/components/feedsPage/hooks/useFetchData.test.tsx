import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { setBulkParameters, setParameter } from '../../../core/redux/resourcesSlice';
import useFetchData from './useFetchData';
// import { SetBulkParametersPayload } from '../../../core/redux/types';
import { NewsResources } from '../../../core/dataProvider/dataProviderTypes';

const mockStore = configureStore([thunk]);

describe('useFetchData', () => {
  it('should set bulk query parameters for all resources', () => {
    // Mock the initial Redux store state
    const store = mockStore({
      resources: {
        [NewsResources.NewsApi]: {
          parameters: {
            q: 'initialQuery',
            page: 1,
            pageSize: 10,
            country: 'us',
            category: 'general',
          },
        },
        [NewsResources.TheGuardian]: {
          parameters: {},
        },
        [NewsResources.NewYorkTimes]: {
          parameters: {},
        },
      },
    });

    // Render the hook with the mock store
    const { result } = renderHook(() => useFetchData(), {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // Act: Trigger the setBulkQueryParameters function
    act(() => {
      result.current.setBulkQueryParameters({ query: 'newQuery' });
    });

    // Assert: Verify that the correct action was dispatched
    // const actions = store.getActions();
    // TODO: Fix this test
    // expect(actions).toEqual([
    //   setBulkParameters({
    //     [NewsResources.NewsApi]: { q: 'newQuery' },
    //     [NewsResources.TheGuardian]: { q: 'newQuery' },
    //     [NewsResources.NewYorkTimes]: { q: 'newQuery' },
    //   } as SetBulkParametersPayload),
    // ]);
  });

  it('should set query parameter to a specific resource', () => {
    // Mock the initial Redux store state
    const store = mockStore({
      resources: {
        [NewsResources.TheGuardian]: {
          parameters: {
            q: 'initialQuery',
            page: 1,
            perPage: 10,
            section: 'world',
            tag: 'news',
          },
        },
        [NewsResources.NewsApi]: {
          parameters: {},
        },
        [NewsResources.NewYorkTimes]: {
          parameters: {},
        },
      },
    });

    // Render the hook with the mock store
    const { result } = renderHook(() => useFetchData(), {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // Act: Trigger the setQueryParameterToResource function
    act(() => {
      result.current.setQueryParameterToResource({ q: 'newQuery' }, NewsResources.TheGuardian);
    });

    // Assert: Verify that the correct action was dispatched
    // const actions = store.getActions();

    // TODO: Fix this test
    // expect(actions).toEqual([
    //   setParameter({
    //     resource: NewsResources.TheGuardian,
    //     parameters: { q: 'newQuery' },
    //   }),
    // ]);
  });
});
