import Link from 'next/link'
import TitleEffect from './components/TitleEffect'

export default function Home() {
  return (
    <div className="site-container">
      <div className="grid-two">
        <section>
          <div className="hero">
            <TitleEffect>
              <h1 className="hero-title reveal">Nakerra Lewis</h1>
            </TitleEffect>
          </div>

          <div className="lead reveal">Software Engineer Building Meaningful Digital Experiences</div>

          <div className="card reveal" style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--foreground)', fontSize: '1.03rem' }}>
              I design and prototype interactive apps that encourage people to connect, explore, and try new things. I&apos;m passionate about social-driven technology — from playful game features to engaging UI that supports real collaboration and community.
            </p>

            <div style={{ marginTop: '0.75rem', color: '#b6b6c8' }}>
              <strong>Focused on:</strong> Software Engineering · Front-End Development · Interactive Media
            </div>

            <div style={{ marginTop: '1rem' }}>
              <span className="pill">🎮 Designing creative tools for social connection</span>
              <span className="pill">🧩 Turning ideas into interactive prototypes</span>
              <span className="pill">🌱 Always learning new ways to enhance user experience</span>
            </div>
          </div>
        </section>

        <aside>
          <div className="featured-card reveal">
            <div style={{ color: 'var(--accent3)', fontWeight: 700 }}>Featured</div>
            <div style={{ fontWeight: 800, color: 'var(--foreground)', fontSize: '1.05rem' }}>Software Engineer</div>
            <p style={{ marginTop: '0.5rem', color: '#b6b6c8' }}>Focused on accessible interactions and delightful micro-interactions. Currently exploring real-time collaboration and generative UI patterns.</p>
          </div>

          <div className="card reveal" style={{ marginTop: '1rem' }}>
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Featured Project</div>
            <p style={{ color: '#b6b6c8' }}>PlayerLobby — an early prototype for coordinating local and online gaming hangouts with presence awareness and quick invites. Click to view the project or explore more on the Projects page.</p>
            <Link href="/projects" className="btn-primary" style={{ display: 'inline-block', marginTop: '0.75rem' }}>See Projects</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
