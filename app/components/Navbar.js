"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Navbar.module.css'
import ToastHost from './ToastHost'
import AdminSignInForm from './AdminSignInForm'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  useEffect(() => {
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
            <Link href="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/projects" className={styles.link} onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link href="/contact" className={styles.cta} onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </nav>
      </div>

      {/* Admin sign-in modal (opened by clicking profile image) */}
      {adminOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.adminModalOverlay} onClick={() => setAdminOpen(false)}>
          <div className={styles.adminModal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0 }}>Admin sign in</h3>
            <p style={{ color: '#9aa0b4' }}>Enter the admin password to access the admin area.</p>
            <AdminSignInForm onSuccess={() => { setAdminOpen(false); window.location.href = '/admin' }} onCancel={() => setAdminOpen(false)} compact />
          </div>
        </div>,
        document.body
      )}
    </header>

      {/* hidden admin trigger removed (using profile/headshot trigger instead) */}
    </>
  )
}
