"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    // track observed elements so we don't repeatedly observe the same node
    const seen = new WeakSet()

    function observeAll() {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (!seen.has(el)) {
          observer.observe(el)
          seen.add(el)
        }
      })
    }

    observeAll()

    // watch for DOM changes so newly-rendered reveal elements are observed
    const mo = new MutationObserver((mutations) => {
      let added = false
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) { added = true; break }
      }
      if (added) observeAll()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      try { mo.disconnect() } catch (e) {}
      observer.disconnect()
    }
  }, [pathname])

  return null
}
