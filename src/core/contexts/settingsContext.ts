import { createContext } from 'react';

// create context for setting and pass only necessary methods to avoid crashes
// these methods will be replaced by real one in hooks/useSettings.ts
const SettingsContext = createContext({
  colorMode: {
    toggleColorMode: () => {
      console.warn('color mode context error');
    },
  },
  language: {
    toggleLanguage: () => {
      console.warn('language context error');
    },
  },
});

export default SettingsContext;
