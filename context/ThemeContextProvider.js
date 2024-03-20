// ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [categoryContext, setcategoryContext] = useState(null);
  const [avgratingContext, setavgratingContext] = useState(null);
  const [filterContext, setfilterContext] = useState(null);
  const [searchTextContext, setsearchTextContext] = useState(null);
  const [userNameContext, setuserNameContext] = useState(null);

  const [isDarkTheme, setisDarkTheme] = useState(false);

  const toggleTheme = () => {
    setisDarkTheme((prev) => !prev);
  };
  return (
    <ThemeContext.Provider
      value={{
        categoryContext,
        setcategoryContext,
        avgratingContext,
        setavgratingContext,
        filterContext,
        setfilterContext,
        searchTextContext,
        setsearchTextContext,
        userNameContext,
        setuserNameContext,
        isDarkTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
