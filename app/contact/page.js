export default function Contact() {
  return (
    <div className="site-container">
      <header style={{ marginBottom: '0.75rem' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,3rem)', fontWeight: 800 }}>Get In Touch</h1>
        <div style={{ color: 'var(--accent2)', fontWeight: 600, marginTop: '0.5rem' }}>I'd love to connect and talk about new opportunities, collaborations, or anything tech-related. Reach out anytime through the channels below!</div>
      </header>

      <div className="grid-two">
        <section>
          <div className="card">
            <div style={{ fontWeight: 800, color: 'var(--accent3)', marginBottom: '0.5rem' }}>Contact</div>

            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.4rem' }}>📧</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Email</div>
                  <div style={{ color: 'var(--foreground)' }}>nlewi0089@launchpadphilly.org</div>
                  <div style={{ color: '#b6b6c8', marginTop: '0.35rem', fontSize: '0.9rem' }}>(Best way to reach me!)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.4rem' }}>🔗</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>LinkedIn</div>
                  <a href="https://www.linkedin.com/in/nakerra-lewis-027827318/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent2)', textDecoration: 'underline' }}>linkedin.com/in/nakerra-lewis-027827318</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.4rem' }}>💻</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>GitHub</div>
                  <a href="https://github.com/Nlewi-glitch089" target="_blank" rel="noreferrer" style={{ color: 'var(--accent2)', textDecoration: 'underline' }}>github.com/Nlewi-glitch089</a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '12px' }} />

          <div className="card" />
        </section>

        <aside style={{ display: 'grid', gap: '0.75rem' }}>
          <div className="card">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Availability</div>
            <p style={{ fontSize: '1.03rem', color: 'var(--foreground)', lineHeight: 1.72 }}>Open to freelance and collaborative projects — best reached by email. Typical response time: 1–3 business days.</p>
          </div>

          <div className="card">
            <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.5rem' }}>Why Connect?</div>
            <p style={{ fontSize: '1.03rem', color: 'var(--foreground)', lineHeight: 1.72 }}>If you have an idea for a project, a collaboration, or want feedback on a prototype, I'd love to hear from you.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
