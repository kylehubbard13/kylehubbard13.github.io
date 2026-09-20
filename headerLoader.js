document.addEventListener("DOMContentLoaded", () => {
  fetch("/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then((markup) => {
      document.getElementById("site-header").innerHTML = markup;
      initNav();
    })
    .catch((err) => console.error("Error loading header:", err));
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("show");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  const currentPath = window.location.pathname.replace(/\/$/, "/index.html");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
    link.addEventListener("click", () => {
      links.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
