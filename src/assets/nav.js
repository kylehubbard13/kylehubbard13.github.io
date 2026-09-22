(function () {
  var root = document.documentElement;

  var toggle = document.querySelector(".navtoggle");
  var nav = document.getElementById("sitenav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".dterm").forEach(function (term) {
    term.addEventListener("click", function () {
      var open = term.classList.toggle("is-open");
      term.setAttribute("aria-expanded", String(open));
    });
  });

  var themeBtn = document.querySelector(".themetoggle");
  var themeLabel = document.querySelector("[data-theme-label]");

  function prefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || (prefersDark() ? "dark" : "light");
  }

  function paintLabel() {
    if (themeLabel) {
      themeLabel.textContent = currentTheme() === "dark" ? "Light" : "Dark";
    }
  }

  if (themeBtn) {
    paintLabel();
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      paintLabel();
    });
  }
})();
