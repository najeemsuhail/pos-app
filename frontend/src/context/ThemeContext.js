import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const AVAILABLE_THEMES = ['dark', 'light'];
const DEFAULT_THEME = 'dark';

export const ThemeProvider = ({ children }) => {
  const envTheme = process.env.REACT_APP_THEME?.trim().toLowerCase();
  const isEnvThemeValid = AVAILABLE_THEMES.includes(envTheme);
  const lockedTheme = isEnvThemeValid ? envTheme : null;
  const [theme, setTheme] = useState(lockedTheme || DEFAULT_THEME);

  useEffect(() => {
    const savedTheme = localStorage.getItem('posTheme');
    const themeToUse = lockedTheme || (
      AVAILABLE_THEMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME
    );

    setTheme(themeToUse);
    document.documentElement.setAttribute('data-theme', themeToUse);

    if (lockedTheme) {
      localStorage.removeItem('posTheme');
      return;
    }

    localStorage.setItem('posTheme', themeToUse);
  }, [lockedTheme]);

  useEffect(() => {
    if (envTheme && !isEnvThemeValid) {
      console.warn(`Invalid REACT_APP_THEME "${envTheme}". Falling back to "${DEFAULT_THEME}".`);
    }
  }, [envTheme, isEnvThemeValid]);

  const switchTheme = (newTheme) => {
    if (lockedTheme || !AVAILABLE_THEMES.includes(newTheme)) {
      return;
    }

    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('posTheme', newTheme);

    // Track the last dark theme to make the toggle intuitive
    if (newTheme !== 'light') {
      localStorage.setItem('lastDarkTheme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
        availableThemes: AVAILABLE_THEMES,
        isThemeLocked: Boolean(lockedTheme)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
