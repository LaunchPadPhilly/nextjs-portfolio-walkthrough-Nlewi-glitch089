"use client"

import { useEffect, useState } from 'react'
import AdminSignInForm from './AdminSignInForm'

export default function AdminGate({ children, title = 'Admin Panel', description = 'Sign in to access admin tools.' }) {
  const [status, setStatus] = useState('checking')

  async function refreshStatus() {
    setStatus('checking')
    try {
      const response = await fetch('/api/admin/status', { credentials: 'same-origin', cache: 'no-store' })
      const json = await response.json()
      setStatus(json?.authenticated ? 'authenticated' : 'unauthenticated')
    } catch (e) {
      setStatus('unauthenticated')
    }
  }

  useEffect(() => {
    refreshStatus()
  }, [])

  if (status === 'checking') {
    return (
      <div className="site-container">
        <div className="card" style={{ marginTop: 16 }}>
          <p style={{ margin: 0, color: '#b6b6c8' }}>Checking admin access…</p>
        </div>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return (
      <div className="site-container">
        <div className="card" style={{ marginTop: 16, maxWidth: 520 }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, fontWeight: 800 }}>{title}</h1>
          <p style={{ margin: 0, color: '#b6b6c8' }}>{description}</p>
          <AdminSignInForm onSuccess={refreshStatus} />
        </div>
      </div>
    )
  }

  return children
}
