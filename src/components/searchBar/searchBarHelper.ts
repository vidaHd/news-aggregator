import { NewsResources } from '../../core/dataProvider/dataProviderTypes';

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const resourceSelectItems = [
  { label: 'News API', value: NewsResources.NewsApi },
  { label: 'The Guardian', value: NewsResources.TheGuardian },
  { label: 'New York Times', value: NewsResources.NewYorkTimes },
];

export const allSelectableResources = [NewsResources.NewsApi, NewsResources.TheGuardian, NewsResources.NewYorkTimes];
