
import { useState, useEffect } from "react";

function useTheme() {
  const [theme, setTheme] = useState("dark");
  const newTheme = theme === "dark" ? "light" : "dark";
  
  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.remove(newTheme);
    rootElement.classList.add(theme);
  }, [theme, newTheme]);

  return [newTheme, setTheme];
}

export default useTheme;
