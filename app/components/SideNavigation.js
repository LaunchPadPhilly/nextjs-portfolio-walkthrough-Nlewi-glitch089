"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const NAV_ITEMS = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '👤', label: 'About', href: '/about' },
  { icon: '📦', label: 'Projects', href: '/projects' },
  { icon: '💌', label: 'Contact', href: '/contact' },
]

export default function SideNavigation() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav className={`side-nav ${collapsed ? 'collapsed' : ''}`}>
      <div className="side-nav-header">
        <h1 className="side-nav-title">Portfolio</h1>
      </div>

      <div className="side-nav-menu">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="nav-toggle"
        aria-label="Toggle navigation"
      >
        {collapsed ? '→' : '←'}
      </button>
    </nav>
  )
}
