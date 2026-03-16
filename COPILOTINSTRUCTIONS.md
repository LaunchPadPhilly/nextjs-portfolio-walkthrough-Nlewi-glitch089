This repository uses Tailwind CSS for utility-first styling and also includes a small token CSS file for any global CSS custom-properties used alongside Tailwind.

Guiding rules for contributors and Copilot:

- Prefer Tailwind utility classes for layout and spacing. The project already includes Tailwind in dependencies and a `tailwind.config.js` file.
- Use `tokens.css` for cross-cutting design tokens (colors, radii) that are referenced from global styles or components when a named variable is clearer than a long utility class.
- Keep styles consistent: prefer `className` + Tailwind utilities in JSX, and extract repetitive combinations into component classes or Tailwind plugin utilities.

Navigation

The nav must work across breakpoints. Use Tailwind responsive utilities (e.g., `hidden md:flex` for links, and `md:hidden` for mobile toggles). When adding nav items, test both mobile and desktop layouts.

Page Sections Checklist

Every major section should include:

- a short label (category)
- a clear title
- a 1–2 sentence description
- substantive content (cards, lists, examples)

Optionally add a reveal animation (the repo includes a simple `reveal` pattern). Do not leave empty sections with only a heading.

Component Patterns

Project cards should be accessible links when they navigate. Prefer semantic markup:

```jsx
<a href="/projects/foo" className="project-card">...</a>
```

Use Tailwind classes for layout and spacing and keep components small and focused.
Skill Items
html<div class="skill-item">
  <span class="skill-name">UI/UX Design</span>
  <span class="skill-badge">Figma · Prototyping</span>
</div>
Tags / Badges
html<span class="tag"><span class="dot"></span> Tag text</span>

Scroll reveal

The repo contains a simple `reveal` pattern used on several components. You can use the existing utility `reveal` + IntersectionObserver implementation included in `app/components/ScrollReveal.js`.

Responsive layout

Use Tailwind responsive utilities to adapt the layout at `sm`, `md`, `lg`, `xl` breakpoints. Prefer container/capped widths for wide screens and single-column stacks for small screens.

Rules for Copilot / Contributors

- Prefer Tailwind utilities and the project's token variables for consistent styling.
- Avoid leaving empty sections or placeholder headings.
- Use semantic HTML (use `<a>` for links, headings for titles).
- Test navigation and layout at mobile and desktop breakpoints.

File layout (Next.js)
```
/app
  /components
  /about
  /projects
  /contact
  layout.js
  page.js
```

When adding components, keep them focused and test with `npm run dev` and the test suite (`npm test`).


File Structure (if converting to React/Next.js)
/src
  /components
    Nav.tsx           ← handles both mobile/desktop nav
    HeroSection.tsx
    AboutSection.tsx
    ProjectsSection.tsx
    ProjectCard.tsx
    ContactSection.tsx
    Footer.tsx
  /styles
    tokens.css        ← all CSS variables
    global.css        ← reset + body styles
    Nav.module.css    ← nav-specific styles
    HeroSection.module.css
    ...
  /pages
    index.tsx         ← assembles sections
    projects.tsx
    about.tsx
Import tokens.css in _app.tsx (Next.js) or your root layout so all variables are globally available.

Adding a New Project

Copy the project card HTML/JSX pattern above
Give it an icon (emoji or SVG), tags, title, and description
Add class reveal to the card
If it's featured: add class featured and use the featured card layout (icon left, content right)
Update the projects grid — it uses auto-fill, minmax(320px, 1fr) so new cards flow in automatically


How to Update Colors / Rebrand
Only touch the :root block in tokens.css. Change the variable values there and everything updates across the whole site automatically.
css/* Example: switch to a teal accent */
:root {
  --accent: #2dd4bf;
  --accent2: #f59e0b;
  --accent3: #818cf8;
}