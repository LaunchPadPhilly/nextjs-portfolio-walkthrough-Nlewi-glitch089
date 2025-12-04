"use client"

import React, { useState } from 'react'

export default function TechnologyInput({ technologies = [], onChange }) {
  const [input, setInput] = useState('')

  const predefined = ['JavaScript', 'React', 'Next.js']

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
    <div>
      <div>
        <input
          placeholder="Type a technology"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTech(input)
            }
          }}
        />
        <button onClick={() => addTech(input)}>Add</button>
      </div>

      <div>
        {predefined.map((p) => (
          <button
            key={p}
            onClick={() => addTech(p)}
            disabled={technologies.includes(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div>
        {technologies.map((t, i) => (
          <div key={t}>
            <span>{t}</span>
            <button aria-label={`Remove ${t}`} onClick={() => removeAt(i)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
