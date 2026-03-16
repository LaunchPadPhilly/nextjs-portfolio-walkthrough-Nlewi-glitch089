"use client"

import { useEffect, useState } from 'react'

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
    <div className="site-container">
      <h1 style={{ fontWeight: 800 }}>Stored Conversations</h1>
      <p style={{ color: '#b6b6c8' }}>List of persisted chat sessions. Delete any you no longer need.</p>

      <div style={{ marginTop: 12 }}>
        <button className="btn-primary" onClick={load} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {convs.length === 0 ? (
          <p>No conversations found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Session</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Messages</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Updated</th>
                <th style={{ padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {convs.map(c => (
                <tr key={c.id} style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: 8 }}>{c.id}</td>
                  <td style={{ padding: 8 }}>{c.sessionId}</td>
                  <td style={{ padding: 8 }}>{c.messageCount}</td>
                  <td style={{ padding: 8 }}>{new Date(c.updatedAt).toLocaleString()}</td>
                  <td style={{ padding: 8 }}>
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ width: '90%', maxWidth: 900, background: 'var(--card-bg, #fff)', borderRadius: 8, padding: 16, boxShadow: '0 10px 40px rgba(2,6,23,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Edit Messages — {editing.sessionId}</h2>
              <div>
                <button className="btn-ghost" onClick={() => { setEditing(null); setEditMessages([]) }}>Close</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              {editLoading ? (
                <p>Loading messages…</p>
              ) : (
                <div>
                  {editMessages.length === 0 && <p style={{ color: '#888' }}>No messages yet. Add one below.</p>}
                  {editMessages.map((m, idx) => (
                    <div key={idx} style={{ border: '1px solid rgba(0,0,0,0.06)', padding: 8, borderRadius: 6, marginBottom: 8 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <label style={{ fontSize: 12 }}>Role:</label>
                        <select value={m.role} onChange={e => updateMessage(idx, 'role', e.target.value)}>
                          <option value="user">user</option>
                          <option value="assistant">assistant</option>
                          <option value="system">system</option>
                        </select>
                        <div style={{ marginLeft: 'auto' }}>
                          <button className="btn-ghost" onClick={() => removeMessage(idx)}>Remove</button>
                        </div>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <textarea value={m.content} onChange={e => updateMessage(idx, 'content', e.target.value)} rows={4} style={{ width: '100%', padding: 8 }} />
                      </div>
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button className="btn-primary" onClick={() => addMessage('user')}>Add User Message</button>
                    <button className="btn-primary" onClick={() => addMessage('assistant')}>Add Assistant Message</button>
                    <button className="btn-ghost" onClick={() => addMessage('system')}>Add System Message</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <button className="btn-ghost" onClick={() => { setEditing(null); setEditMessages([]) }} disabled={editLoading}>Cancel</button>
              <button className="btn-primary" onClick={saveMessages} disabled={editLoading}>{editLoading ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
