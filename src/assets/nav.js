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

  // Inline glosses. The popover is absolutely positioned against the word, so
  // nudge it back inside the viewport when the word sits near an edge.
  var glosses = document.querySelectorAll(".gloss");

  // Measure against documentElement.clientWidth, never window.innerWidth: an
  // overflowing popover widens the document, which inflates innerWidth, and the
  // clamp then reads a viewport the overflow itself created.
  function place(gloss) {
    var pop = gloss.querySelector(".gloss__pop");
    pop.style.left = "0px";
    var margin = 12;
    var viewport = document.documentElement.clientWidth;
    var box = pop.getBoundingClientRect();
    if (!box.width) return;
    var shift = 0;
    if (box.right > viewport - margin) {
      shift = viewport - margin - box.right;
    }
    if (box.left + shift < margin) {
      shift = margin - box.left;
    }
    pop.style.left = shift + "px";
  }

  function closeAll(except) {
    glosses.forEach(function (g) {
      if (g === except) return;
      g.classList.remove("is-open");
      g.querySelector(".gloss__trigger").setAttribute("aria-expanded", "false");
    });
  }

  glosses.forEach(function (gloss) {
    var trigger = gloss.querySelector(".gloss__trigger");

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = !gloss.classList.contains("is-open");
      closeAll(gloss);
      gloss.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));
      if (open) place(gloss);
    });

    gloss.addEventListener("mouseenter", function () { place(gloss); });
    trigger.addEventListener("focus", function () { place(gloss); });
  });

  if (glosses.length) {
    document.addEventListener("click", function () { closeAll(null); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll(null);
    });
    window.addEventListener("resize", function () { closeAll(null); });
  }

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
