# 🎨 Week 1: Next.js Portfolio Project

## 📚 Learning Objectives

By completing this project, you will demonstrate:

- **TS.2.3.1** - Structure HTML content using React components
- **TS.2.3.2** - Style with CSS using Tailwind utility classes
- **TS.1.2.1** - Write sequential statements in JavaScript/JSX

## 🎯 Project Goal

Build a personal portfolio website with **4 pages** that showcases who you are as a developer.

Your portfolio will include:
- 🏠 **Home** - Your introduction and navigation
- 👤 **About** - Your bio and skills
- 💼 **Projects** - Showcase of your work
- 📧 **Contact** - How to reach you

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js** (v20 or higher)
- **Git**
- **Docker** (recommended for running the full stack locally)

### Installation & local development

1. Clone the repository:

```bash
git clone <your-repository-url>
cd <repo-folder>
```

2. Install Node dependencies:

```bash
npm ci
```

3. Start the development server (fast, local-only):

```bash
npm run dev
```

Then open http://localhost:3000

### Run the full stack with Docker (recommended)

This project includes a `docker-compose.yml` that starts a Postgres DB and the Next.js app. It also reads secret files from `./secrets/` when present.

```bash
# prepare ./secrets/database_url.txt (see SECRETS.md for details)
docker compose up --build
```

The app will be available on port 3000 and the compose setup runs smoke checks and (optionally) migrations in CI.

## ✅ Requirements

### Must Have (Required for Passing)

- [ ] **4 working pages** (Home, About, Projects, Contact)
- [ ] **Navigation component** in layout that appears on all pages
- [ ] **Footer component** in layout that appears on all pages
- [ ] **Profile image** on About page using next/image
- [ ] **3 project cards** on Projects page (placeholders OK)
- [ ] **Contact information** on Contact page
- [ ] **Tailwind CSS styling** throughout
- [ ] **Responsive design** that works on mobile, tablet, and desktop
- [ ] **Working navigation** with Link components (no `<a>` tags)
- [ ] **Deployed to Vercel** with live URL

### Should Have (For Full Credit)

- [ ] Custom color scheme (not default blue/gray)
- [ ] Smooth hover effects on navigation and buttons
- [ ] Professional typography (good font sizes and spacing)
- [ ] All images have descriptive `alt` text
- [ ] No console errors in browser
- [ ] Meaningful Git commits (not just "update")

### Could Have (Extra Credit)

- [ ] Custom favicon
- [ ] Animated elements (with Tailwind transitions)
- [ ] Additional pages (Blog, Resume, etc.)
- [ ] Social media icons with links
- [ ] Dark mode toggle

## 📁 Project Structure

```
week1-portfolio-starter/
├── app/
│   ├── components/          # Your reusable components
│   │   ├── Navbar.js        # TODO: Create navigation component
│   │   └── Footer.js        # TODO: Create footer component
│   ├── about/
│   │   └── page.js          # TODO: Build About page
│   ├── projects/
│   │   └── page.js          # TODO: Build Projects page
│   ├── contact/
│   │   └── page.js          # TODO: Build Contact page
│   ├── layout.js            # Root layout (add Navbar/Footer here)
│   ├── page.js              # Homepage (customize this)
│   └── globals.css          # Global styles (already set up)
├── public/                  # Put your images here
│   └── .gitkeep
├── tests/
│   └── portfolio.test.js    # Automated tests (don't modify)
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md                # You're reading this!
```

For a high-level architecture diagram and explanation, see `ARCHITECTURE.md` (includes a visual sketch at `screenshots/architecture-sketch.png`).

Deployment docs: see `docs/SSH.md` for SSH-based deployment instructions and `docs/EC2.md` for EC2 smoke-check guidance.

## 🎨 Design Guidelines

### Color Palette Ideas

Choose one and customize:

**Professional Blue:**
- Primary: `bg-blue-600`
- Secondary: `bg-blue-100`
- Accent: `bg-blue-400`
- Text: `text-gray-900`

**Creative Purple:**
- Primary: `bg-purple-600`
- Secondary: `bg-purple-100`
- Accent: `bg-pink-400`
- Text: `text-gray-900`

**Modern Green:**
- Primary: `bg-green-600`
- Secondary: `bg-green-100`
- Accent: `bg-teal-400`
- Text: `text-gray-900`

### Typography Scale

- **Hero Heading:** `text-6xl` or `text-7xl`
- **Page Titles:** `text-4xl` or `text-5xl`
- **Section Headings:** `text-2xl` or `text-3xl`
- **Body Text:** `text-base` or `text-lg`
- **Small Text:** `text-sm`

## 🧪 Testing Your Work

Run the automated tests locally with Vitest:

```bash
npm test
```

What the tests check (high level):
- Page files and layout
- Use of `next/link` and `next/image` where required
- Basic content and structure expected by the course tests

CI: GitHub Actions runs the same smoke/tests on push. See `.github/workflows/ci.yml`.

## 🚢 Deployment & CI

### Push to GitHub

Commit and push your changes as normal. The repository contains a GitHub Actions workflow (see `.github/workflows/ci.yml`) that runs smoke tests and optional Docker-based checks on `main` and `develop`.

```bash
git add .
git commit -m "Describe changes"
git push
```

### Deploy to Vercel (optional)

1. Go to vercel.com and import the GitHub repository
2. Configure environment variables (e.g., `DATABASE_URL`, `NEXTAUTH_SECRET`) if you intend to connect a production DB
3. Deploy and wait for the build to complete

### Notes about CI and secrets

- CI uses repository secrets or `POSTGRES_*` variables to run database-backed smoke tests. See `.github/workflows/ci.yml` for details.
- For local Docker runs, the repository includes helper files under `./secrets/` (not committed in production). See `SECRETS.md`.

### Submit Your Work

- Provide your GitHub repo URL and (if applicable) deployed site URL
- Include any required screenshots requested by your instructor

## 📖 Resources

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Image Component](https://nextjs.org/docs/api-reference/next/image)
- [Link Component](https://nextjs.org/docs/api-reference/next/link)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### Getting Unstuck
- Check the browser console for errors (F12)
- Read error messages carefully
- Google the exact error message
- Ask a classmate
- Ask your instructor
- Check the example solution (available after due date)

## 🏆 Grading Rubric

| Category | Points | What We're Looking For |
|----------|--------|------------------------|
| **Technical Implementation** | 50 | All routes work, components in layout, proper use of Link/Image |
| **Content & Design** | 30 | Complete content, professional design, responsive |
| **Code Quality** | 10 | Clean code, organized files, no errors |
| **Deployment** | 10 | Pushed to GitHub, deployed to Vercel |
| **TOTAL** | 100 | |

## 💡 Tips for Success

1. **Start simple** - Get the basic structure working first, then make it pretty
2. **Test often** - Check your work in the browser after every change
3. **Use the DevTools** - F12 is your friend! Check for errors
4. **Commit frequently** - Save your progress with Git every 30 minutes
5. **Mobile first** - Test on mobile view from the start
6. **Ask questions** - Don't struggle alone for more than 15 minutes

## 🆘 Common Issues & Solutions

### Port 3000 already in use
```bash
# Kill the process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID [the-pid-number] /F
```

### Images not loading
- Make sure images are in the `public/` folder
- Use `/image.jpg` not `public/image.jpg` in src
- Check file names match exactly (case-sensitive!)

### Styles not applying
- Make sure className is in quotes: `className="text-xl"`
- Check for typos in Tailwind class names
- Restart dev server if styles seem cached

### Git push rejected
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

## 🎓 What You'll Learn

By completing this project, you'll gain practical experience with:

- ✨ Building multi-page websites with Next.js
- 🎨 Styling with Tailwind CSS utility classes
- 🧩 Creating reusable React components
- 🖼️ Optimizing images with next/image
- 🔗 Client-side navigation with Link component
- 📱 Responsive web design principles
- 🌐 Deploying web applications to production
- 📚 Using Git for version control

## 📅 Timeline Recommendation

- **Day 1-2:** Set up project, create all 4 pages, basic navigation
- **Day 3:** Create Navbar and Footer components, add to layout
- **Day 4:** Style all pages with Tailwind, add images
- **Day 5:** Test responsiveness, deploy to Vercel, polish

## 🎉 When You're Done

1. Pat yourself on the back! You just built a real website! 🎊
2. Share your portfolio URL with family and friends
3. Add it to your LinkedIn profile
4. Use it to showcase future projects
5. Keep improving it throughout the course

---

**Questions?** Ask in the class Slack channel or come to office hours!

**Ready to start?** Run `npm run dev` and start building! 🚀
