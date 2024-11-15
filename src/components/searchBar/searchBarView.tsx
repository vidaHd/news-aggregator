import { cloneElement, type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, Popover, TextField, Typography } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import { useStyles } from './searchBarStyle';
import { resourceSelectItems, MenuProps } from './searchBarHelper';

import type { SearchBarViewProps } from './searchBarTypes';

const SearchBarView: FC<SearchBarViewProps> = (props) => {
  const { selectedResources, userCustomSorts, onSearch, onResourceSelect } = props;

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const searchOptions = [
    {
      id: 'author',
      label: t('searchBar.author'),
      defaultValue: userCustomSorts.author,
      iconComponent: <PersonIcon />,
    },
    {
      id: 'category',
      label: t('searchBar.category'),
      defaultValue: userCustomSorts.category,
      iconComponent: <PublicIcon />,
    },
    {
      id: 'sources',
      label: t('searchBar.sources'),
      defaultValue: userCustomSorts.sources,
      iconComponent: <CategoryIcon />,
    },
  ];

  return (
    <div className={classes.container}>
      <FormControl className={classes.selectResourceContainer} sx={{ minWidth: 200 }}>
        <InputLabel id="resource-select-label">{t('searchBar.selectResources')}</InputLabel>
        <Select
          style={{ marginInline: 4, flex: 1 }}
          value={selectedResources}
          onChange={onResourceSelect}
          input={<OutlinedInput id="select-multiple-chip" label={t('searchBar.selectResources')} />}
          labelId="resource-select-label"
          MenuProps={MenuProps}
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {resourceSelectItems.map((resource) => (
            <MenuItem key={resource.value} value={resource.value} style={{ fontWeight: theme.typography.fontWeightRegular }}>
              {resource.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className={classes.searchAreaContainer}>
        <Box className={classes.bulkTextFieldContainer}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            onChange={onSearch}
            id="bulk"
            label={t('searchBar.searchAnyThing')}
            variant="standard"
            className={classes.bulkTextField}
          />
        </Box>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button
                {...bindTrigger(popupState)}
                variant="outlined"
                sx={{ marginTop: 2, border: 'unset' }}
                startIcon={<SettingsIcon />}
              >
                <Typography fontSize="small" className={classes.customizeButtonText}>
                  {t('searchBar.customizeYourFeeds')}
                </Typography>
              </Button>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {searchOptions.map((option) => {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                      {!!option.iconComponent &&
                        cloneElement(option.iconComponent, { sx: { color: 'action.active', mr: 1, my: 0.5 } })}

                      <TextField
                        onChange={onSearch}
                        id={option.id}
                        label={option.label}
                        defaultValue={option.defaultValue}
                        variant="standard"
                      />
                    </Box>
                  );
                })}
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
};

export default SearchBarView;
