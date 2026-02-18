"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  // static project data
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
    {
      id: 'microlib',
      title: 'Micro-Interaction Library',
      desc: 'A collection of reusable, accessible micro-interactions and UI primitives focused on performance and delightful motion.',
      tech: ['React', 'Animation'],
      categories: ['Web Apps', 'In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#0ea5a4,#7c3aed)',
      logo: null,
    },
    {
      id: 'dynlayout',
      title: 'Dynamic Layout Engine',
      desc: 'Experimenting with AI-driven UI patterns that adapt layouts based on content type and user context.',
      tech: ['AI', 'Layout'],
      categories: ['Research', 'In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#22c55e,#06b6d4)',
      logo: null,
    },
  ]

  const visibleProjects = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  function handleNoLink(title) {
    if (typeof window !== 'undefined') {
      window.alert(`${title} — link not added yet. I'll add it soon; message me if you'd like early access.`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background shapes (kept as-is) */}
      <div style={{ position: 'absolute', inset: 'auto 0 0 0', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <div style={{ position: 'absolute', width: 360, height: 360, right: '10%', bottom: -60, filter: 'blur(60px)', opacity: 0.28, background: 'radial-gradient(circle at center, #7c3aed, rgba(124,58,237,0.4))' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, left: '6%', bottom: -120, filter: 'blur(60px)', opacity: 0.28, background: 'radial-gradient(circle at center, #06b6d4, rgba(6,182,212,0.32))' }} />
      </div>

      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <header style={{ marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,2.2rem)', fontWeight: 800, color: 'var(--foreground)' }}>My Projects</h1>
          <p style={{ color: 'var(--accent2)', fontWeight: 600, marginTop: '0.5rem' }}>A look at what I&apos;ve built — and what&apos;s coming next.</p>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {['All', 'Web Apps', 'In Progress'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="pill"
              aria-pressed={filter === f}
              style={filter === f ? { boxShadow: '0 10px 30px rgba(161,75,255,0.08)', border: '1px solid rgba(161,75,255,0.08)' } : { background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', color: '#b6b6c8' }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid" style={{ marginBottom: '1.5rem' }}>
          {visibleProjects.map((p) => (
            <div key={p.id} className="card reveal" style={{ minHeight: 320, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, position: 'relative', background: p.headerGradient }}>
                {p.logo ? (
                  <img src={p.logo} alt={`${p.title} logo`} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                ) : (
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{p.title}</span>
                )}
              </div>
              <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>{p.title}</h3>
                <p style={{ color: '#b6b6c8', fontSize: '0.98rem', lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {p.tech.map((t) => (
                    <span key={t} className="pill" style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.06), rgba(161,75,255,0.04))' }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="btn-primary">View Project</a>
                  ) : (
                    <button onClick={() => handleNoLink(p.title)} className="btn-ghost">View Project</button>
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
