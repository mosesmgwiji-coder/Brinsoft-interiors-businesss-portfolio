document.addEventListener("DOMContentLoaded", () => {
  enableSmoothScrolling();
  enableActiveNav();
  setHeroBackground();
  setHeaderLogo();
  enableSearch();
  initContactForm();
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

/* =====================
   CONTACT FORM HANDLING
===================== */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleContactFormSubmit);

  // Add real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("blur", validateField);
  });
}

function validateField(e) {
  const field = e.target;
  const errorElement = document.getElementById(field.id + "Error");
  let isValid = true;
  let errorMessage = "";

  if (field.name === "name") {
    if (field.value.trim().length < 2) {
      isValid = false;
      errorMessage = "Please enter a valid name";
    }
  } else if (field.name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  } else if (field.name === "phone") {
    if (field.value && !/^[\d\s\-\+\(\)]+$/.test(field.value)) {
      isValid = false;
      errorMessage = "Please enter a valid phone number";
    }
  } else if (field.name === "subject") {
    if (field.value.trim().length < 3) {
      isValid = false;
      errorMessage = "Subject must be at least 3 characters";
    }
  } else if (field.name === "message") {
    if (field.value.trim().length < 10) {
      isValid = false;
      errorMessage = "Message must be at least 10 characters";
    }
  }

  if (errorElement) {
    if (!isValid) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
      field.classList.add("error");
    } else {
      errorElement.classList.remove("show");
      field.classList.remove("error");
    }
  }

  return isValid;
}

function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formMessage = document.getElementById("formMessage");
  const submitBtn = form.querySelector(".submit-btn");

  // Validate all fields
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isFormValid = true;

  inputs.forEach(input => {
    if (!validateField({ target: input })) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    showFormMessage("Please fix the errors above", "error");
    return;
  }

  // Collect form data
  const formData = {
    name: form.querySelector("#name").value,
    email: form.querySelector("#email").value,
    phone: form.querySelector("#phone").value,
    subject: form.querySelector("#subject").value,
    message: form.querySelector("#message").value,
    subscribe: form.querySelector("#subscribe").checked,
    timestamp: new Date().toISOString()
  };

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Simulate form submission (in production, this would be sent to a server)
  setTimeout(() => {
    // Store in localStorage for demonstration
    const submissions = JSON.parse(localStorage.getItem("contactFormSubmissions") || "[]");
    submissions.push(formData);
    localStorage.setItem("contactFormSubmissions", JSON.stringify(submissions));

    // Show success message
    showFormMessage("Thank you! Your message has been sent successfully. We'll get back to you soon!", "success");

    // Reset form
    form.reset();

    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    // Clear error messages
    form.querySelectorAll(".error-message").forEach(msg => msg.classList.remove("show"));
    form.querySelectorAll("input, textarea").forEach(field => field.classList.remove("error"));

    // Clear success message after 5 seconds
    setTimeout(() => {
      showFormMessage("", "");
    }, 5000);
  }, 1500);
}

function showFormMessage(message, type) {
  const messageElement = document.getElementById("formMessage");
  if (!messageElement) return;

  messageElement.textContent = message;
  messageElement.className = "form-message";

  if (type) {
    messageElement.classList.add(type);
  }
}