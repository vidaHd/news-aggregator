import moment from 'moment';

import { NewsResources } from '../../core/dataProvider/dataProviderTypes';
import { UserCustomSort } from './hooks/usePrepareData';

import type { NYTimesArticleInterface, NewsApiArticleInterface, TheGuardianArticleInterface } from './newsTypes';
import type { ReduxState, DisplayableArticle } from './feedsPageTypes';

export const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

/**
 * each resource has different data structure
 */

// this function will extract only compatible data from NewsApi data structure
const extractCompatibleDataFromNewsApiData = (data?: NewsApiArticleInterface | null): DisplayableArticle[] => {
  if (!data || !Array.isArray(data.articles)) return [];

  return data.articles.map((article) => ({
    resource: NewsResources.NewsApi,
    date: moment(new Date(article.publishedAt)).format(DATE_FORMAT),
    title: article.title,
    description: article.description,
    author: article.author,
    url: article.url,
    images: [article.urlToImage],
    sourceName: article.source.name,
  }));
};

// this function will extract only compatible data from TheGuardian data structure
const extractCompatibleDataFromTheGuardianData = (data?: TheGuardianArticleInterface | null): DisplayableArticle[] => {
  if (!data || !Array.isArray(data.results)) return [];

  return data.results.map((article) => ({
    resource: NewsResources.TheGuardian,
    date: moment(new Date(article.webPublicationDate)).format(DATE_FORMAT),
    title: article.webTitle,
    description: 'for more details click on the button below',
    author: article.sectionName,
    url: article.webUrl,
    images: [],
    sourceName: article.sectionName,
  }));
};

// this function will extract only compatible data from NewYorkTimes data structure
const extractCompatibleDataFromNewYorkTimesData = (data?: NYTimesArticleInterface | null): DisplayableArticle[] => {
  if (!data || !Array.isArray(data.docs)) return [];

  return data.docs.map((article) => ({
    resource: NewsResources.NewYorkTimes,
    date: moment(new Date(article.pub_date)).format(DATE_FORMAT),
    title: article.headline.main,
    description: article.lead_paragraph,
    author: article.byline.original,
    url: article.web_url,
    images: [],
    sourceName: article.source,
  }));
};

// this function will merge compatible data from all resources to one array
// to ensure that all have the same data structure and show them in the same way
export const mergeArticles = (data: {
  newsApiData: ReduxState[NewsResources.NewsApi];
  theGuardianData: ReduxState[NewsResources.TheGuardian];
  newYorkTimesData: ReduxState[NewsResources.NewYorkTimes];
}): DisplayableArticle[] => {
  const { newsApiData, theGuardianData, newYorkTimesData } = data;

  const mergedData: DisplayableArticle[] = [
    ...extractCompatibleDataFromNewsApiData(newsApiData?.data).slice(0, 10),
    ...extractCompatibleDataFromTheGuardianData(theGuardianData?.data),
    ...extractCompatibleDataFromNewYorkTimesData(newYorkTimesData?.data),
  ];

  return mergedData;
};

// use debounce to prevent calling functions too many times
export const debounce = <T extends (...args: any[]) => void>(callback: T, delay: number): any => {
  let timeoutId: any;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

// get array of objects and sort them by value base of specific key
export const sortArrayByValue = <T>(array: T[], key: keyof T, value: string): T[] => {
  return array.sort((a, b) => {
    const valueA = (a[key] as unknown as string)?.toString().toUpperCase();
    const valueB = (b[key] as unknown as string)?.toString().toUpperCase();

    if (valueA === value.toUpperCase() && valueB !== value.toUpperCase()) {
      return -1; // Move matching value to the top
    } else if (valueA !== value.toUpperCase() && valueB === value.toUpperCase()) {
      return 1; // Move matching value to the top
    } else {
      return 0; // Maintain original order for other cases
    }
  });
};

// sort articles by date and by user customizations
export const sortFeeds = (mergedData: DisplayableArticle[], userCustomSorts: UserCustomSort): void => {
  // all articles should be sorted by date
  mergedData.sort((a, b) => {
    const dateA = moment(a.date, DATE_FORMAT);
    const dateB = moment(b.date, DATE_FORMAT);

    return dateA.isBefore(dateB) ? 1 : -1;
  });

  // when user has custom customization, data should sort for it to have better experience
  for (const [key, value] of Object.entries(userCustomSorts)) {
    if (value) {
      switch (key) {
        case 'author':
          sortArrayByValue(mergedData, 'author', value);
          break;
        case 'category':
          sortArrayByValue(mergedData, 'title', value);
          break;
        case 'sources':
          sortArrayByValue(mergedData, 'sourceName', value);
          break;
      }
    }
  }
};
