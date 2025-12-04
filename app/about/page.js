import styles from './about.module.css'
import Image from 'next/image'

export default function About() {
  return (
    <div className={styles.aboutRoot}>
      <header className={styles.hero}>
        <div className={styles.titleRow}>
          <div className={styles.avatarRing} aria-hidden="true">
            <Image
              className={styles.avatar}
              src="/download.jpg"
              alt="Nakerra Lewis"
              width={88}
              height={88}
            />
          </div>
          <div>
            <h1 className={styles.title}>About Me</h1>
            <div className={styles.subhead}>Designing futures through creativity and code</div>
          </div>
        </div>
      </header>

      <div className={styles.contentGrid}>
        <section>
          <div className={styles.panel}>
            <div className={styles.sectionTitle}>Who I Am</div>
            <p className={styles.whoIAm}>
              I’m Nakerra Lewis, a hands-on creative developer with a growing focus in game design, web development, and emerging technology. I love building digital experiences that feel playful, futuristic, and alive — the type of projects that encourage people to explore and connect with each other.
            </p>
          </div>

          <div style={{ height: 12 }} />

          <div className={styles.panel}>
            <div className={styles.sectionTitle}>My Journey</div>
            <p className={styles.whoIAm}>
              Over the past year, I’ve been expanding my skills in real-world environments — including designing an app concept called Lemon-Aid to help teens build confidence and make new friends. I’m currently working on PlayerLobby, a social platform for planning gaming hangouts, while leveling up my UI design and coding abilities through build-first learning.
            </p>
          </div>

          <div style={{ height: 12 }} />

          <div className={styles.panel}>
            <div className={styles.sectionTitle}>What I Work With</div>
            <ul className={styles.list} aria-label="skills">
              <li><span className={styles.badge}>JavaScript + Next.js</span></li>
              <li><span className={styles.badge}>CSS + modern UI styling techniques</span></li>
              <li><span className={styles.badge}>Figma: wireframes, interface layouts</span></li>
              <li><span className={styles.badge}>UX research + interaction planning</span></li>
            </ul>
          </div>
        </section>

        <aside className={styles.rightCard}>
          <div className={styles.asideCard}>
            <div className={styles.sectionTitle}>Beyond the Screen</div>
            <p className={styles.whoIAm}>
              I love story-rich game universes, interactive media, and anything with a neon, cosmic, or sci-fi feel. My goal is to build digital spaces that feel like an adventure — where users feel welcome and excited to dive in.
            </p>
          </div>

          <div className={styles.asideCard}>
            <div className={styles.sectionTitle}>My Purpose</div>
            <p className={styles.whoIAm}>
              I create with intention: to make technology feel bold, inclusive, and inspiring. Every project is a chance to help someone take a step toward something new.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
