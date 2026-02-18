Architecture Choice: Drop Tailwind for CSS Variables + Vanilla CSS (or CSS Modules if using React)
Instead of Tailwind, this project uses:

CSS custom properties (variables) for the design token system
Vanilla CSS with a single stylesheet (or CSS Modules per component in React)
No utility framework — every style is intentional and named

Design tokens (put these in :root or a tokens.css file)
css:root {
  --bg: #0d0f14;
  --surface: #13161d;
  --border: #1f2330;
  --text: #e8eaf0;
  --muted: #6b7280;
  --accent: #c084fc;       /* purple — primary brand */
  --accent2: #34d399;      /* green — skills/tags */
  --accent3: #f472b6;      /* pink — featured/special */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}
Always use these variables. Never hardcode colors or fonts directly.

Navigation Rules (fix the broken nav)
The nav MUST handle both mobile and desktop cleanly.
css/* Desktop: always show links */
.nav-links { display: flex; }

/* Mobile: hide links, show hamburger */
@media (max-width: 680px) {
  .nav-links { display: none; }
  .nav-toggle { display: flex; }

  /* When open (JS adds .open class) */
  .nav-links.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px; left: 0; right: 0;
    /* ... full-screen dropdown */
  }
}
Copilot Rule: When adding nav items, ALWAYS check both desktop and mobile states. Never use display: none on .nav-links at desktop widths.

Page Sections Checklist
Every section must have:

 A section-label (small caps category name, e.g. "About")
 A section-title (the headline)
 A section-sub (a 1–2 sentence description)
 Actual content (grid, cards, list — not empty)
 A scroll reveal animation (add class reveal + IntersectionObserver)

If a section has a label but no content, it is not done. Don't leave empty sections.

Component Patterns
Project Cards
html<a href="#" class="project-card">
  <div class="project-icon">🎮</div>
  <div class="project-meta">
    <span class="project-tag">React</span>
  </div>
  <h3 class="project-title">Project Name</h3>
  <p class="project-desc">Short description here.</p>
  <span class="project-arrow">View Project →</span>
</a>
Always use <a> not <div> for cards that link somewhere.
Skill Items
html<div class="skill-item">
  <span class="skill-name">UI/UX Design</span>
  <span class="skill-badge">Figma · Prototyping</span>
</div>
Tags / Badges
html<span class="tag"><span class="dot"></span> Tag text</span>

Scroll Reveal Animation
Add this JS to the bottom of every page:
javascriptconst observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
CSS:
css.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
Add class reveal to any element you want to animate in on scroll.

Responsive Layout Rules
BreakpointBehavior> 1100pxMax-width container, centered680px–1100pxMost grids go to 1–2 columns< 680pxSingle column, hamburger nav, full-width cards
Use clamp() for fluid font sizes:
cssfont-size: clamp(3.5rem, 10vw, 8rem); /* hero heading */
font-size: clamp(2rem, 4vw, 3rem);    /* section titles */

Things Copilot Must Never Do

Never use Tailwind unless explicitly asked to add it back
Never hardcode colors — use var(--accent) etc.
Never leave a section with only a heading and no content
Never use <div> for links — use <a>
Never add a nav item without testing mobile breakpoint
Never use Arial, Roboto, or Inter — use Syne + DM Sans (or update the token)
Never add a new section without the 4-part structure (label, title, sub, content)


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