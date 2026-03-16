/**
 * Resolve an OpenAI chat model to use.
 * Priority:
 * - `process.env.OPENAI_MODEL` if set
 * - cached detected model
 * - try to fetch /v1/models and pick a preferred model
 * - fallback to `gpt-3.5-turbo`
 */

let cachedModel = null

export async function resolveOpenAIModel(apiKey) {
  if (process.env.OPENAI_MODEL) return process.env.OPENAI_MODEL
  if (cachedModel) return cachedModel
  if (!apiKey) return 'gpt-3.5-turbo'

  try {
    const resp = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!resp.ok) {
      cachedModel = 'gpt-3.5-turbo'
      return cachedModel
    }
    const data = await resp.json()
    const ids = (data?.data || []).map(d => d.id).filter(Boolean)

    const preferred = [
      'gpt-4o-mini',
      'gpt-4o.1',
      'gpt-4o',
      'gpt-4o-1',
      'gpt-4o-mini-2024',
      'gpt-4o-mini:latest',
      'gpt-3.5-turbo',
    ]

    // prefer exact match, then prefix match
    for (const p of preferred) {
      const exact = ids.find(id => id === p)
      if (exact) {
        cachedModel = exact
        return cachedModel
      }
    }
    for (const p of preferred) {
      const pref = ids.find(id => id.startsWith(p))
      if (pref) {
        cachedModel = pref
        return cachedModel
      }
    }

    // fallback: choose first chat-capable model if any contains 'gpt' or 'chat'
    const fallback = ids.find(id => /gpt|chat/i.test(id))
    cachedModel = fallback || 'gpt-3.5-turbo'
    return cachedModel
  } catch (err) {
    cachedModel = 'gpt-3.5-turbo'
    return cachedModel
  }
}
