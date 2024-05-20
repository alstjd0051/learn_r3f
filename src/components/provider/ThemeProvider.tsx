import React, { createContext, useCallback, useState } from "react";

interface ThemeContextType {
  theme: boolean;
  toggleTheme: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
    document.body.classList.toggle("dark");
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
