import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, getSavedTheme } from "../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || getPreferredTheme());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => {
      if (!getSavedTheme()) {
        const next = getPreferredTheme();
        applyTheme(next);
        setTheme(next);
      }
    };
    const syncTabs = (event) => {
      if (event.key === "theme" || event.key === null) {
        const next = getPreferredTheme();
        applyTheme(next);
        setTheme(next);
      }
    };
    preference.addEventListener("change", syncSystem);
    window.addEventListener("storage", syncTabs);
    return () => {
      preference.removeEventListener("change", syncSystem);
      window.removeEventListener("storage", syncTabs);
    };
  }, []);

  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        applyTheme(next, { persist: true });
        setTheme(next);
      }}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
