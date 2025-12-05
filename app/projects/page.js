"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Projects() {
  const containerRef = useRef(null)
  const [filter, setFilter] = useState('All')

  // static project data
  const projects = [
    {
      id: 'nextstep',
      title: 'NextStep',
      desc:
        "A motivational goal-tracking app that helps users take small, actionable steps toward personal growth. Clean, encouraging UI built to promote daily progress.",
      tech: ['HTML', 'CSS', 'JavaScript'],
      categories: ['Web Apps'],
      href: 'https://next-step-sandy.vercel.app',
      headerGradient: 'linear-gradient(90deg,#ff2d95,#7c3aed)',
      logo: null,
    },
    {
      id: 'playerlobby',
      title: 'PlayerLobby (Coming Soon)',
      desc:
        "A group hangout planner to help friends agree on activities, plan budgets, schedule meetups, and keep everyone on the same page — without the usual back-and-forth.",
      tech: ['React.js', 'CSS'],
      categories: ['Web Apps', 'In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#7c3aed,#ec4899)',
      logo: '/images/playerlobby-wireframe.svg',
    },
    {
      id: 'more',
      title: 'More Coming Soon',
      desc: "I'm actively building new projects. Check back soon for updates.",
      tech: [],
      categories: ['In Progress'],
      href: null,
      headerGradient: 'linear-gradient(90deg,#6b7280,#111827)',
      logo: null,
    },
  ]

  useEffect(() => {
    const revealSelector = '[data-reveal]'
    const visibleClass = 'opacity-100'
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(visibleClass)
      })
    }, { threshold: 0.12 })

    const els = containerRef.current ? containerRef.current.querySelectorAll(revealSelector) : []
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [filter])

  const visibleProjects = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  return (
    <div className="min-h-screen relative">
      {/* Background shapes */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute w-[360px] h-[360px] right-[10%] bottom-[-60px] blur-[60px] opacity-28 bg-gradient-radial from-[#7c3aed] to-[rgba(124,58,237,0.4)]" />
        <div className="absolute w-[420px] h-[420px] left-[6%] bottom-[-120px] blur-[60px] opacity-28 bg-gradient-radial from-[#06b6d4] to-[rgba(6,182,212,0.32)]" />
      </div>

      <div ref={containerRef} className="max-w-[1100px] mx-auto my-10 p-8 relative z-10">
        <header className="mb-4">
          <h1 className="text-[clamp(1.8rem,4.8vw,2.2rem)] font-extrabold text-foreground">My Projects</h1>
          <p className="text-[#00f0ff] font-semibold text-lg mt-2">A look at what I&apos;ve built — and what&apos;s coming next.</p>
        </header>

        <div className="flex gap-3 mb-6 flex-wrap">
          {['All', 'Web Apps', 'In Progress'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-full font-bold cursor-pointer transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-[rgba(155,92,255,0.10)] to-[rgba(0,240,255,0.04)] text-foreground border border-[rgba(161,75,255,0.08)]'
                  : 'bg-transparent border border-[rgba(255,255,255,0.04)] text-[#b6b6c8] hover:bg-[rgba(255,255,255,0.02)]'
              }`}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-7 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((p) => (
            <div 
              key={p.id} 
              data-reveal
              className="opacity-0 translate-y-3 transition-all duration-600 rounded-[var(--radius)] overflow-hidden bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] hover:translate-y-[-10px] hover:scale-[1.01] hover:shadow-[0_40px_120px_rgba(161,75,255,0.12),0_14px_64px_rgba(161,75,255,0.06),0_0_32px_rgba(161,75,255,0.08)] hover:border-[rgba(161,75,255,0.16)] flex flex-col min-h-[320px]"
            >
              <div 
                className="h-[140px] flex items-center justify-center text-white font-extrabold text-[1.15rem] relative"
                style={{ background: p.headerGradient }}
              >
                {p.logo ? (
                  <Image src={p.logo} alt={`${p.title} logo`} width={48} height={48} className="w-auto h-[60%] object-contain" />
                ) : (
                  <span className="text-white font-extrabold text-[1.25rem] tracking-[-0.02em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{p.title}</span>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-[1.25rem] font-extrabold text-foreground m-0">{p.title}</h3>
                <p className="text-[#b6b6c8] text-[0.98rem] leading-[1.6]">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span 
                      key={t} 
                      className="px-3 py-2 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.06)] to-[rgba(161,75,255,0.04)] text-foreground font-bold text-[0.88rem] border border-[rgba(161,75,255,0.06)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  {p.href ? (
                    <a 
                      href={p.href} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-block bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-3 py-2 rounded-lg text-sm font-bold no-underline hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-[0_20px_48px_rgba(79,70,229,0.18),0_8px_28px_rgba(6,182,212,0.08)] transition-all duration-220"
                    >
                      View Project
                    </a>
                  ) : (
                    <span className="inline-block bg-[rgba(255,255,255,0.02)] text-[#b6b6c8] px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.03)]">Coming Soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
