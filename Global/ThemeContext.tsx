import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeContextProps } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*

  THEME CONTEXT

*/

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const themePreference = await AsyncStorage.getItem("themePreference");
      if (themePreference !== null) {
        setIsDarkMode(themePreference === "dark");
      }
    } catch (err) {
      // Nothing
    }
  };

  const saveThemePreference = async () => {
    try {
      await AsyncStorage.setItem(
        "themePreference",
        isDarkMode ? "dark" : "light"
      );
    } catch (err) {
      // Nothing
    }
  };

  useEffect(() => {
    saveThemePreference();
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
