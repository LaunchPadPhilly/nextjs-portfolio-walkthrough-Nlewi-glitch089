import { NextResponse } from 'next/server'
import { resolveOpenAIModel } from '../../../lib/openaiModel'

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    const override = process.env.OPENAI_MODEL || null
    if (!apiKey) return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 400 })

    const resp = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (!resp.ok) {
      const txt = await resp.text()
      return NextResponse.json({ error: 'Failed to list models', detail: txt }, { status: resp.status })
    }

    const data = await resp.json()
    const ids = (data?.data || []).map(d => d.id).filter(Boolean)
    const detectedModel = await resolveOpenAIModel(apiKey)

    return NextResponse.json({ override, detectedModel, availableModels: ids })
  } catch (err) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
