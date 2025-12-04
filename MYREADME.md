Personal Portfolio — Next.js

A futuristic/neon themed portfolio created using Next.js App Router and plain CSS (no Tailwind).

## Pages Required

Home (app/page.js)

About (app/about/page.js)

Projects (app/projects/page.js)

Contact (app/contact/page.js)

## 📂 Project Structure
app/
├─ components/
│  ├─ Navbar.js
│  └─ Footer.js
├─ about/
│  └─ page.js
├─ projects/
│  └─ page.js
├─ contact/
│  └─ page.js
├─ globals.css
├─ layout.js
└─ page.js


layout.jsx — shared layout, loads Navbar, Footer & global CSS

page.jsx — homepage

globals.css — full-site styling

Supports both .js and .jsx files.

## 🚀 Getting Started

Install dependencies:

npm install


Run development server:

npm run dev


The site will be available at:

http://localhost:3000

## 🎨 Style Guidance

Theme: dark, cosmic, futuristic
Colors: neon accents (cyan, magenta, purple recommended)
Design Principles:

Smooth transitions

Minimal but polished visuals

Fully responsive layouts

All styling should be handled in globals.css or modular component CSS files.

🔧 Recommended Enhancements (Optional)

Add animations using CSS keyframes

Include project cards with hover glowing effects

Add a hero banner on the home page