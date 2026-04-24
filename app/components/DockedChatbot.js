"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const DEFAULT_AVATAR_PATH = '/download.png'

export default function DockedChatbot() {
  const [collapsed, setCollapsed] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [avatarPath, setAvatarPath] = useState(DEFAULT_AVATAR_PATH)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [
            { role: 'system', content: `You are Nakerra Lewis's AI portfolio guide and should speak in first person as Nakerra. Answer questions about projects, skills, interests in UX, game design, and interactive media. Keep answers concise, natural, and confident.` },
            ...messages,
            userMessage
          ]
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      const aiMessage = { role: 'assistant', content: data.reply || 'Sorry, I had trouble answering that.' }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = { role: 'assistant', content: 'Error: Unable to get response' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`docked-chat ${collapsed ? 'collapsed' : ''}`}>
      <div className="docked-chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <Image 
            src={avatarPath || DEFAULT_AVATAR_PATH} 
            alt="Nakerra" 
            width={32} 
            height={32} 
            style={{ borderRadius: '50%' }}
            onError={() => setAvatarPath(DEFAULT_AVATAR_PATH)}
          />
          <h3 className="docked-chat-title">Ask AI</h3>
        </div>
        <button 
          className="docked-chat-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand chat' : 'Collapse chat'}
        >
          {collapsed ? '💬' : '✕'}
        </button>
      </div>

      <div className="docked-chat-messages">
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '1rem' }}>
            <p style={{ fontSize: '0.9rem' }}>Ask me about my work or projects</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`docked-chat-message ${msg.role}`}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="docked-chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? '...' : '→'}
        </button>
      </form>
    </div>
  )
}
