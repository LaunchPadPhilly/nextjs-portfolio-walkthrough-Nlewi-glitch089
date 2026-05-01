"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProjectRecommender from '../components/ProjectRecommender'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [explainingById, setExplainingById] = useState({})
  const [explainModal, setExplainModal] = useState({ open: false, title: '', loading: false, explanation: '', error: '', aiGenerated: false, isComingSoon: false })

  const [projects, setProjects] = useState([])
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(j => { if (j.projects) setProjects(j.projects) }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!explainModal.open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [explainModal.open])

  const visibleProjects = (projects || []).filter((p) => filter === 'All' || (p.categories || []).includes(filter))

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

      <div className="site-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
        <header style={{ marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.8vw,3rem)', fontWeight: 800, color: 'var(--foreground)' }}>My Projects</h1>
          <p style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '0.5rem' }}>A look at what I&apos;ve built — and what&apos;s coming next.</p>
        </header>

        <ProjectRecommender />

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
                  <Image src={p.logo} alt={`${p.title} logo`} width={48} height={48} style={{ objectFit: 'contain' }} />
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
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="btn-primary">View Project</a>
                  ) : (
                    <button onClick={() => handleNoLink(p.title)} className="btn-ghost">View Project</button>
                  )}
                  <button
                    className="btn-ghost"
                    disabled={Boolean(explainingById[p.id])}
                    onClick={async () => {
                      const isComingSoon = !p.href
                      setExplainingById((prev) => ({ ...prev, [p.id]: true }))
                      setExplainModal({
                        open: true,
                        title: p.title,
                        loading: true,
                        explanation: '',
                        error: '',
                        aiGenerated: false,
                        isComingSoon,
                      })
                      try {
                        const res = await fetch('/api/explain', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ projectId: p.id }),
                        })
                        const data = await res.json()
                        if (data.error) throw new Error(data.error)
                        setExplainModal({
                          open: true,
                          title: p.title,
                          loading: false,
                          explanation: data.explanation || 'No explanation returned.',
                          error: '',
                          aiGenerated: Boolean(data.aiGenerated),
                          isComingSoon,
                        })
                      } catch (err) {
                        setExplainModal({
                          open: true,
                          title: p.title,
                          loading: false,
                          explanation: '',
                          error: `Unable to fetch explanation: ${err.message}`,
                          aiGenerated: false,
                          isComingSoon,
                        })
                      } finally {
                        setExplainingById((prev) => ({ ...prev, [p.id]: false }))
                      }
                    }}
                  >
                    {explainingById[p.id] ? 'Explaining…' : 'Explain'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {explainModal.open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project explanation"
            onClick={() => setExplainModal((prev) => ({ ...prev, open: false }))}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 70,
              background: 'rgba(0, 0, 0, 0.55)',
              display: 'grid',
              placeItems: 'center',
              padding: '1rem',
              overscrollBehavior: 'none',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(720px, 94vw)',
                maxHeight: '80vh',
                overflow: 'auto',
                background: 'rgba(10, 14, 24, 0.98)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px',
                padding: '1rem 1.1rem',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                overscrollBehavior: 'contain',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>{explainModal.title}</h3>
                <button className="btn-ghost" onClick={() => setExplainModal((prev) => ({ ...prev, open: false }))}>Close</button>
              </div>

              {explainModal.loading && (
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1.6 }}>
                  {explainModal.isComingSoon ? '✦ Fetching from AI — this may take a moment…' : 'Generating explanation…'}
                </p>
              )}

              {!explainModal.loading && explainModal.error && (
                <p style={{ margin: 0, fontSize: '1rem', color: '#ffb4b4', lineHeight: 1.6 }}>
                  {explainModal.error}
                </p>
              )}

              {!explainModal.loading && !explainModal.error && (
                <>
                  <p style={{ margin: 0, fontSize: '1.06rem', color: 'var(--foreground)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {explainModal.explanation}
                  </p>
                  {explainModal.aiGenerated && (
                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
                      ✦ Generated by AI
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
