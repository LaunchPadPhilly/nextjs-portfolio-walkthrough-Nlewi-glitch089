"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminGate from '../../components/AdminGate'

export default function AdminConversations() {
  const [convs, setConvs] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [editMessages, setEditMessages] = useState([])
  const [editLoading, setEditLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/conversations/list', { credentials: 'same-origin' })
      const j = await res.json()
      setConvs(j.conversations || [])
    } catch (e) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Failed to load: ' + e.message, type: 'error' } })) } catch (e) {}
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function del(id) {
    if (!confirm('Delete conversation ' + id + '?')) return
    try {
      const res = await fetch(`/api/conversations/${id}`, { method: 'DELETE', credentials: 'same-origin' })
      const j = await res.json()
      if (j.ok) {
        setConvs(prev => prev.filter(c => c.id !== id))
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Deleted', type: 'success' } })) } catch (e) {}
      } else {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Delete failed: ' + (j.error || 'unknown'), type: 'error' } })) } catch (e) {}
      }
    } catch (e) { try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Delete failed: ' + e.message, type: 'error' } })) } catch (er) {} }
  }

  async function openEditor(conv) {
    setEditing(conv)
    setEditLoading(true)
    try {
      const res = await fetch(`/api/conversations?sessionId=${encodeURIComponent(conv.sessionId)}`, { credentials: 'same-origin' })
      const j = await res.json()
      setEditMessages(j.messages || [])
    } catch (e) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Failed to load messages: ' + e.message, type: 'error' } })) } catch (er) {}
      setEditing(null)
      setEditMessages([])
    } finally { setEditLoading(false) }
  }

  function updateMessage(idx, key, value) {
    setEditMessages(ms => ms.map((m, i) => i === idx ? { ...m, [key]: value } : m))
  }

  function addMessage(role = 'user') {
    setEditMessages(ms => [...ms, { role, content: '' }])
  }

  function removeMessage(idx) {
    setEditMessages(ms => ms.filter((_, i) => i !== idx))
  }

  async function saveMessages() {
    if (!editing) return
    setEditLoading(true)
    try {
      const res = await fetch('/api/conversations', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: editing.sessionId, messages: editMessages }) })
      const j = await res.json()
      if (j.ok) {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Saved messages', type: 'success' } })) } catch (e) {}
        setEditing(null)
        setEditMessages([])
        load()
      } else {
        try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save failed: ' + (j.error || 'unknown'), type: 'error' } })) } catch (e) {}
      }
    } catch (e) {
      try { window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Save error: ' + e.message, type: 'error' } })) } catch (er) {}
    } finally { setEditLoading(false) }
  }

  return (
    <AdminGate title="Conversation Admin" description="Sign in to view and edit stored conversations.">
    <div className="site-container">
      <div style={{ marginBottom: 16 }}>
        <Link href="/admin" className="btn-ghost" style={{ fontSize: 13 }}>← Back to Admin</Link>
      </div>
      <h1 style={{ fontWeight: 800 }}>Stored Conversations</h1>
      <p style={{ color: '#b6b6c8' }}>List of persisted chat sessions. Delete any you no longer need.</p>

      <div style={{ marginTop: 12 }}>
        <button className="btn-primary" onClick={load} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {convs.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No conversations found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e8eaf0' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2d3a' }}>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: '#6b7280', fontWeight: 600, fontSize: 13 }}>ID</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: '#6b7280', fontWeight: 600, fontSize: 13 }}>Session</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: '#6b7280', fontWeight: 600, fontSize: 13 }}>Messages</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: '#6b7280', fontWeight: 600, fontSize: 13 }}>Updated</th>
                <th style={{ padding: '8px 10px' }}></th>
              </tr>
            </thead>
            <tbody>
              {convs.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1f2330' }}>
                  <td style={{ padding: '10px 10px', fontSize: 13, color: '#9ca3af' }}>{c.id}</td>
                  <td style={{ padding: '10px 10px', fontSize: 13, fontFamily: 'monospace', color: '#c084fc' }}>{c.sessionId}</td>
                  <td style={{ padding: '10px 10px', fontSize: 13 }}>{c.messageCount}</td>
                  <td style={{ padding: '10px 10px', fontSize: 13, color: '#9ca3af' }}>{new Date(c.updatedAt).toLocaleString()}</td>
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <button className="btn-ghost" onClick={() => openEditor(c)} style={{ marginRight: 8 }}>Edit</button>
                    <button className="btn-ghost" onClick={() => del(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,24,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ width: '90%', maxWidth: 900, maxHeight: '90vh', overflowY: 'auto', background: '#13161d', border: '1px solid #2a2d3a', borderRadius: 10, padding: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #2a2d3a', paddingBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 17, color: '#e8eaf0', fontWeight: 700 }}>Edit Messages — <span style={{ fontFamily: 'monospace', color: '#c084fc', fontWeight: 400, fontSize: 14 }}>{editing.sessionId}</span></h2>
              <button className="btn-ghost" onClick={() => { setEditing(null); setEditMessages([]) }}>Close</button>
            </div>

            <div>
              {editLoading ? (
                <p style={{ color: '#6b7280' }}>Loading messages…</p>
              ) : (
                <div>
                  {editMessages.length === 0 && <p style={{ color: '#6b7280' }}>No messages yet. Add one below.</p>}
                  {editMessages.map((m, idx) => (
                    <div key={idx} style={{ background: '#1a1d26', border: '1px solid #2a2d3a', padding: 12, borderRadius: 8, marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        <label style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>Role:</label>
                        <select
                          value={m.role}
                          onChange={e => updateMessage(idx, 'role', e.target.value)}
                          style={{ background: '#0d0f14', border: '1px solid #2a2d3a', borderRadius: 6, color: '#e8eaf0', padding: '4px 8px', fontSize: 13 }}
                        >
                          <option value="user">user</option>
                          <option value="assistant">assistant</option>
                          <option value="system">system</option>
                        </select>
                        <div style={{ marginLeft: 'auto' }}>
                          <button className="btn-ghost" onClick={() => removeMessage(idx)}>Remove</button>
                        </div>
                      </div>
                      <textarea
                        value={m.content}
                        onChange={e => updateMessage(idx, 'content', e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '8px 10px', background: '#0d0f14', border: '1px solid #2a2d3a', borderRadius: 6, color: '#e8eaf0', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={() => addMessage('user')}>Add User Message</button>
                    <button className="btn-primary" onClick={() => addMessage('assistant')}>Add Assistant Message</button>
                    <button className="btn-ghost" onClick={() => addMessage('system')}>Add System Message</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid #2a2d3a' }}>
              <button className="btn-ghost" onClick={() => { setEditing(null); setEditMessages([]) }} disabled={editLoading}>Cancel</button>
              <button className="btn-primary" onClick={saveMessages} disabled={editLoading}>{editLoading ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminGate>
  )
}
