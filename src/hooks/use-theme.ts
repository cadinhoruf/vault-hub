"use client";
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return { theme, setTheme, toggleTheme };
};
