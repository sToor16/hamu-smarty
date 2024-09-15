import React, { createContext, useContext, useEffect, useState } from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

const ThemeContext = createContext({
  currentTheme: Theme.Dark,
  setTheme: (theme: Theme) => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? (savedTheme as Theme) : Theme.Dark;
  });

  const setTheme = (theme: Theme) => {
    setCurrentTheme(() => {
      localStorage.setItem("theme", theme);
      return theme;
    });
  };

  useEffect(() => {
    Object.values(Theme).forEach((theme) => {
      document.body.classList.remove(`${theme}-theme`);
    });
    document.body.classList.add(`${currentTheme}-theme`);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
