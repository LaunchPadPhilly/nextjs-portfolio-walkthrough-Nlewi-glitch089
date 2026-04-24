import Link from 'next/link'
import TitleEffect from './components/TitleEffect'

export default function Home() {
  return (
    <div className="site-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <section>
        <div className="hero" style={{ margin: '0', padding: '0', maxWidth: 'none' }}>
          <TitleEffect>
            <h1 className="hero-title reveal">Nakerra Lewis</h1>
          </TitleEffect>
        </div>

        <div className="lead reveal" style={{ marginTop: '0.5rem' }}>
          Software Engineer Building Meaningful Digital Experiences
        </div>

        <div className="card reveal" style={{ marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--foreground)', fontSize: '1.03rem', margin: '0' }}>
            I design and prototype interactive apps that encourage people to connect, explore, and try new things. I&apos;m passionate about social-driven technology — from playful game features to engaging UI that supports real collaboration and community.
          </p>

          <div style={{ marginTop: '1rem', color: '#b6b6c8' }}>
            <strong>Focused on:</strong> Software Engineering · Front-End Development · Interactive Media
          </div>

          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span className="pill" style={{ display: 'inline-flex', width: 'fit-content' }}>🎮 Creative tools for social connection</span>
            <span className="pill" style={{ display: 'inline-flex', width: 'fit-content' }}>🧩 Turning ideas into interactive prototypes</span>
            <span className="pill" style={{ display: 'inline-flex', width: 'fit-content' }}>🌱 Always learning UX enhancement</span>
          </div>
        </div>

        <div className="card reveal" style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--accent3)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Featured Project</div>
          <p style={{ color: '#b6b6c8', margin: '0', lineHeight: '1.6' }}>
            Nerd Street CRM — a donor relationship tool for nonprofits. Centralizes donors, donations, and engagement so teams stop relying on fragmented spreadsheets and manual follow-ups.
          </p>
          <Link href="/projects" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            See All Projects →
          </Link>
        </div>

        <div className="card reveal" style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.75rem' }}>Quick Links</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/about" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
              → Learn more about me
            </Link>
            <Link href="/projects" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
              → View my portfolio
            </Link>
            <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
              → Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
