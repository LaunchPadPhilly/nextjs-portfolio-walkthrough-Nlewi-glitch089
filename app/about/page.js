import Image from 'next/image'

export default function About() {
  return (
    <div className="site-container">
      <header className="reveal">
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '9999px', overflow: 'visible' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'linear-gradient(90deg, var(--accent3), var(--accent), var(--accent2))', zIndex: 1, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'radial-gradient(circle, rgba(161,75,255,0.12), rgba(0,240,255,0.06))', filter: 'blur(6px)', opacity: 0.22, width: 'calc(100% + 12px)', height: 'calc(100% + 12px)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            <img src="/download.jpg" alt="Nakerra Lewis" style={{ width: '100%', height: '100%', borderRadius: '9999px', position: 'relative', zIndex: 3, objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,3rem)', margin: 0, fontWeight: 800 }}>About Me</h1>
            <div style={{ color: 'var(--accent2)', fontWeight: 600 }}>Designing futures through creativity and code</div>
          </div>
        </div>
      </header>

      <div className="grid-two">
        <section>
          <div className="card reveal">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Who I Am</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500 }}>Full-Stack Software Engineer</p>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500, marginTop: '0.6rem' }}>Designing interactive systems that feel alive.</p>

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
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>My Journey</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72, fontWeight: 500 }}>
              Over the past year, I&apos;ve been expanding my skills in real-world environments — including designing an app concept called Lemon-Aid to help teens build confidence and make new friends. I&apos;m currently working on PlayerLobby, a social platform for planning gaming hangouts, while leveling up my UI design and coding abilities through build-first learning.
            </p>
          </div>

          <div style={{ height: '12px' }} />

          <div className="card reveal">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>What I Work With</div>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }} aria-label="skills">
              <li><span className="pill">JavaScript + Next.js</span></li>
              <li><span className="pill">CSS + modern UI styling techniques</span></li>
              <li><span className="pill">Figma: wireframes, interface layouts</span></li>
              <li><span className="pill">UX research + interaction planning</span></li>
            </ul>
          </div>
        </section>

        <aside style={{ display: 'grid', gap: '0.75rem' }}>
          <div className="card reveal">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Beyond the Screen</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72 }}>I love story-rich game universes, interactive media, and anything with a neon, cosmic, or sci-fi feel. My goal is to build digital spaces that feel like an adventure — where users feel welcome and excited to dive in.</p>
          </div>

          <div className="card reveal">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>My Purpose</div>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', lineHeight: 1.72 }}>I create with intention: to make technology feel bold, inclusive, and inspiring. Every project is a chance to help someone take a step toward something new.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
