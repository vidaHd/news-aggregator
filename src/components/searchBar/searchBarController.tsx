import { useState, type FC } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import SearchBarView from './searchBarView';

import type { SearchBarControllerProps } from './searchBarTypes';
import { allSelectableResources } from './searchBarHelper';

const SearchBarController: FC<SearchBarControllerProps> = (props) => {
  const { onSearch, onResourceSelect, userCustomSorts } = props;

  const [selectedResources, setSelectedResources] = useState<string[]>(allSelectableResources);

  // limit the articles locally by selected resources
  const _onResourceSelect = (event: SelectChangeEvent<typeof selectedResources>): void => {
    const value = event.target.value;
    const valueAsArray = typeof value === 'string' ? value.split(',') : value;

    setSelectedResources(valueAsArray);
    onResourceSelect(valueAsArray);
  };

  return (
    <SearchBarView
      onSearch={onSearch}
      onResourceSelect={_onResourceSelect}
      selectedResources={selectedResources}
      userCustomSorts={userCustomSorts}
    />
  );
};

export default SearchBarController;
