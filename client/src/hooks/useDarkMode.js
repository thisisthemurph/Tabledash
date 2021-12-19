import { useState } from "react";

const useDarkMode = () => {
  const getIsDarkMode = () => {
    return JSON.parse(localStorage.getItem("dark-mode") || "false");
  };

  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

  const saveIsDarkMode = (isDarkMode) => {
    localStorage.setItem("dark-mode", JSON.stringify(Boolean(isDarkMode)));
    setIsDarkMode(isDarkMode);
  };

  return [isDarkMode, saveIsDarkMode];
};

export default useDarkMode;
