// ===== Projects array =====
const projects = [
  {
    id: 1,
    title: "Armored Sentinel",
    category: "Character Design",
    description: "A heavily armored sci-fi soldier with detailed plates, worn cloth and glowing red details.",
    image: "./project-character.jpg",
    tools: ["Blender", "ZBrush", "Substance 3D Painter"],
    year: "2026"
  },
  {
    id: 2,
    title: "Crimson Pulse Headphones",
    category: "Product Modeling",
    description: "Premium over-ear headphones with leather cushions, carbon fiber panels and red light accents.",
    image: "./project-headphones.jpg",
    tools: ["Cinema 4D", "Substance 3D Painter"],
    year: "2026"
  },
  {
    id: 3,
    title: "Fallen Tower District",
    category: "Architecture",
    description: "A study of abandoned high-rise buildings with broken glass, concrete and moody lighting. Sample image: replace with your own architecture render.",
    image: "./project-architecture.jpg",
    tools: ["Blender", "Unreal Engine"],
    year: "2025"
  },
  {
    id: 4,
    title: "Ruined Megacity",
    category: "Environment Design",
    description: "A foggy futuristic city overgrown with moss, with broken bridges and red warning lights.",
    image: "./project-environment.jpg",
    tools: ["Blender", "Unreal Engine"],
    year: "2025"
  },
  {
    id: 5,
    title: "Phantom Electric Bike",
    category: "Vehicle Modeling",
    description: "A concept electric motorcycle with carbon fiber body panels and glowing red underlights.",
    image: "./project-motorcycle.jpg",
    tools: ["Autodesk Maya", "Cinema 4D"],
    year: "2025"
  },
  {
    id: 6,
    title: "Ruby Crest Perfume",
    category: "Product Modeling",
    description: "A luxury perfume bottle with glass facets, amber liquid and a ruby-style cap.",
    image: "./project-perfume.jpg",
    tools: ["Blender", "Cinema 4D"],
    year: "2024"
  }
];

// Page elements (some only exist on one page)
const featuredBox = document.getElementById("featured-projects");
const galleryBox = document.getElementById("gallery");
const filterBox = document.querySelector(".filters");
const resultCount = document.getElementById("result-count");
const modal = document.getElementById("modal");
let lastFocused = null;

// ===== Create one project card =====
function createCard(project, isHomePage) {
  const card = document.createElement("article");
  card.className = "project-card";

  const imageBox = document.createElement("div");
  imageBox.className = "card-image";
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.title + " - " + project.category;
  image.loading = "lazy";
  imageBox.appendChild(image);

  const body = document.createElement("div");
  body.className = "card-body";

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = project.category;

  const title = document.createElement("h3");
  title.textContent = project.title;

  body.appendChild(category);
  body.appendChild(title);

  if (isHomePage) {
    // Home page: link to the portfolio page
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "portfolio.html?project=" + project.id;
    link.textContent = "View Project \u2192";
    body.appendChild(link);
  } else {
    // Portfolio page: open the modal
    const button = document.createElement("button");
    button.className = "card-link";
    button.type = "button";
    button.textContent = "View Project \u2192";
    button.addEventListener("click", function () {
      openModal(project.id);
    });
    body.appendChild(button);
    card.classList.add("clickable");
    card.addEventListener("click", function (event) {
      if (event.target !== button) {
        openModal(project.id, button);
      }
    });
  }

  card.appendChild(imageBox);
  card.appendChild(body);
  return card;
}

// ===== Home page: featured projects =====
function renderFeatured() {
  const featured = projects.slice(0, 3);
  featured.forEach(function (project) {
    featuredBox.appendChild(createCard(project, true));
  });
}

// ===== Portfolio page: gallery =====
function renderGallery(category) {
  galleryBox.innerHTML = "";

  const shown = projects.filter(function (project) {
    return category === "All Projects" || project.category === category;
  });

  shown.forEach(function (project) {
    galleryBox.appendChild(createCard(project, false));
  });

  if (shown.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No projects in this category yet.";
    galleryBox.appendChild(message);
  }
  resultCount.textContent = "Showing " + shown.length + " project(s)";
}

// ===== Category filters =====
function setupFilters() {
  const buttons = filterBox.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (other) {
        other.classList.remove("active");
        other.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      renderGallery(button.dataset.category);
    });
  });
}

// ===== Modal =====
function openModal(id, returnButton) {
  const project = projects.find(function (item) {
    return item.id === Number(id);
  });
  if (!project) {
    return;
  }
  lastFocused = returnButton || document.activeElement;

  document.getElementById("modal-image").src = project.image;
  document.getElementById("modal-image").alt = project.title;
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-category").textContent = project.category;
  document.getElementById("modal-description").textContent = project.description;
  document.getElementById("modal-tools").textContent = project.tools.join(", ");
  document.getElementById("modal-year").textContent = project.year;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocused) {
    lastFocused.focus();
  }
}

function setupModal() {
  document.getElementById("modal-close").addEventListener("click", closeModal);

  // Click outside the modal box
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

// ===== Start =====
if (featuredBox) {
  renderFeatured();
}

if (galleryBox) {
  renderGallery("All Projects");
  setupFilters();
  setupModal();

  // Open a project from the home page link
  const projectId = new URLSearchParams(window.location.search).get("project");
  if (projectId) {
    openModal(projectId);
  }
}
