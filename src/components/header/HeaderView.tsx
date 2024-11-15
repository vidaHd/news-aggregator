import { useContext, type FC } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';

import SettingsContext from '../../core/contexts/settingsContext';
import { useStyles } from './HeaderStyles';

import type { HeaderViewProps } from './HeaderTypes';
import { useTranslation } from 'react-i18next';

const HeaderView: FC<HeaderViewProps> = (props) => {
  const { title, onHamburgerButtonClick } = props;
  const { colorMode, language } = useContext(SettingsContext);

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.menuContainer}>
        <MenuIcon onClick={onHamburgerButtonClick} />
      </div>

      <Typography fontFamily="dyna" sx={{ textDecoration: 'underline' }} variant="h5">
        {title}
      </Typography>

      <div className={classes.iconButtons}>
        <IconButton className={classes.iconButton} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton className={classes.iconButton} onClick={language.toggleLanguage} color="inherit">
          {t('language')}
        </IconButton>
      </div>
    </div>
  );
};

export default HeaderView;
