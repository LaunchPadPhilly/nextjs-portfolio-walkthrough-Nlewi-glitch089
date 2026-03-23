"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminGate from '../../components/AdminGate'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')

  const inputStyle = {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.03)',
    color: 'var(--foreground)',
  }

  const labelStyle = {
    display: 'block',
    fontWeight: 700,
    marginBottom: 6,
    color: 'var(--foreground)',
    fontSize: 13,
  }

  const compactLabelStyle = {
    ...labelStyle,
    fontSize: 12,
    marginBottom: 4,
  }

  const compactInputStyle = {
    ...inputStyle,
    padding: 8,
    fontSize: 12,
  }

  function toCsv(arr) {
    return (arr || []).join(', ')
  }

  function fromCsv(value) {
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  async function saveProjects(nextProjects, options = { silent: false }) {
    const { silent } = options
    if (!silent) setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextProjects),
      })
      const j = await res.json()
      if (!j.ok) throw new Error(j.error || 'Save failed')
      setSaveStatus('Saved')
    } catch (e) {
      setSaveStatus('Save failed')
      try {
        window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save failed: ' + e.message, type: 'error' } }))
      } catch (err) {}
    } finally {
      if (!silent) setLoading(false)
    }
  }

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', { credentials: 'same-origin' })
      const j = await res.json()
      setProjects(j.projects || [])
      setHydrated(true)
      setSaveStatus('')
    } catch (e) { window.alert('Failed to load projects: ' + e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!hydrated) return
    setSaveStatus('Saving…')
    const timer = setTimeout(() => {
      saveProjects(projects, { silent: true })
    }, 700)
    return () => clearTimeout(timer)
  }, [projects, hydrated])

  function addProject() {
    const id = 'proj_' + Date.now().toString(36)
    setProjects(p => [{ id, title: 'New Project', desc: '', tech: [], categories: [], href: null, headerGradient: 'linear-gradient(90deg,#7c3aed,#06b6d4)', logo: null }, ...p])
  }

  function update(idx, key, value) {
    setProjects(p => p.map((it, i) => i === idx ? { ...it, [key]: value } : it))
  }

  function remove(idx) {
    if (!confirm('Remove project?')) return
    setProjects(p => p.filter((_, i) => i !== idx))
  }

  return (
    <AdminGate title="Project Admin" description="Sign in to manage portfolio projects.">
    <div className="site-container">
      <h1 style={{ fontWeight: 800 }}>Manage Projects</h1>
      <p style={{ color: '#b6b6c8' }}>Add and edit projects shown on the Projects page. Changes auto-save.</p>

      <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/admin" className="btn-ghost">Back to Admin</Link>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn-primary" onClick={addProject}>Add Project</button>
        <span style={{ alignSelf: 'center', color: saveStatus === 'Save failed' ? '#ffb4b4' : '#b6b6c8', fontSize: 13 }}>{saveStatus}</span>
      </div>

      <div style={{ marginTop: 12 }}>
        {projects.map((p, i) => (
          <div key={p.id} className="card" style={{ marginBottom: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <label style={labelStyle}>Title</label>
              <input value={p.title} onChange={e => update(i, 'title', e.target.value)} style={inputStyle} />

              <div style={{ height: 10 }} />
              <label style={labelStyle}>Description</label>
              <textarea value={p.desc} onChange={e => update(i, 'desc', e.target.value)} style={{ ...inputStyle, minHeight: 86, resize: 'vertical' }} />

              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Live Link (optional)</label>
                <input placeholder="https://..." value={p.href || ''} onChange={e => update(i, 'href', e.target.value || null)} style={inputStyle} />
              </div>

              <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: 'pointer', color: '#b6b6c8', fontWeight: 700, fontSize: 13 }}>
                  Advanced fields
                </summary>
                <div style={{ marginTop: 10, display: 'grid', gap: 10, maxWidth: 560 }}>
                  <div>
                    <label style={compactLabelStyle}>Header Gradient</label>
                    <input value={p.headerGradient} onChange={e => update(i, 'headerGradient', e.target.value)} style={compactInputStyle} />
                  </div>
                  <div>
                    <label style={compactLabelStyle}>Categories (comma)</label>
                    <input value={toCsv(p.categories)} onChange={e => update(i, 'categories', fromCsv(e.target.value))} style={compactInputStyle} />
                  </div>
                  <div>
                    <label style={compactLabelStyle}>Tech Badges (comma)</label>
                    <input value={toCsv(p.tech)} onChange={e => update(i, 'tech', fromCsv(e.target.value))} style={compactInputStyle} />
                  </div>
                </div>
              </details>

              <div style={{ marginTop: 12 }}>
                <button className="btn-ghost" onClick={() => remove(i)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminGate>
  )
}
