import Image from 'next/image'

export default function About() {
  const skillGroups = [
    {
      title: 'Front-End Development',
      items: [
        'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js (App Router + SSR)', 'Component Architecture', 'State Management (Context API)', 'Responsive Web Design', 'Accessibility (WCAG basics)', 'Performance Optimization', 'API Integration (REST)', 'Real-time Interfaces (WebSockets basics)'
      ]
    },
    {
      title: 'UI Engineering',
      items: [
        'CSS3', 'Flexbox + Grid', 'Modern UI Styling Techniques', 'Tailwind CSS', 'Styled Components', 'Design Systems', 'Micro-interactions', 'Animation (CSS + Framer Motion)', 'Interaction States (hover, focus, loading, empty)', 'Dark Mode Theming'
      ]
    },
    {
      title: 'UX + Product Thinking',
      items: [
        'UX Research', 'Interaction Planning', 'Wireframing', 'User Flows', 'Information Architecture', 'Usability Testing', 'Feature Scoping', 'MVP Planning', 'Feedback Iteration Cycles', 'Human-Centered Design'
      ]
    },
    {
      title: 'Design Tools',
      items: [
        'Figma (Wireframes + High-Fidelity Layouts)', 'Prototyping in Figma', 'Component Libraries', 'Design Tokens', 'Developer Handoff', 'Rapid Interface Mockups'
      ]
    },
    {
      title: 'Backend + Infrastructure',
      items: [
        'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'REST API Design', 'Authentication (JWT basics)', 'Environment Configuration'
      ]
    },
    {
      title: 'Collaboration + Workflow',
      items: [
        'Git + GitHub', 'Branching Strategies', 'Code Reviews', 'Agile / Iterative Development', 'Technical Documentation', 'Debugging + Root Cause Analysis'
      ]
    }
  ]

  const tooltipMap = {
    'javascript-es6': 'Modern JavaScript patterns and syntax (ES6+).',
    typescript: 'Typed JavaScript for safer, scalable code.',
    react: 'Component-driven UI with hooks and context.',
    'next-js-(app-router-+-ssr)': 'Next.js App Router patterns and server rendering.',
    'component-architecture': 'Designing reusable, testable UI components.',
    'state-management-(context-api)': 'Lightweight global state using Context API.',
    'responsive-web-design': 'Layouts that adapt to any screen size.',
    'accessibility-(wcag-basics)': 'Accessible patterns and semantic markup.',
    'performance-optimization': 'Optimizing runtime and bundle size.',
    'api-integration-(rest)': 'Connecting UIs to RESTful services.',
    'real-time-interfaces-(websockets-basics)': 'Realtime updates with WebSockets.',
    css3: 'Modern CSS features and layout techniques.',
    'flexbox-+-grid': 'Powerful layout primitives for responsive UIs.',
    'modern-ui-styling-techniques': 'Design tokens, layered gradients, and glassmorphism.',
    'tailwind-css': 'Utility-first styling for rapid UI development.',
    'styled-components': 'Component-scoped styles with JS.',
    'design-systems': 'Reusable tokens, components, and docs.',
    'micro-interactions': 'Small animations that guide users.',
    'animation-(css-+-framer-motion)': 'CSS and Framer Motion for expressive motion.',
    'interaction-states-(hover,-focus,-loading,-empty)': 'Thoughtful states for clarity and feedback.',
    'dark-mode-theming': 'Theme-aware UI and color contrast.',
    'ux-research': 'User interviews, surveys and insights.',
    'interaction-planning': 'Mapping user flows and edge cases.',
    wireframing: 'Low-fi and hi-fi visual planning.',
    'user-flows': 'Step-by-step task flows for users.',
    'information-architecture': 'Organizing content for findability.',
    'usability-testing': 'Validating designs with real users.',
    'feature-scoping': 'Defining MVP and iteration scope.',
    'mvp-planning': 'Prioritizing features for early value.',
    'feedback-iteration-cycles': 'Fast cycles of build → test → learn.',
    'human-centered-design': 'Design driven by human needs and context.',
    'figma-(wireframes-+-high-fidelity-layouts)': 'Design and prototype in Figma.',
    'prototyping-in-figma': 'Interactive prototypes for testing flows.',
    'component-libraries': 'Reusable UI collections and doc sites.',
    'design-tokens': 'Single-source-of-truth for colors and spacing.',
    'developer-handoff': 'Clear specs and assets for engineers.',
    'rapid-interface-mockups': 'Quickly visualize new ideas.',
    'node-js': 'Server-side JavaScript runtime.',
    express: 'Lightweight web servers and APIs.',
    postgresql: 'Relational databases for structured data.',
    mongodb: 'Flexible document storage for rapid iteration.',
    docker: 'Containerization for reproducible deployments.',
    'rest-api-design': 'Designing predictable HTTP APIs.',
    'authentication-(jwt-basics)': 'Token-based auth for stateless APIs.',
    'environment-configuration': 'Manage secrets and env-specific configs.',
    'git-+-github': 'Source control and collaboration workflows.',
    'branching-strategies': 'Organized Git workflows for teams.',
    'code-reviews': 'Peer review to improve quality.',
    'agile-/-iterative-development': 'Iterative planning and delivery.',
    'technical-documentation': 'Readable docs for users and devs.',
    'debugging-+-root-cause-analysis': 'Systematic troubleshooting and fixes.'
  }

  const normalizedTooltipMap = Object.fromEntries(Object.entries(tooltipMap).map(([k, v]) => [
    k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), v
  ]))

  return (
    <div className="site-container">
      <header className="reveal">
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '88px', height: '88px', borderRadius: '9999px', overflow: 'visible' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'linear-gradient(90deg, var(--accent3), var(--accent), var(--accent2))', zIndex: 1, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'radial-gradient(circle, rgba(161,75,255,0.12), rgba(0,240,255,0.06))', filter: 'blur(6px)', opacity: 0.22, width: 'calc(100% + 12px)', height: 'calc(100% + 12px)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', borderRadius: '9999px', overflow: 'hidden' }}>
              <Image
                src="/download.png"
                alt="Nakerra Lewis"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width:720px) 72px, 88px"
                quality={80}
              />
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,3rem)', margin: 0, fontWeight: 800 }}>About Me</h1>
            <div style={{ color: 'var(--accent)', fontWeight: 600 }}>Designing futures through creativity and code</div>
          </div>
        </div>
      </header>

      <div className="grid-two">
        <section>
          <div className="card reveal">
            <div className="card-heading">Who I Am</div>
            
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.8rem' }}>
              I’m a software engineer with a strong foundation in UI/UX and interactive design. I build thoughtful, scalable applications from the ground up, shaping both the front-end experience and the back-end architecture that powers it.
            </p>

            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.6rem' }}>
              I care deeply about how people experience digital products. The small moments of responsiveness, clarity, and delight matter just as much to me as clean APIs and efficient system design. My work lives at the intersection of technical precision and human-centered design.
            </p>

            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.6rem' }}>
              With experience spanning front-end engineering, server-side development, and product thinking, I bridge the gap between concept and deployment — turning ideas into polished, production-ready systems.
            </p>

            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.6rem' }}>
              Lately, I’ve been exploring real-time collaboration tools, intelligent automation, and generative UI patterns that adapt to users dynamically. I’m especially interested in building products that strengthen connection, improve workflow efficiency, and make technology feel more intuitive.
            </p>

            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.6rem' }}>
              When I’m not shipping code, I’m mapping system architecture, refining interaction flows, or prototyping new ideas to test how far an experience can evolve.
            </p>
          </div>

          <div style={{ height: '12px' }} />

          <div className="card reveal">
            <div className="card-heading">My Journey</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500 }}>
              Over the past year, I&apos;ve been expanding my skills in real-world environments — including designing an app concept called Lemon-Aid to help teens build confidence and make new friends. I&apos;m currently working on PlayerLobby, a social platform for planning gaming hangouts, while leveling up my UI design and coding abilities through build-first learning.
            </p>
          </div>

          <div style={{ height: '12px' }} />

          <div className="card reveal">
            <div className="card-heading">Full Skill-Set</div>
            <div style={{ marginTop: '0.5rem', display: 'grid', gap: '0.75rem' }}>
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>{g.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {g.items.map((s, i) => {
                      const id = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                      return (
                        <span key={s} className="skill-wrap" style={{ ['--delay']: `${i * 40}ms` }}>
                          <span
                            className="skill-badge"
                            aria-describedby={`tip-${id}`}
                            tabIndex={0}
                          >
                            {s}
                          </span>
                          <span role="tooltip" id={`tip-${id}`} className="skill-tooltip">
                            {normalizedTooltipMap[id] || 'Hover or focus for details.'}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside style={{ display: 'grid', gap: '0.75rem' }}>
          <div className="card reveal">
            <div className="card-heading">Beyond the Screen</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72 }}>I love story-rich game universes, interactive media, and anything with a neon, cosmic, or sci-fi feel. My goal is to build digital spaces that feel like an adventure — where users feel welcome and excited to dive in.</p>
          </div>

          <div className="card reveal">
            <div className="card-heading">My Purpose</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72 }}>I create with intention: to make technology feel bold, inclusive, and inspiring. Every project is a chance to help someone take a step toward something new.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
