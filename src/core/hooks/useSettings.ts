import { useEffect, useMemo, useState } from 'react';
import { Theme, createTheme } from '@mui/material';
import { readFromLocalStorage, writeToLocalStorage } from '../helpers';

const App_Settings = 'App_Settings';

interface UseSettings {
  colorMode: {
    toggleColorMode: () => void;
  };
  language: {
    toggleLanguage: () => void;
  };
  theme: Theme;
  selectedLanguage: 'en' | 'de';
}

type Language = 'en' | 'de';
type ThemeMode = 'light' | 'dark';

// this hook will provide the accessability to setting context where ever needed
const useSettings = (): UseSettings => {
  const defaultSettings = readFromLocalStorage<{
    mode: ThemeMode;
    language: Language;
  }>(App_Settings);

  const [mode, setMode] = useState<ThemeMode>(defaultSettings?.mode || 'dark');
  const [language, setLanguage] = useState<Language>(defaultSettings?.language || 'en');

  useEffect(() => {
    writeToLocalStorage(App_Settings, { mode, language });
  }, [mode, language]);

  // this function will toggle the color mode
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // this function will toggle the language
  const languageSettings = useMemo(
    () => ({
      toggleLanguage: (): void => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'de' : 'en'));
      },
    }),
    [],
  );

  // this function will create a theme based on the selected mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#242424' : '#f0f2f5',
            paper: mode === 'dark' ? '#242424' : '#ffffff',
          },
        },
      }),
    [mode],
  );

  return { colorMode, language: languageSettings, theme, selectedLanguage: language };
};

export default useSettings;
