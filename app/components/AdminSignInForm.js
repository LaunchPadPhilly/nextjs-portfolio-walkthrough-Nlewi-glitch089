"use client"

import { useState } from 'react'

export default function AdminSignInForm({ onSuccess, onCancel, compact = false }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loginResponse = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const loginJson = await loginResponse.json()
      if (!loginResponse.ok || !loginJson.ok) {
        const message = loginJson?.error || 'Sign in failed'
        setError(message)
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'error' } })) } catch (e) {}
        return
      }

      const statusResponse = await fetch('/api/admin/status', { credentials: 'same-origin', cache: 'no-store' })
      const statusJson = await statusResponse.json()
      if (!statusJson?.authenticated) {
        const message = 'Sign in did not persist. Try again or clear site cookies.'
        setError(message)
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'error' } })) } catch (e) {}
        return
      }

      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Signed in', type: 'success' } })) } catch (e) {}
      setPassword('')
      onSuccess && onSuccess()
    } catch (err) {
      const message = 'Sign in error: ' + err.message
      setError(message)
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'error' } })) } catch (e) {}
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ marginTop: compact ? 8 : 16, display: 'grid', gap: 10 }}>
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Admin password"
        style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
      />
      {error && <p style={{ margin: 0, color: '#ffb4b4', fontSize: 13 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn-primary" disabled={loading || !password}>{loading ? 'Signing in…' : 'Sign in'}</button>
        {onCancel && <button type="button" className="btn-ghost" onClick={onCancel} disabled={loading}>Cancel</button>}
      </div>
    </form>
  )
}
