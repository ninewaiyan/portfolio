export function getSavedTheme() {
  try {
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

export function getPreferredTheme() {
  return getSavedTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export function applyTheme(theme, { persist = false } = {}) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  document.documentElement.classList.toggle("dark", next === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#100e13" : "#f4f9fc");
  if (persist) {
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Switching still works when browser storage is unavailable.
    }
  }
}
