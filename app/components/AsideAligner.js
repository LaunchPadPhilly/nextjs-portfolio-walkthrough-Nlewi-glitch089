"use client"

import { useEffect, useRef } from 'react'

export default function AsideAligner({ children, selector = '.grid-two section .card', offset = 0 }) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const lastSetRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = ref.current
    if (!container) return

    function computeAndApply() {
      try {
        const mainEl = document.querySelector(selector)
        if (!mainEl) {
          if (container.style.marginTop) container.style.marginTop = ''
          return
        }

        const mainRect = mainEl.getBoundingClientRect()
        const parent = container.parentElement || container
        const parentRect = parent.getBoundingClientRect()

        // desired margin so the top of the aside aligns with the top of the main card
        const desired = Math.max(0, Math.round(mainRect.top - parentRect.top + offset))

        const current = parseInt(container.style.marginTop || '0', 10)
        // avoid tiny updates that can cause layout thrash
        if (Number.isNaN(current) || Math.abs(current - desired) > 2) {
          container.style.marginTop = desired + 'px'
          lastSetRef.current = desired
        }
      } catch (e) {
        // on error, clear margin to avoid stuck state
        container.style.marginTop = ''
      }
    }

    function scheduleUpdate() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        computeAndApply()
        rafRef.current = null
      })
    }

    // observe the main card size changes so we re-align when content shifts
    const mainEl = document.querySelector(selector)
    const ro = mainEl ? new ResizeObserver(scheduleUpdate) : null
    if (ro && mainEl) ro.observe(mainEl)

    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })

    // initial align
    scheduleUpdate()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('scroll', scheduleUpdate)
      if (ro) ro.disconnect()
    }
  }, [selector, offset])

  return <div ref={ref}>{children}</div>
}
