document.addEventListener("DOMContentLoaded", () => {
  // 🔷 Highlight active link
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (menuIcon && closeIcon) {
        menuIcon.style.display = "inline";
        closeIcon.style.display = "none";
      }
    });
  });

  // 🔷 Mobile Nav Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
      if (menuIcon && closeIcon) {
        menuIcon.style.display = isOpen ? "none" : "inline";
        closeIcon.style.display = isOpen ? "inline" : "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        if (menuIcon && closeIcon) {
          menuIcon.style.display = "inline";
          closeIcon.style.display = "none";
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        if (menuIcon && closeIcon) {
          menuIcon.style.display = "inline";
          closeIcon.style.display = "none";
        }
      }
    });
  }

  // 🌗 Theme Toggle Setup
  const toggleBtn = document.getElementById("themeToggle");
  const desktopLabel = toggleBtn?.querySelector(".desktop-label");
  const mobileLabel = toggleBtn?.querySelector(".mobile-label");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = savedTheme || (prefersLight ? "light" : "dark");

  root.setAttribute("data-theme", initial);
  updateLabel(initial);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";

      root.style.transition = "background-color 0.5s ease, color 0.5s ease";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateLabel(next);
    });
  }

  function updateLabel(theme) {
    if (desktopLabel) {
      desktopLabel.textContent = theme === "dark" ? "🌞 Light" : "🌜 Dark";
    }
    if (mobileLabel) {
      mobileLabel.textContent = theme === "dark" ? "🌤️" : "🌘";
    }
  }
});

