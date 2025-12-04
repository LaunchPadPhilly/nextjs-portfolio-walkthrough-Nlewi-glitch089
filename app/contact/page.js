import styles from '../about/about.module.css'

export default function Contact() {
  return (
    <div className={styles.aboutRoot}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Get In Touch</h1>
        <div className={styles.subhead}>
          I’d love to connect and talk about new opportunities, collaborations, or anything tech-related. Reach out anytime through the channels below!
        </div>
      </header>

      <div className={styles.contentGrid}>
        <section>
          <div className={styles.panel}>
            <div className={styles.sectionTitle}>Contact</div>

            <div style={{ display: 'grid', gap: 18 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22 }}>📧</div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)' }}>Email</div>
                  <div className={styles.whoIAm}>nlewi0089@launchpadphilly.org</div>
                  <div style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>(Best way to reach me!)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22 }}>🔗</div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)' }}>LinkedIn</div>
                  <a href="https://www.linkedin.com/in/nakerra-lewis-027827318/" target="_blank" rel="noreferrer" className={styles.whoIAm} style={{ color: 'var(--accent-cyan)' }}>
                    linkedin.com/in/nakerra-lewis-027827318
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22 }}>💻</div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)' }}>GitHub</div>
                  <a href="https://github.com/Nlewi-glitch089" target="_blank" rel="noreferrer" className={styles.whoIAm} style={{ color: 'var(--accent-cyan)' }}>
                    github.com/Nlewi-glitch089
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div className={styles.panel}>
            </div>
        </section>

        <aside className={styles.rightCard}>
          <div className={styles.asideCard}>
            <div className={styles.sectionTitle}>Availability</div>
            <p className={styles.whoIAm}>Open to freelance and collaborative projects — best reached by email. Typical response time: 1–3 business days.</p>
          </div>

          <div className={styles.asideCard}>
            <div className={styles.sectionTitle}>Why Connect?</div>
            <p className={styles.whoIAm}>If you have an idea for a project, a collaboration, or want feedback on a prototype, I’d love to hear from you.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
