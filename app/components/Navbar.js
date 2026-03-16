"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import ToastHost from './ToastHost'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  useEffect(() => {
    function onOpenAdmin() {
      setAdminOpen(true)
    }
    window.addEventListener('openAdmin', onOpenAdmin)
    function onCloseAdmin() {
      setAdminOpen(false)
    }
    window.addEventListener('closeAdmin', onCloseAdmin)
    return () => {
      window.removeEventListener('openAdmin', onOpenAdmin)
      window.removeEventListener('closeAdmin', onCloseAdmin)
    }
  }, [])

  return (
    <>
    <ToastHost />
    <header className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <div className={styles.logoMark}>NK</div>
          <div className={styles.logoText}>My Portfolio</div>
        </Link>

        <nav>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/projects" className={styles.link}>Projects</Link>
            <Link href="/contact" className={styles.cta}>Contact</Link>
          </div>

          <button
            className={styles.hamburger}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileShow : ''}`}>
            <Link href="/" className={styles.link} onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>About</Link>
            <Link href="/projects" className={styles.link} onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/contact" className={styles.cta} onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </nav>
      </div>

      {/* Admin sign-in modal (opened by clicking profile image) */}
      {adminOpen && (
        <div className={styles.adminModalOverlay} onClick={() => setAdminOpen(false)}>
          <div className={styles.adminModal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0 }}>Admin sign in</h3>
            <p style={{ color: '#9aa0b4' }}>Enter the admin password to access the admin area.</p>
            <AdminSignInForm onSuccess={() => { setAdminOpen(false); window.location.href = '/admin' }} />
          </div>
        </div>
      )}
    </header>

      {/* hidden admin trigger removed (using profile/headshot trigger instead) */}
    </>
  )
}

function AdminSignInForm({ onSuccess }) {
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
      const j = await res.json()
      if (j.ok) {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Signed in', type: 'success' } })) } catch (e) {}
        onSuccess && onSuccess()
      } else {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Sign in failed', type: 'error' } })) } catch (e) {}
      }
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Sign in error: ' + err.message, type: 'error' } })) } catch (e) {}
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)' }} />
      <button className="btn-primary" disabled={loading || !pw}>{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
