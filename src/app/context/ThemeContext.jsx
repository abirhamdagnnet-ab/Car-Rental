import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialIsDark = savedTheme === "dark" || !savedTheme && prefersDark;
    setIsDark(initialIsDark);
    if (initialIsDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { isDark, toggleTheme }, children });
}
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
export {
  ThemeProvider,
  useTheme
};
