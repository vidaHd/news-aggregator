import { ReactElement, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/system';
import { Provider } from 'react-redux';

import { customRoutes } from './core/routes';
import { store as reduxStore } from './core/redux/store';
import useSettings from './core/hooks/useSettings';
import SettingsContext from './core/contexts/settingsContext';
import i18n from './core/i18n';

export default function App(): ReactElement {
  const { colorMode, language, theme, selectedLanguage } = useSettings();

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={reduxStore}>
        <SettingsContext.Provider value={{ colorMode, language }}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{customRoutes}</BrowserRouter>
          </ThemeProvider>
        </SettingsContext.Provider>
      </Provider>
    </I18nextProvider>
  );
}
