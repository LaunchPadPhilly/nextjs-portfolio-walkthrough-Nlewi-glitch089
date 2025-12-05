"use client"

import { useEffect, useRef } from 'react'

export default function TitleEffect({ children }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0

    const blobs = []
    // more blobs and slightly larger base sizes for a fuller fill
    for (let i = 0; i < 8; i++) {
      blobs.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.10 + Math.random() * 0.22,
        vx: (Math.random() - 0.5) * 0.0012,
        vy: (Math.random() - 0.5) * 0.0012,
        hue: 250 + i * 24
      })
    }

    // reference to the heading element inside the container (masked text)
    const textEl = container.querySelector('h1') || container.querySelector('h2') || container.querySelector('h3')
    let text = textEl ? (textEl.textContent || '') : ''
    let textFont = '700 48px system-ui'

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      // reset transforms then scale for DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // update font used for masking from the heading's computed style
      if (textEl) {
        const cs = window.getComputedStyle(textEl)
        // build a canvas font string: "weight size family"
        textFont = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
        text = textEl.textContent || ''
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x * width
      const my = mouseRef.current.y * height

      blobs.forEach((b) => {
        // apply subtle attraction to mouse
        const dx = mx - b.x * width
        const dy = my - b.y * height
        // stronger attraction to the pointer for more visible morphing
        b.vx += (dx / Math.max(width, 400)) * 0.0025
        b.vy += (dy / Math.max(height, 400)) * 0.0025

        // damp and move
        b.vx *= 0.96
        b.vy *= 0.96
        b.x += b.vx
        b.y += b.vy

        if (b.x < -0.3) b.x = 1.3
        if (b.x > 1.3) b.x = -0.3
        if (b.y < -0.3) b.y = 1.3
        if (b.y > 1.3) b.y = -0.3

        const gx = b.x * width
        const gy = b.y * height
        const gr = Math.min(width, height) * b.r
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
        g.addColorStop(0, `hsla(${b.hue},90%,60%,0.95)`)
        g.addColorStop(0.35, `hsla(${b.hue},80%,55%,0.45)`)
        g.addColorStop(1, `rgba(0,0,0,0)`)

        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(gx, gy, gr, 0, Math.PI * 2)
        ctx.fill()
      })

      // Now mask the blob layer to the text glyphs: keep only pixels inside text
      if (text) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-in'
        ctx.fillStyle = 'rgba(255,255,255,1)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = textFont
        // draw text centered in the canvas area
        const x = width / 2
        const y = height / 2
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(draw)

    // pointer movement to influence blobs
    function handleMove(e) {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseRef.current.x = Math.max(0, Math.min(1, x))
      mouseRef.current.y = Math.max(0, Math.min(1, y))
    }
    container.addEventListener('pointermove', handleMove)
    container.addEventListener('pointerleave', () => { mouseRef.current = { x: 0.5, y: 0.5 } })

    return () => {
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative w-full h-auto" ref={containerRef}>
      {children}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 mix-blend-screen opacity-95 pointer-events-auto" />
    </div>
  )
}
