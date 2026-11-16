// Mark page as JavaScript-enabled
document.documentElement.classList.add("js");

// Check reduced motion setting
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Mobile navigation =====
const menuButton = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

// Open or close the mobile menu
function setMenu(isOpen) {
  mainNav.classList.toggle("open", isOpen);
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", function () {
  setMenu(!mainNav.classList.contains("open"));
});

// Close the menu when a link is selected
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

// ===== Dark / Light mode =====
const themeButton = document.getElementById("theme-toggle");

// Apply a theme and update the button label
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

// Load saved theme
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (error) {
  savedTheme = "light";
}
applyTheme(savedTheme);

themeButton.addEventListener("click", function () {
  const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch (error) {
    // Storage not available
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Scroll reveal =====
const revealItems = document.querySelectorAll(".reveal");

// Show an item
function showItem(item) {
  item.classList.add("visible");
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(showItem);
} else {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        showItem(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}

// ===== About number counters =====
const aboutSection = document.getElementById("about");
const counters = document.querySelectorAll(".count");

// Count one number from 0 up to its target
function countUp(counter) {
  const target = Number(counter.dataset.target);
  const steps = 50;
  const increase = target / steps;
  let current = 0;
  counter.textContent = 0;

  const timer = setInterval(function () {
    current = current + increase;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, 40);
}

// Start all counters
function startCounters() {
  counters.forEach(countUp);
}

if (aboutSection && counters.length > 0 && !reduceMotion && "IntersectionObserver" in window) {
  // Start from zero until the section is visible
  counters.forEach(function (counter) {
    counter.textContent = 0;
  });

  const counterObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      startCounters();
      counterObserver.disconnect(); // Run only once
    }
  }, { threshold: 0.4 });
  counterObserver.observe(aboutSection);
}
