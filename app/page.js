import Link from 'next/link'
import TitleEffect from './components/TitleEffect'
import AsideAligner from './components/AsideAligner'

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
          <AsideAligner offset={24}>
            <div className="card reveal">
              <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Featured Project</div>
              <p style={{ color: '#b6b6c8' }}>Nerd Street CRM — a donor relationship tool for nonprofits. It centralizes donors, donations, and engagement so teams stop relying on fragmented spreadsheets and manual follow-ups. Click to view the project or explore more on the Projects page.</p>
              <Link href="/projects" className="btn-primary" style={{ display: 'inline-block', marginTop: '0.75rem' }}>See Projects</Link>
            </div>
          </AsideAligner>
        </aside>
      </div>
    </div>
  )
}
