"use client"

import { useEffect, useState } from 'react'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', { credentials: 'same-origin' })
      const j = await res.json()
      setProjects(j.projects || [])
    } catch (e) { window.alert('Failed to load projects: ' + e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  function addProject() {
    const id = 'proj_' + Date.now().toString(36)
    setProjects(p => [{ id, title: 'New Project', desc: '', tech: [], categories: [], href: null, headerGradient: 'linear-gradient(90deg,#7c3aed,#06b6d4)', logo: null }, ...p])
  }

  function update(idx, key, value) {
    setProjects(p => p.map((it, i) => i === idx ? { ...it, [key]: value } : it))
  }

  async function saveAll() {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projects) })
      const j = await res.json()
      if (!j.ok) window.alert('Save failed: ' + (j.error || 'unknown'))
      else window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Projects saved', type: 'success' } }))
    } catch (e) { window.alert('Save error: ' + e.message) }
    finally { setLoading(false) }
  }

  function remove(idx) {
    if (!confirm('Remove project?')) return
    setProjects(p => p.filter((_, i) => i !== idx))
  }

  return (
    <div className="site-container">
      <h1 style={{ fontWeight: 800 }}>Manage Projects</h1>
      <p style={{ color: '#b6b6c8' }}>Add, edit, and reorder projects shown on the Projects page.</p>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn-primary" onClick={addProject}>Add Project</button>
        <button className="btn-primary" onClick={saveAll} disabled={loading}>{loading ? 'Saving…' : 'Save All'}</button>
        <button className="btn-ghost" onClick={load}>Refresh</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {projects.map((p, i) => (
          <div key={p.id} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <input value={p.title} onChange={e => update(i, 'title', e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
                <textarea value={p.desc} onChange={e => update(i, 'desc', e.target.value)} style={{ width: '100%', height: 80, marginTop: 8 }} />
                <div style={{ marginTop: 8 }}>
                  <input placeholder="href" value={p.href || ''} onChange={e => update(i, 'href', e.target.value || null)} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
                </div>
              </div>
              <div style={{ width: 220 }}>
                <label style={{ display: 'block', fontWeight: 700 }}>Header Gradient</label>
                <input value={p.headerGradient} onChange={e => update(i, 'headerGradient', e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
                <div style={{ height: 12 }} />
                <label style={{ display: 'block', fontWeight: 700 }}>Categories (comma)</label>
                <input value={(p.categories || []).join(', ')} onChange={e => update(i, 'categories', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
                <div style={{ height: 12 }} />
                <button className="btn-ghost" onClick={() => remove(i)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
