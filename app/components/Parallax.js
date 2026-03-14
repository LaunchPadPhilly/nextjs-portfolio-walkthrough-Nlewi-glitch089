"use client"

import { useEffect } from 'react'

export default function Parallax({ cosmicRef }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = null
    let active = false

    const cosmic = cosmicRef && cosmicRef.current ? cosmicRef.current : document.querySelector('.cosmic-bg')
    const gradient = cosmic ? cosmic.querySelector('.gradient') : document.querySelector('.cosmic-bg .gradient')
    const nebula = cosmic ? cosmic.querySelector('.nebula') : document.querySelector('.cosmic-bg .nebula')
    const stars = cosmic ? cosmic.querySelector('.stars') : document.querySelector('.cosmic-bg .stars')
    const hero = document.querySelector('.hero')

    // multipliers — make these stronger for more intense effect
    const scrollMul = { gradient: 0.06, nebula: 0.12, stars: 0.03 }
    const mouseMul = { gradient: 0.02, nebula: 0.04, stars: 0.01 }

    function setActive(on) {
      active = on
      if (cosmic) {
        cosmic.classList.toggle('active', !!on)
      }
    }

    function updateTransforms({ scrollY = window.scrollY || window.pageYOffset, mouseX = 0, mouseY = 0 } = {}) {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (gradient) gradient.style.transform = `translate3d(${(mouseX - 0.5) * 100 * mouseMul.gradient}px, ${scrollY * scrollMul.gradient}px, 0) scale(1.02)`
        if (nebula) nebula.style.transform = `translate3d(${(mouseX - 0.5) * 140 * mouseMul.nebula}px, ${scrollY * scrollMul.nebula}px, 0) scale(1.04)`
        if (stars) stars.style.transform = `translate3d(${(mouseX - 0.5) * 60 * mouseMul.stars}px, ${-scrollY * scrollMul.stars}px, 0)`
      })
    }

    // Only enable when hero is visible and document is visible
    const io = new IntersectionObserver((entries) => {
      const e = entries[0]
      if (e && e.isIntersecting) {
        setActive(true)
        // initial update
        updateTransforms({ scrollY: window.scrollY || window.pageYOffset })
      } else {
        setActive(false)
      }
    }, { threshold: 0.1 })

    if (hero) io.observe(hero)

    const onScroll = () => {
      if (!active) return
      updateTransforms({ scrollY: window.scrollY || window.pageYOffset })
    }

    const onMouse = (e) => {
      if (!active) return
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      updateTransforms({ scrollY: window.scrollY || window.pageYOffset, mouseX: x, mouseY: y })
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') setActive(false)
      else if (hero && hero.getBoundingClientRect().top < window.innerHeight) setActive(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    document.addEventListener('visibilitychange', onVisibility)

    // Stable lines effect replaces transient shooting stars — no runtime spawns.

    // cleanup
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
      if (hero) io.unobserve(hero)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      // nothing more to cleanup for removed shooting-star logic
    }
  }, [cosmicRef])

  return null
}

