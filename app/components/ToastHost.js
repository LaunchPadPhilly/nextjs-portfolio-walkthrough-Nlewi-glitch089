"use client"

import { useEffect, useState } from 'react'

export default function ToastHost() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    function onShow(e) {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2,6)
      const { message = '', type = 'info', duration = 3000 } = e?.detail || {}
      setToasts(t => [...t, { id, message, type }])
      setTimeout(() => {
        setToasts(t => t.filter(x => x.id !== id))
      }, duration)
    }
    window.addEventListener('showToast', onShow)
    return () => window.removeEventListener('showToast', onShow)
  }, [])

  if (!toasts.length) return null

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 2000 }}>
      {toasts.map(t => (
        <div key={t.id} style={{ minWidth: 200, maxWidth: 360, padding: '10px 14px', borderRadius: 10, color: '#05010a', background: t.type === 'error' ? 'linear-gradient(90deg,#ff7a7a,#ffb3b3)' : 'linear-gradient(90deg,#8b5cf6,#06b6d4)', boxShadow: '0 10px 40px rgba(0,0,0,0.45)', fontWeight: 700 }}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
