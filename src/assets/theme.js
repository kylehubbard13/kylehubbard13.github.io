// Runs synchronously in <head> so the stored theme applies before first paint.
try {
  var stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }
} catch (e) {}
