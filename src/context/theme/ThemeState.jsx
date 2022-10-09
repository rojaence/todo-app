import { useReducer } from "react";
import ThemeContext from "./ThemeContext";
import ThemeReducer from "./ThemeReducer";

const ThemeProvider = (props) => {
  const initialState = {
    darkMode: false,
  };
  const THEME_MODE_KEY = "TodoAppDarkMode";

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const selectTheme = (value) => {
    value
    ? (document.documentElement.setAttribute("data-theme", "dark"),
      localStorage.setItem(THEME_MODE_KEY, true),
      dispatch({
        type: "SELECT_THEME",
        payload: true,
      }))
    : (document.documentElement.setAttribute("data-theme", "light"),
      localStorage.setItem(THEME_MODE_KEY, false),
      dispatch({
        type: "SELECT_THEME",
        payload: false,
      }));
  };

  const toggleDarkMode = () => {
    let value = localStorage.getItem(THEME_MODE_KEY);
    if (value === "true") {
      selectTheme(false);
    } else if (value === "false") {
      selectTheme(true);
    } else {
      selectTheme(false);
    }
  };

  const setThemeOnInit = () => {
    let themeValue = localStorage.getItem(THEME_MODE_KEY);
    let darkThemeMedia = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (themeValue) {
      if (themeValue === "true") selectTheme(true);
      else selectTheme(false);
    } else {
      if (darkThemeMedia) selectTheme(true);
      else selectTheme(false);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode: state.darkMode,
        toggleDarkMode,
        setThemeOnInit,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
