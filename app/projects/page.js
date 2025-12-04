"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './projects.module.css'
import aboutStyles from '../about/about.module.css'
import Image from 'next/image'

export default function Projects() {
  const containerRef = useRef(null)
  const [filter, setFilter] = useState('All')

  // static project data (local, original layout)
  const projects = [
    {
      id: 'nextstep',
      title: 'NextStep',
      desc:
        "A motivational goal-tracking app that helps users take small, actionable steps toward personal growth. Clean, encouraging UI built to promote daily progress.",
      tech: ['HTML', 'CSS', 'JavaScript'],
      categories: ['Web Apps'],
      href: 'https://next-step-sandy.vercel.app',
      headerGradient: 'linear-gradient(90deg,#ff2d95,#7c3aed)',
      // use text instead of the SVG logo so the label is high-contrast on the gradient
      logo: null,
    },
    {
      id: 'playerlobby',
      title: 'PlayerLobby (Coming Soon)',
      desc:
        "A group hangout planner to help friends agree on activities, plan budgets, schedule meetups, and keep everyone on the same page — without the usual back-and-forth.",
      tech: ['React.js', 'CSS'],
      categories: ['Web Apps', 'In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#7c3aed,#ec4899)',
      logo: '/images/playerlobby-wireframe.svg',
    },
    {
      id: 'more',
      title: 'More Coming Soon',
      desc: "I'm actively building new projects. Check back soon for updates.",
      tech: [],
      categories: ['In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#6b7280,#111827)',
      logo: null,
    },
  ]

  useEffect(() => {
    const revealClass = styles.reveal
    const visibleClass = styles.visible
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(visibleClass)
      })
    }, { threshold: 0.12 })

    const els = containerRef.current ? containerRef.current.querySelectorAll(`.${revealClass}`) : []
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [filter])

  const visibleProjects = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  return (
    <div className="min-h-screen relative">
      <div className={styles.bgShapes} aria-hidden>
        <div className={`${styles.bgBlob} ${styles.one}`} />
        <div className={`${styles.bgBlob} ${styles.two}`} />
      </div>

      <div className={styles.projectsRoot} ref={containerRef}>
        <header className={aboutStyles.hero}>
          <h1 className={aboutStyles.title}>My Projects</h1>
          <p className={styles.tagline}>A look at what I’ve built — and what’s coming next.</p>
        </header>

        <div className={styles.filters}>
          {['All', 'Web Apps', 'In Progress'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={`${styles.grid} mb-8`}>
          {visibleProjects.map((p) => (
            <div key={p.id} className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardHeader} style={{ background: p.headerGradient }}>
                {p.logo ? (
                  <Image src={p.logo} alt={`${p.title} logo`} width={48} height={48} />
                ) : (
                  <span className={styles.logoText}>{p.title}</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.techList}>
                  {p.tech.map((t) => (
                    <span key={t} className={styles.badge}>{t}</span>
                  ))}
                </div>
                <div className={styles.ctaRow}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                      View Project
                    </a>
                  ) : (
                    <span className={styles.ctaDisabled}>Coming Soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
