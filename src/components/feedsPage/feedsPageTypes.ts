import type { ChangeEvent } from 'react';
import type { NYTimesArticleInterface, NewsApiArticleInterface, TheGuardianArticleInterface } from './newsTypes';
import type { UserCustomSort } from './hooks/usePrepareData';
import {
  type NewsApiParameters,
  type TheGuardianParameters,
  type NewYorkTimesParameters,
  NewsResources,
} from '../../core/dataProvider/dataProviderTypes';

export interface ReduxState {
  [NewsResources.NewsApi]?: {
    data: NewsApiArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
    parameters: NewsApiParameters;
  };

  [NewsResources.TheGuardian]?: {
    data: TheGuardianArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
    parameters: TheGuardianParameters;
  };

  [NewsResources.NewYorkTimes]?: {
    data: NYTimesArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
    parameters: NewYorkTimesParameters;
  };
}

export interface FeedsPageViewProps {
  articles: DisplayableArticle[];
  totalCount: number;
  userCustomSorts: UserCustomSort;

  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResourceSelect: (selectedResources: string[]) => void;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export interface DisplayableArticle {
  resource: NewsResources.NewsApi | NewsResources.TheGuardian | NewsResources.NewYorkTimes;
  date: string;
  title: string;
  description: string;
  author: string;
  url: string;
  images: string[];
  sourceName: string;
}
