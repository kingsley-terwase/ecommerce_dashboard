import { useEffect, useState } from "react";
import {
  backgroundColors,
  foregroundColors,
  borderColors,
  THEME_KEY,
  scrollBarColors,
  buttonColors,
  inputColors,
  mainColors,
  menuColors,
  menuItemColors,
  statusColors,
  elevateColors,
  shadowColors,
} from "@/lib/theme";
import ColorContext from "./ColorContext";

/**
 * @param {Object} props
 * @param {import("react").ReactNode} props.children
 */
export default function ColorProvider({ children }) {
  const [theme, setTheme] = useState(
    /** @returns {"light" | "dark"} */
    () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "light" || stored === "dark") return stored;
      }
      return "light";
    },
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((theme) => (theme === "light" ? "dark" : "light"));

  const value = {
    theme,
    toggleTheme,
    bg: backgroundColors[theme],
    fg: foregroundColors[theme],
    border: borderColors[theme],
    scrollbar: scrollBarColors[theme],
    button: buttonColors[theme],
    input: inputColors[theme],
    main: mainColors[theme],
    menu: menuColors[theme],
    menuItem: menuItemColors[theme],
    status: statusColors[theme],
    elevate: elevateColors[theme],
    shadow: shadowColors[theme],
  };

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
}
