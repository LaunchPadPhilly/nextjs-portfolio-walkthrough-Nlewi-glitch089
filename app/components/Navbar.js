"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] border-b border-[rgba(255,255,255,0.03)] px-5 py-3 sticky top-0 z-40">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-[color:var(--foreground)] no-underline" aria-label="Home">
          <div className="w-11 h-11 rounded-md grid place-items-center font-bold text-[#05010a] bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-magenta)] shadow-[0_6px_18px_rgba(0,229,255,0.08),0_2px_6px_rgba(155,92,255,0.06)]">NK</div>
          <div className="font-semibold tracking-wide">My Portfolio</div>
        </Link>

        <nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md hover:text-[color:var(--foreground)] hover:bg-[rgba(255,255,255,0.02)]">Home</Link>
            <Link href="/about" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md hover:text-[color:var(--foreground)] hover:bg-[rgba(255,255,255,0.02)]">About</Link>
            <Link href="/projects" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md hover:text-[color:var(--foreground)] hover:bg-[rgba(255,255,255,0.02)]">Projects</Link>
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] text-[#05010a] font-semibold px-3 py-1 rounded-md shadow-md no-underline">Contact</Link>
          </div>

          <button
            className="md:hidden bg-transparent border-none text-[color:var(--foreground)] cursor-pointer p-2"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? '✕' : '☰'}
          </button>

          <div className={`${open ? 'flex' : 'hidden'} flex-col gap-2 mt-2 md:hidden`}> 
            <Link href="/" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md" onClick={() => setOpen(false)}>About</Link>
            <Link href="/projects" className="text-[color:var(--muted)] no-underline px-2 py-1 rounded-md" onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] text-[#05010a] font-semibold px-3 py-1 rounded-md no-underline" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
