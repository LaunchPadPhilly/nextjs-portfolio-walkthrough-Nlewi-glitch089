"use client"

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ChatWidget.module.css'
import Image from 'next/image'

const DEFAULT_AVATAR_PATH = '/download.png'
const EDGE_PADDING = 16
const BUBBLE_SIZE = 56
const DEFAULT_PANEL_WIDTH = 380
const DEFAULT_PANEL_HEIGHT = 560

function normalizeAvatarPath(path) {
  if (!path || typeof path !== 'string') return DEFAULT_AVATAR_PATH
  return path.startsWith('/') ? path : `/${path}`
}

const DEFAULT_SYSTEM_PROMPT = `You are Nakerra Lewis's AI portfolio guide and should speak in first person as Nakerra.

Answer questions about:
- My projects
- My skills
- My interests in UX, game design, and interactive media
- My portfolio work

Response style rules:
- If asked "What do you do?", "What's your experience?", or any "you/your" question, answer as me in first person.
- Keep answers concise, natural, and confident.
- Do not describe me as "she" unless explicitly asked for third-person bio copy.

When appropriate, recommend which project the visitor should view next.`

export default function ChatWidget() {
  const [portalMounted, setPortalMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'system', content: DEFAULT_SYSTEM_PROMPT }])
  const [loading, setLoading] = useState(false)
  const [avatarPath, setAvatarPath] = useState(DEFAULT_AVATAR_PATH)
  const [sessionId, setSessionId] = useState(null)

  const endRef = useRef(null)
  const audioCtxRef = useRef(null)
  const typingIntervalRef = useRef(null)
  // Dragging removed — widget will be static anchored to viewport

  useEffect(() => {
    // Mount a client-side portal to ensure fixed positioning is relative to the
    // viewport (not to any transformed parent elements that can appear in prod).
    setPortalMounted(true)
    // No persistence: ensure widget always uses the code-defined anchor

    ;(async () => {
      try {
        const response = await fetch('/api/context')
        if (response.ok) {
          const json = await response.json()
          setAvatarPath(normalizeAvatarPath(json?.avatarPath))
        }
      } catch (e) {}

      try {
        const sid = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9)
        setSessionId(sid)
      } catch (e) {}
    })()

    function onContextUpdated(event) {
      try {
        const nextPath = event?.detail?.avatarPath
        if (nextPath) {
          setAvatarPath(normalizeAvatarPath(nextPath))
          return
        }
        fetch('/api/context')
          .then(response => response.json())
          .then(json => { setAvatarPath(normalizeAvatarPath(json?.avatarPath)) })
          .catch(() => {})
      } catch (err) {}
    }

    window.addEventListener('contextUpdated', onContextUpdated)
    return () => window.removeEventListener('contextUpdated', onContextUpdated)
  }, [])

  // No persistence — keep widget static

  // Restrict dragging to visible area only
  // dragging removed — no pointer listeners

  useEffect(() => {
    if (open && endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function startTypingSound() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const context = audioCtxRef.current
      if (typingIntervalRef.current) return
      typingIntervalRef.current = setInterval(() => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(880, context.currentTime)
        gain.gain.setValueAtTime(0.0001, context.currentTime)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start()
        gain.gain.exponentialRampToValueAtTime(0.02, context.currentTime + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12)
        oscillator.stop(context.currentTime + 0.14)
      }, 160)
    } catch (e) {}
  }

  function stopTypingSound() {
    try {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
    } catch (e) {}
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

    const userMessage = { role: 'user', content: userText }
    const placeholder = { role: 'assistant', content: '', pending: true }
    setMessages(prev => [...prev, userMessage, placeholder])
    setInput('')
    setLoading(true)
    startTypingSound()

    try {
      const conversationForApi = [...messages.filter(message => message.role !== 'system' && !message.pending), userMessage]
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationForApi }),
      })
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'AI service error')
      }
      const data = await response.json()
      const reply = data?.reply ?? 'Sorry, I had trouble answering that.'

      setMessages(prev => {
        const nextMessages = [...prev]
        const lastIndex = nextMessages.length - 1
        if (lastIndex >= 0 && nextMessages[lastIndex].pending) {
          nextMessages[lastIndex] = { role: 'assistant', content: reply }
        } else {
          nextMessages.push({ role: 'assistant', content: reply })
        }
        return nextMessages
      })
    } catch (err) {
      setMessages(prev => {
        const nextMessages = [...prev]
        const lastIndex = nextMessages.length - 1
        const errorMessage = { role: 'assistant', content: 'Error: ' + (err?.message || 'unknown') }
        if (lastIndex >= 0 && nextMessages[lastIndex].pending) nextMessages[lastIndex] = errorMessage
        else nextMessages.push(errorMessage)
        return nextMessages
      })
    } finally {
      stopTypingSound()
      setLoading(false)
    }
  }

  async function saveConversation() {
    if (!sessionId) return
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, messages }),
      })
      const json = await response.json()
      if (json.ok) {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Conversation saved', type: 'success' } })) } catch (e) {}
      } else {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save failed: ' + (json.error || 'unknown'), type: 'error' } })) } catch (e) {}
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
      const link = document.createElement('a')
      link.href = url
      link.download = `conversation-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Download failed: ' + err.message, type: 'error' } })) } catch (e) {}
    }
  }

  function clearConversation() {
    setMessages([{ role: 'system', content: DEFAULT_SYSTEM_PROMPT }])
    try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Cleared', type: 'info' } })) } catch (e) {}
  }

  function beginDrag() {
    // no-op: dragging disabled
    return
  }

  function toggleOpen() {
    setOpen(current => !current)
  }

  // Don't render until portal is mounted to avoid hydration issues
  if (!portalMounted) return null

  const jsx = (
    <div className={styles.wrapper}>
      {!open && (
        <button className={styles.bubble} onClick={toggleOpen} aria-label="Ask AI">
          <span>✨</span>
          <span className={styles.bubbleLabel}>Ask AI</span>
        </button>
      )}

      {open && (
        <div
          className={`${styles.panel} ${styles.open}`}
          role="dialog"
          aria-hidden={!open}
        >
          <div className={styles.header}>
            <div className={styles.headerAvatar}>
              <div className={styles.avatar} aria-hidden>
                <Image src={avatarPath || DEFAULT_AVATAR_PATH} alt="avatar" width={40} height={40} className={styles.avatarImg} onError={() => setAvatarPath(DEFAULT_AVATAR_PATH)} />
              </div>
              <div>
                <div><strong>Nakerra&apos;s AI Guide</strong></div>
                <div className={styles.headerSubtitle}>Ask about my projects, skills, or experience</div>
              </div>
            </div>
            <div className={styles.headerControls}>
              <button className={styles.iconBtn} title="Save conversation" onClick={saveConversation}>💾</button>
              <button className={styles.iconBtn} title="Download conversation" onClick={downloadConversation}>⬇️</button>
              <button className={styles.iconBtn} title="Clear conversation" onClick={clearConversation}>🗑️</button>
              <button className={styles.iconBtn} title="Close" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          <div className={styles.history}>
            {messages.filter(message => message.role !== 'system').length === 0 ? (
              <div className={styles.greeting}>
                <div className={styles.greetAvatar}>
                  <Image src={avatarPath || DEFAULT_AVATAR_PATH} alt="avatar" width={72} height={72} className={styles.avatarImg} onError={() => setAvatarPath(DEFAULT_AVATAR_PATH)} />
                </div>
                <h3>Hey there, ask me anything</h3>
                <p className={styles.greetSubtitle}>I can tell you about my work, projects, or how to hire me.</p>
                <div className={styles.quickBtns}>
                  {['What do you do?', "What's your experience?", 'Tell me about Nerd Street CRM'].map(question => (
                    <button key={question} className={styles.quick} onClick={() => sendMessage(question)}>{question}</button>
                  ))}
                </div>
              </div>
            ) : (
              messages
                .filter(message => message.role !== 'system')
                .map((message, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: 12, maxWidth: '100%' }}
                    className={message.role === 'user' ? styles.user : (message.pending ? `${styles.ai} ${styles.pending}` : styles.ai)}
                  >
                    {message.pending ? (
                      <span className={styles.ellipsis}><span>.</span><span>.</span><span>.</span></span>
                    ) : (
                      message.content
                    )}
                  </div>
                ))
            )}
            <div ref={endRef} />
          </div>

          <form className={styles.form} onSubmit={sendMessage}>
            <input
              aria-label="Ask about my work"
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} className={styles.sendBtn} aria-label="Send">✈</button>
          </form>
          <div className={styles.footer}>Powered by AI</div>
        </div>
      )}
    </div>
  )

  return createPortal(jsx, typeof document !== 'undefined' ? document.body : null)
}
