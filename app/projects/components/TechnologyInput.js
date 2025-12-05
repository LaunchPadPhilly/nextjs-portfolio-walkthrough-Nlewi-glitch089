"use client"

import React, { useState } from 'react'

export default function TechnologyInput({ technologies = [], onChange }) {
  const [input, setInput] = useState('')

  const predefined = ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS']

  function addTech(value) {
    const v = value.trim()
    if (!v) return
    if (technologies.includes(v)) return
    const next = [...technologies, v]
    onChange && onChange(next)
    setInput('')
  }

  function removeAt(index) {
    const next = technologies.filter((_, i) => i !== index)
    onChange && onChange(next)
  }

  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <input
          placeholder="Type a technology and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTech(input)
            }
          }}
          className="flex-1 px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors"
        />
        <button
          type="button"
          onClick={() => addTech(input)}
          className="px-4 py-2 rounded-md bg-[rgba(0,240,255,0.10)] text-[#00f0ff] font-semibold hover:bg-[rgba(0,240,255,0.15)] transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {predefined.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => addTech(p)}
            disabled={technologies.includes(p)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
              technologies.includes(p)
                ? 'bg-[rgba(161,75,255,0.20)] text-[#a14bff] cursor-not-allowed opacity-60'
                : 'bg-[rgba(0,240,255,0.08)] text-[#00f0ff] hover:bg-[rgba(0,240,255,0.15)]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(255,255,255,0.03)]">
          {technologies.map((t, i) => (
            <div
              key={t}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground text-sm font-semibold border border-[rgba(161,75,255,0.10)]"
            >
              <span>{t}</span>
              <button
                type="button"
                aria-label={`Remove ${t}`}
                onClick={() => removeAt(i)}
                className="text-[#ff3bd6] hover:text-red-500 font-bold transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
