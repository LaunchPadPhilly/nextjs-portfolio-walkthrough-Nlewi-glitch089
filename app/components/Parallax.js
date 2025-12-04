"use client"

import { useEffect } from 'react'

export default function Parallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = null
    let active = false

    const cosmic = document.querySelector('.cosmic-bg')
    const gradient = document.querySelector('.cosmic-bg .gradient')
    const nebula = document.querySelector('.cosmic-bg .nebula')
    const stars = document.querySelector('.cosmic-bg .stars')
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

    // shooting stars / particles
    let starInterval = null
    function spawnShootingStar() {
      if (!cosmic || !active) return
      const w = window.innerWidth
      const h = window.innerHeight
      // start near right-top quadrant to sweep left-down
      const startX = Math.random() * (w * 0.8) + w * 0.1
      const startY = Math.random() * (h * 0.4)
      const lenX = (Math.random() * 800) + 400 // horizontal travel
      const lenY = (Math.random() * 300) + 200 // vertical travel
      const duration = (Math.random() * 700) + 900 // ms

      const el = document.createElement('div')
      el.className = 'shooting-star trail'
      el.style.left = `${startX}px`
      el.style.top = `${startY}px`
      el.style.width = `${Math.min(320, lenX / 3)}px`
      el.style.setProperty('--dx', `-${lenX}px`)
      el.style.setProperty('--dy', `-${lenY}px`)
      el.style.animation = `shoot ${duration}ms linear both`
      // color trail variations
      el.style.background = `linear-gradient(90deg, rgba(255,255,255,1), rgba(${Math.floor(255*Math.random())},${Math.floor(50+200*Math.random())},${Math.floor(150+100*Math.random())},0.9), transparent)`
      cosmic.appendChild(el)
      // small particle burst at start
      const parts = 3 + Math.floor(Math.random() * 4)
      for (let i=0;i<parts;i++) {
        const p = document.createElement('div')
        p.className = 'particle'
        const px = startX + (Math.random()-0.5)*30
        const py = startY + (Math.random()-0.5)*30
        p.style.left = `${px}px`
        p.style.top = `${py}px`
        p.style.background = `rgba(${200+Math.floor(Math.random()*55)},${50+Math.floor(Math.random()*200)},${150+Math.floor(Math.random()*100)},${0.9 - Math.random()*0.4})`
        const pd = 800 + Math.floor(Math.random()*700)
        p.style.transition = `transform ${pd}ms cubic-bezier(.2,.9,.2,1), opacity ${pd}ms linear`
        cosmic.appendChild(p)
        // trigger particle movement
        requestAnimationFrame(() => {
          p.style.transform = `translate3d(${(Math.random()-0.5)*200}px, ${(Math.random()-0.5)*200}px, 0) scale(${0.4+Math.random()*0.9})`
          p.style.opacity = '0'
        })
        setTimeout(() => { try { p.remove() } catch(e){} }, pd + 80)
      }

      setTimeout(() => { try { el.remove() } catch(e){} }, duration + 80)
    }

    function startStarInterval() {
      if (starInterval) return
      starInterval = setInterval(() => {
        // spawn with random chance and variable timing when active
        if (active && Math.random() > 0.35) spawnShootingStar()
      }, 1200 + Math.random()*2200)
    }

    function stopStarInterval() {
      if (starInterval) {
        clearInterval(starInterval)
        starInterval = null
      }
    }

    // toggle interval based on activity
    const activityObserver = new MutationObserver(() => {
      if (cosmic && cosmic.classList.contains('active')) startStarInterval()
      else stopStarInterval()
    })
    if (cosmic) activityObserver.observe(cosmic, { attributes: true, attributeFilter: ['class'] })

    // start initially if already active
    if (cosmic && cosmic.classList.contains('active')) startStarInterval()

    // cleanup
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
      if (hero) io.unobserve(hero)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      // cleanup intervals and observers
      try { if (starInterval) clearInterval(starInterval) } catch(e) {}
      try { if (activityObserver) activityObserver.disconnect() } catch(e) {}
    }
  }, [])

  return null
}

