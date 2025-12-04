import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.layoutRow}>
          <section>
            <div className={styles.titleEffectContainer}>
              <h1 className={styles.title}>Nakerra Lewis</h1>
            </div>

            <div className={styles.subtitle}>Creative Developer Building Meaningful Digital Experiences</div>

            <div className={styles.introCard} style={{ marginTop: 18 }}>
              <p className={styles.introText}>
                I design and prototype interactive apps that encourage people to connect, explore, and try new things. I’m passionate about social-driven technology — from playful game features to engaging UI that supports real collaboration and community.
              </p>

              <div className={styles.focusLine}>
                <strong>Focused on:</strong> UI/UX Design · Front-End Development · Interactive Media
              </div>

              <div className={styles.miniBadges} aria-hidden="false">
                <button className={styles.miniBadge} aria-label="Designing creative tools for social connection">🎮 Designing creative tools for social connection</button>
                <button className={styles.miniBadge} aria-label="Turning ideas into interactive prototypes">🧩 Turning ideas into interactive prototypes</button>
                <button className={styles.miniBadge} aria-label="Always learning new ways to enhance user experience">🌱 Always learning new ways to enhance user experience</button>
              </div>
            </div>
          </section>

          <aside className={styles.rightPanel}>
            <div className={styles.profileCard}>
              <div className={styles.kicker}>Featured</div>
              <div style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.05rem' }}>Creator + Developer</div>
              <p style={{ marginTop: 8, color: 'var(--muted)', fontSize: '0.95rem' }}>
                Focused on accessible interactions and delightful micro-interactions. Currently exploring real-time collaboration and generative UI patterns.
              </p>
            </div>

            <div className={styles.asideCard}>
              <div className={styles.sectionTitle}>Featured Project</div>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                PlayerLobby — an early prototype for coordinating local and online gaming hangouts with presence awareness and quick invites. Click to view the project or explore more on the Projects page.
              </p>
              <a href="/projects" style={{ marginTop: 12, display: 'inline-block', padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(90deg,var(--accent-cyan),var(--accent-magenta))', color: '#0b0b0b', fontWeight: 800, textDecoration: 'none' }}>See Projects</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
