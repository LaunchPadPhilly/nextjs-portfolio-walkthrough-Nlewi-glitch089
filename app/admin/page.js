"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ToastHost from '../components/ToastHost'
import AdminGate from '../components/AdminGate'

export default function AdminContextEditor() {
  const [prompt, setPrompt] = useState('')
  const [avatarPath, setAvatarPath] = useState('/profile.jpg')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch('/api/context')
      .then(r => r.json())
      .then(j => { if (j.systemPrompt) setPrompt(j.systemPrompt); if (j.avatarPath) setAvatarPath(j.avatarPath) })
      .finally(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="site-container">
        <div className="card" style={{ marginTop: 16 }}>
          <p style={{ margin: 0, color: '#b6b6c8' }}>Loading admin panel…</p>
        </div>
      </div>
    )
  }

  async function save() {
    setLoading(true)
    try {
      const res = await fetch('/api/context', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: prompt, avatarPath }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      try { window.dispatchEvent(new CustomEvent('contextUpdated', { detail: { avatarPath } })) } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Saved', type: 'success' } })) } catch (e) {}
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save failed: ' + err.message, type: 'error' } })) } catch (e) {}
    } finally {
      setLoading(false)
    }
  }

  async function uploadFile(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const fd = new FormData()
    fd.append('avatar', f, f.name)
    setLoading(true)
    try {
      const res = await fetch('/api/upload-avatar', { method: 'POST', credentials: 'same-origin', body: fd })
      const j = await res.json()
      if (j?.path) setAvatarPath(j.path)
      else throw new Error(j?.error || 'Upload failed')
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Upload failed: ' + err.message, type: 'error' } })) } catch (e) {}
    } finally { setLoading(false) }
  }
  async function signOut() {
    setLoading(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
      try { window.dispatchEvent(new Event('closeAdmin')) } catch (e) {}
      window.location.href = '/'
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Sign out failed: ' + err.message, type: 'error' } })) } catch (e) {}
    } finally {
      setLoading(false)
    }
  }

  function closeAdminOnly() {
    try { window.dispatchEvent(new Event('closeAdmin')) } catch (e) {}
    window.location.href = '/'
  }

  return (
    <AdminGate title="Admin Panel" description="Sign in to edit your portfolio AI settings.">
    <div className="site-container">
      <ToastHost />
      <header className="reveal" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: 999, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.45)' }}>
              <Image src={avatarPath} alt="avatar" width={72} height={72} style={{ objectFit: 'cover', display: 'block' }} onError={(e)=>e.currentTarget.style.opacity=0.5} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 800 }}>Admin — Portfolio Guide</h1>
              <div style={{ color: 'var(--accent)', fontWeight: 600 }}>Edit AI system prompt and avatar</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn-ghost" onClick={closeAdminOnly}>Close</button>
            <button className="btn-ghost" onClick={signOut} disabled={loading}>{loading ? 'Signing out…' : 'Sign out'}</button>
            <button className="btn-primary" onClick={save} disabled={loading}>{loading ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <Link href="/admin/projects" className="btn-primary">Manage Projects</Link>
        <Link href="/admin/conversations" className="btn-ghost">Manage Conversations</Link>
      </div>

      <div className="card reveal">
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>AI System Prompt</label>
          <p style={{ color: '#b6b6c8' }}>This prompt is used by the Portfolio Guide AI for chat and recommendations.</p>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: '100%', height: 220, marginTop: 12 }} />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Avatar path (e.g. /profile.jpg)</label>
          <input value={avatarPath} onChange={e => setAvatarPath(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)' }} />
          <div style={{ marginTop: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#b6b6c8' }}>Preview:</p>
            <div style={{ width: 72, height: 72, marginTop: 8, borderRadius: 999, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
              <Image src={avatarPath} alt="avatar preview" width={72} height={72} style={{ objectFit: 'cover', display: 'block' }} onError={(e)=>e.currentTarget.style.opacity=0.5} />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Or upload an image</label>
            <input type="file" accept="image/*" onChange={uploadFile} />
          </div>
        </div>
      </div>
    </div>
    </AdminGate>
  )
}
