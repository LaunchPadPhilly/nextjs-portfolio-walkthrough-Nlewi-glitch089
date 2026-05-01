"use client"

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import AdminSignInForm from './AdminSignInForm'

const adminModalStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    background: 'linear-gradient(180deg, rgba(6,6,10,0.94), rgba(12,12,18,0.95))',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
  },
}

export default function AdminModalProvider() {
  const [adminOpen, setAdminOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function onOpenAdmin() {
      try {
        const res = await fetch('/api/admin/status', { credentials: 'same-origin', cache: 'no-store' })
        const j = await res.json()
        if (j?.authenticated) {
          window.location.href = '/admin'
          return
        }
      } catch (e) {}
      setAdminOpen(true)
    }

    function onCloseAdmin() {
      setAdminOpen(false)
    }

    window.addEventListener('openAdmin', onOpenAdmin)
    window.addEventListener('closeAdmin', onCloseAdmin)

    return () => {
      window.removeEventListener('openAdmin', onOpenAdmin)
      window.removeEventListener('closeAdmin', onCloseAdmin)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {adminOpen && typeof document !== 'undefined' && createPortal(
        <div style={adminModalStyles.overlay} onClick={() => setAdminOpen(false)}>
          <div style={adminModalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px 0', color: '#e6f7ff' }}>Admin sign in</h3>
            <p style={{ color: '#9aa0b4', margin: '0 0 16px 0', fontSize: '14px' }}>Enter the admin password to access the admin area.</p>
            <AdminSignInForm onSuccess={() => { setAdminOpen(false); window.location.href = '/admin' }} onCancel={() => setAdminOpen(false)} compact />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
