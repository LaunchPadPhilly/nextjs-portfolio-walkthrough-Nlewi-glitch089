import Link from 'next/link'

export default function Contact() {
  return (
    <div className="site-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,3rem)', fontWeight: 800 }}>Get In Touch</h1>
        <div style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '0.75rem' }}>I&apos;d love to connect and talk about new opportunities, collaborations, or anything tech-related. Reach out anytime through the platforms below!</div>
      </header>

      <section>
        <div className="card">
          <div style={{ fontWeight: 800, color: 'var(--accent3)', marginBottom: '1rem', fontSize: '1.05rem' }}>Contact Methods</div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>📧</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.25rem' }}>Email</div>
                <div style={{ color: 'var(--foreground)' }}>nlewi0089@launchpadphilly.org</div>
                <div style={{ color: '#b6b6c8', marginTop: '0.25rem', fontSize: '0.9rem' }}>(Best way to reach me!)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>🔗</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.25rem' }}>LinkedIn</div>
                <a href="https://www.linkedin.com/in/nakerra-lewis-027827318/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent2)', textDecoration: 'underline', fontWeight: '500' }}>linkedin.com/in/nakerra-lewis-027827318</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>💻</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.25rem' }}>GitHub</div>
                <a href="https://github.com/Nlewi-glitch089" target="_blank" rel="noreferrer" style={{ color: 'var(--accent2)', textDecoration: 'underline', fontWeight: '500' }}>github.com/Nlewi-glitch089</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Availability</div>
          <p style={{ fontSize: '1.03rem', color: 'var(--foreground)', lineHeight: 1.6, margin: '0' }}>Open to freelance and collaborative projects. Best reached by email. Typical response time: 1–5 business days.</p>
        </div>

        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--accent2)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>What I&apos;m Looking For</div>
          <p style={{ fontSize: '1.03rem', color: 'var(--foreground)', lineHeight: 1.6, margin: '0' }}>If you have an idea for a project, a collaboration, or want feedback on a prototype, I&apos;d love to hear from you. Let&apos;s build something meaningful together.</p>
        </div>
      </section>
    </div>
  )
}
