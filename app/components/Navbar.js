"use client"

import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
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
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? '✕' : '☰'}
          </button>

          <div className={`${styles.mobileMenu} ${open ? styles.mobileShow : ''}`}>
            <Link href="/" className={styles.link} onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>About</Link>
            <Link href="/projects" className={styles.link} onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/contact" className={styles.cta} onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
