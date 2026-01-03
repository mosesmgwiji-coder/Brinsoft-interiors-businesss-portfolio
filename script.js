document.addEventListener("DOMContentLoaded", () => {
  enableSmoothScrolling();
  enableActiveNav();
  setHeroBackground();
  setHeaderLogo();
  enableSearch();
});

/* =====================
   HERO BACKGROUND
===================== */
function setHeroBackground() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  hero.style.backgroundImage = 'url("img/background.jpg")';
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center top";
  hero.style.backgroundRepeat = "no-repeat";
}

/* =====================
   HEADER LOGO + BACKGROUND
===================== */
function setHeaderLogo() {
  const header = document.querySelector('.header');
  if (header) {
    header.style.backgroundImage = 'url("img/logo.png")';
    header.style.backgroundRepeat = 'no-repeat';
    header.style.backgroundPosition = '30px center';
    header.style.backgroundSize = '250px';
  }

  const logoImg = document.querySelector('.header-logo');
  if (logoImg) {
    logoImg.style.width = '10px';
    logoImg.style.height = '10px';
  }
}

/* =====================
   SMOOTH SCROLLING
===================== */
function enableSmoothScrolling() {
  const links = document.querySelectorAll('nav a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* =====================
   ACTIVE NAV ON SCROLL
===================== */
function enableActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

/* =====================
   DARK MODE
===================== */
const darkToggle = document.querySelector(".dark-toggle");

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

/* =====================
   MOBILE MENU (improved accessibility)
===================== */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  // set ARIA defaults
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'site-navigation');
  nav.setAttribute('id', 'site-navigation');

  menuToggle.addEventListener("click", (e) => {
    const isOpen = nav.classList.toggle("active");
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // close menu with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  // Close when clicking outside the nav on small screens
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
/* =====================
   SEARCH FUNCTIONALITY
===================== */
function enableSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  if (!searchInput || !searchBtn) return;

  // Single click handler: if input empty focus it, otherwise perform search
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (!query) {
      searchInput.focus();
      searchBtn.classList.add("active");
      searchBtn.setAttribute("aria-pressed", "true");
      return;
    }

    // Execute search: redirect to search results page with query
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  });

  // Toggle active state based on input content
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
      searchBtn.classList.add("active");
      searchBtn.setAttribute("aria-pressed", "true");
    } else {
      searchBtn.classList.remove("active");
      searchBtn.setAttribute("aria-pressed", "false");
    }
  });

  // Remove active on blur if empty
  searchInput.addEventListener("blur", () => {
    if (searchInput.value.trim() === "") {
      searchBtn.classList.remove("active");
      searchBtn.setAttribute("aria-pressed", "false");
    }
  });

  // Allow Enter to submit search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });
}