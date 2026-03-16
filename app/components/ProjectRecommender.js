"use client"

import { useState, useEffect } from 'react'

export default function ProjectRecommender() {
  const [step, setStep] = useState(0)
  const [interest, setInterest] = useState('')
  const [result, setResult] = useState(null)
  const [pulse, setPulse] = useState(false)
  const options = ['UX Design', 'AI Projects', 'Social Impact', 'Web Development']

  async function submit() {
    setResult('Thinking...')
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: [interest] }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.recommendation)
    } catch (err) {
      setResult('Error: ' + err.message)
    }
    setStep(2)
  }

  useEffect(() => {
    if (interest) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 520)
      return () => clearTimeout(t)
    }
  }, [interest])

  return (
    <div style={{ marginBottom: '1rem' }}>
      {step === 0 && (
        <button className="btn-ghost" onClick={() => setStep(1)}>Help me pick a project to explore</button>
      )}

      {step === 1 && (
        <div style={{ marginTop: '0.5rem' }}>
          <div className="recommender-options">
            {options.map(o => (
              <button key={o} onClick={() => setInterest(o)} className={interest === o ? 'pill active' : 'pill'}>{o}</button>
            ))}
          </div>

          <div className="recommender-actions">
            <button className={"btn-primary" + (pulse ? ' pulse' : '')} onClick={submit} disabled={!interest} aria-disabled={!interest}>Go</button>
            <button className="btn-ghost" onClick={() => setStep(0)}>Cancel</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ whiteSpace: 'pre-wrap' }}>{result}</div>
          <div style={{ marginTop: '0.5rem' }}>
            <button className="btn-ghost" onClick={() => { setStep(0); setResult(null); setInterest('') }}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
