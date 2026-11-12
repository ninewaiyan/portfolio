// Set the theme before the app paints to avoid a flash of the wrong colors.
(() => {
  let saved;
  try {
    saved = localStorage.getItem("theme");
  } catch {
    // Some browsing modes make storage unavailable.
  }
  const theme = saved === "light" || saved === "dark"
    ? saved
    : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#100e13" : "#f4faf6");
})();
