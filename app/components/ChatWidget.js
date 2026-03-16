"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatWidget.module.css'
import Image from 'next/image'

const DEFAULT_SYSTEM_PROMPT = `You are an AI assistant helping visitors explore Nakerra Lewis's portfolio.

Answer questions about:
- Her projects
- Her skills
- Her interests in UX, game design, and interactive media
- Her portfolio work

When appropriate, recommend which project the visitor should view next.`

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'system', content: DEFAULT_SYSTEM_PROMPT }])
  const [loading, setLoading] = useState(false)
  const [avatarPath, setAvatarPath] = useState('/profile.jpg')
  const [sessionId, setSessionId] = useState(null)

  const endRef = useRef(null)
  const audioCtxRef = useRef(null)
  const typingIntervalRef = useRef(null)

  useEffect(() => {
    // load avatar config and previous messages on mount
    (async () => {
      try {
        const r = await fetch('/api/context')
        if (r.ok) {
          const j = await r.json()
          if (j?.avatarPath) setAvatarPath(j.avatarPath)
        }
      } catch (e) {}

      try {
        // generate session id (used if user chooses to save)
        let sid = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9)
        setSessionId(sid)
        // do NOT auto-load previous conversations — chat is ephemeral until explicitly saved
      } catch (e) {}
    })()
    function onContextUpdated(e) {
      try {
        const p = e?.detail?.avatarPath
        if (p) setAvatarPath(p)
        else {
          // fallback: re-fetch context
          fetch('/api/context').then(r => r.json()).then(j => { if (j?.avatarPath) setAvatarPath(j.avatarPath) }).catch(() => {})
        }
      } catch (err) {}
    }
    window.addEventListener('contextUpdated', onContextUpdated)
    return () => window.removeEventListener('contextUpdated', onContextUpdated)
  }, [])

  // do not auto-persist messages; provide explicit save/download controls

  useEffect(() => {
    if (open && endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function startTypingSound() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioCtxRef.current
      if (typingIntervalRef.current) return
      typingIntervalRef.current = setInterval(() => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.setValueAtTime(880, ctx.currentTime)
        g.gain.setValueAtTime(0.0001, ctx.currentTime)
        o.connect(g)
        g.connect(ctx.destination)
        o.start()
        g.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 0.01)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
        o.stop(ctx.currentTime + 0.14)
      }, 160)
    } catch (e) {}
  }

  function stopTypingSound() {
    try { if (typingIntervalRef.current) { clearInterval(typingIntervalRef.current); typingIntervalRef.current = null } } catch (e) {}
  }

  async function sendMessage(eOrText) {
    if (!eOrText) return
    let userText = ''
    if (typeof eOrText === 'string') {
      userText = eOrText.trim()
    } else {
      eOrText.preventDefault()
      userText = input.trim()
    }
    if (!userText) return

    const userMsg = { role: 'user', content: userText }
    const placeholder = { role: 'assistant', content: '', pending: true }
    const next = [...messages, userMsg, placeholder]
    setMessages(next)
    setInput('')
    setLoading(true)
    startTypingSound()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'AI service error')
      }
      const data = await res.json()
      const ai = data?.reply ?? 'Sorry, I had trouble answering that.'

      setMessages(prev => {
        const copy = [...prev]
        const last = copy.length - 1
        if (last >= 0 && copy[last].pending) {
          copy[last] = { role: 'assistant', content: ai }
        } else {
          copy.push({ role: 'assistant', content: ai })
        }
        return copy
      })
    } catch (err) {
      setMessages(prev => {
        const copy = [...prev]
        const last = copy.length - 1
        const msg = { role: 'assistant', content: 'Error: ' + (err?.message || 'unknown') }
        if (last >= 0 && copy[last].pending) copy[last] = msg
        else copy.push(msg)
        return copy
      })
    } finally {
      stopTypingSound()
      setLoading(false)
    }
  }

  async function saveConversation() {
    if (!sessionId) return
    try {
      const res = await fetch('/api/conversations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, messages }) })
      const j = await res.json()
      if (j.ok) {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Conversation saved', type: 'success' } })) } catch (e) {}
      } else {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save failed: ' + (j.error || 'unknown'), type: 'error' } })) } catch (e) {}
      }
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save error: ' + err.message, type: 'error' } })) } catch (e) {}
    }
  }

  function downloadConversation() {
    try {
      const payload = { messages }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `conversation-${new Date().toISOString().replace(/[:.]/g,'-')}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Download failed: ' + err.message, type: 'error' } })) } catch (e) {}
    }
  }

  function clearConversation() {
    setMessages([{ role: 'system', content: DEFAULT_SYSTEM_PROMPT }])
    try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Cleared', type: 'info' } })) } catch (e) {}
  }

  return (
    <>
      <div>
        <button className={styles.bubble} onClick={() => setOpen(v => !v)} aria-label="Open chat">🤖</button>
      </div>

      {open && (
        <div className={`${styles.panel} ${open ? styles.open : ''}`} role="dialog" aria-hidden={!open}>
          <div className={styles.header}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className={styles.avatar} aria-hidden>
                <Image src={avatarPath || '/profile.jpg'} alt="avatar" width={40} height={40} className={styles.avatarImg} />
              </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong>Nakerra\u0027s AI Guide</strong>
                <small style={{ color: 'rgba(255,255,255,0.6)' }}>Ask about projects, skills, or hiring</small>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className={styles.iconBtn} title="Save conversation" onClick={saveConversation}>💾</button>
              <button className={styles.iconBtn} title="Download conversation" onClick={downloadConversation}>⬇️</button>
              <button className={styles.iconBtn} title="Clear conversation" onClick={clearConversation}>🗑️</button>
              <button className={styles.iconBtn} title="Close" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.history}>
            {messages.filter(m => m.role !== 'system').length === 0 ? (
              <div className={styles.greeting}>
                <div className={styles.greetAvatar}>
                  <Image src={avatarPath || '/profile.jpg'} alt="avatar" width={72} height={72} className={styles.avatarImg} />
                </div>
                <h3>Hey there, ask me anything</h3>
                <p className={styles.greetSubtitle}>I can tell you about my work, projects, or how to hire me.</p>
                <div className={styles.quickBtns}>
                  {['What do you do?', 'What\u0027s your experience?', 'Tell me about Nerd Street CRM'].map(q => (
                    <button key={q} className={styles.quick} onClick={() => sendMessage(q)}>{q}</button>
                  ))}
                </div>
              </div>
            ) : (
              messages.filter(m => m.role !== 'system').map((m, i) => (
                <div key={i} style={{ marginBottom: 12, maxWidth: '100%' }} className={m.role === 'user' ? styles.user : (m.pending ? `${styles.ai} ${styles.pending}` : styles.ai)}>
                  {m.pending ? (
                    <span className={styles.ellipsis}><span>.</span><span>.</span><span>.</span></span>
                  ) : (
                    m.content
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className={styles.typing} style={{ marginTop: 8 }}>
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className={styles.form} onSubmit={(e) => sendMessage(e)}>
            <input
              aria-label="Ask about my work"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={loading ? 'Thinking...' : 'Type a message...'}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} className={styles.sendBtn} aria-label="Send">✈</button>
          </form>
          <div className={styles.footer}>Powered by AI</div>
        </div>
      )}
    </>
  )
}
