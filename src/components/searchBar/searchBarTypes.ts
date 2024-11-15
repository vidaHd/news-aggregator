import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { UserCustomSort } from '../feedsPage/hooks/usePrepareData';

export interface SearchBarControllerProps {
  userCustomSorts: UserCustomSort;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResourceSelect: (selectedResources: string[]) => void;
}

export interface SearchBarViewProps {
  selectedResources: string[];
  userCustomSorts: UserCustomSort;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResourceSelect: (event: SelectChangeEvent<string[]>) => void;
}
