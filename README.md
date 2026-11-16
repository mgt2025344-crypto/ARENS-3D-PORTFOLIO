# ARENS 3D - 3D Artist Portfolio

A responsive three-page portfolio website for **Aren Silva**, a fictional 3D Artist & Model Designer. University group assignment (8 first-year students). All content is sample data.

## Objectives
- Build a multi-page website with HTML, CSS and Vanilla JavaScript only.
- Create a responsive, accessible, professional design.
- Render content dynamically with JavaScript.
- Practice teamwork and documentation.

## Technologies
HTML5, CSS3 (Flexbox, Grid, variables, keyframes), Vanilla JavaScript. No frameworks or libraries. Font: Poppins (Google Fonts, falls back to Arial offline).

## Features
- Home, Portfolio and Contact pages with shared header and footer
- Mobile hamburger menu, dark/light mode saved in localStorage
- Staggered hero animation, floating portrait, scroll reveal
- About counters (0 to 3+, 50+, 30+) that run once with IntersectionObserver
- Skills with progress bars and a Services section
- Featured projects and gallery rendered from a JavaScript array
- Category filters and a project modal (close button, outside click, Escape)
- Contact form with validation and a success message (front-end demo only)
- Reduced-motion support and automatic footer year

Projects are stored in a JavaScript array inside `portfolio.js` and drawn on the page with DOM methods.

## Folder Structure
```
ARENS-3D-PORTFOLIO/
├── index.html
├── portfolio.html
├── contact.html
├── style.css
├── main.js
├── portfolio.js
├── contact.js
├── README.md
├── PRESENTATION_GUIDE.md
├── hero-portrait.png
├── about-workspace.jpg
├── project-character.jpg
├── project-headphones.jpg
├── project-architecture.jpg   (placeholder crop, replace it)
├── project-environment.jpg
├── project-motorcycle.jpg
└── project-perfume.jpg

## Run with VS Code Live Server
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

## Replace Images
Save your new image in `assets/` with the **same file name** (for example `project-architecture.jpg`). Use 4:3 images for projects.

## Add a New Project
Open `portfolio.js` and add an object to the `projects` array:
```js
{
  id: 7,
  title: "My New Model",
  category: "Character Design",
  description: "Short description.",
  image: "assets/my-image.jpg",
  tools: ["Blender"],
  year: "2026"
}
```
Use one of the existing categories so the filters work. The first three projects appear on the Home page.

## Publish with GitHub Pages
1. Create a GitHub repository and upload all files.
2. Go to **Settings > Pages**.
3. Choose the `main` branch and the `/ (root)` folder, then save.
4. Open the link GitHub shows after a minute.

## Group Roles
| Role | Member | Responsibility |
|---|---|---|
| Project Manager | Member 1 | Plan tasks, set deadlines, merge the work |
| HTML Lead | Member 2 | Write semantic HTML for all pages |
| CSS Layout Designer | Member 3 | Grid, Flexbox, responsive layout |
| CSS Styling Designer | Member 4 | Colors, typography, animations, dark mode |
| JavaScript Functionality Developer | Member 5 | Menu, theme, counters, filters, modal |
| JavaScript Validation Developer | Member 6 | Contact form validation and messages |
| Content Manager | Member 7 | Text, images, project descriptions |
| Testing & Documentation Lead | Member 8 | Test features, write README and guide |
