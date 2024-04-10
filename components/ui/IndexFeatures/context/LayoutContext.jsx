import { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [navTheme, setNavTheme] = useState("onLightBackground");

  const changeNavTheme = (theme) => {
    setNavTheme(theme);
  };

  return (
    <LayoutContext.Provider
      value={{ navTheme, changeNavTheme: changeNavTheme }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
