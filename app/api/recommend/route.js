import { NextResponse } from 'next/server'
import { resolveOpenAIModel } from '../../lib/openaiModel'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const PROJECT_SUMMARY = `
- Nerd Street CRM: donor relationship tool for nonprofits; centralizes donors, donations, engagement.
- NextStep: motivational goal-tracking app focused on daily progress and habit building.
- Micro-Interaction Library: reusable UI micro-interactions and motion primitives.
- Dynamic Layout Engine: AI-driven layout experiments that adapt to content and context.
`

export async function POST(req) {
  try {
    const { interests } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })

    const userInterests = Array.isArray(interests) ? interests.join(', ') : (interests || '')

    const prompt = `Given these project summaries:${PROJECT_SUMMARY}\n\nUser interests: ${userInterests}. Recommend the single best project for the visitor to explore first and explain briefly why it matches their interests.`

    const model = process.env.OPENAI_MODEL || await resolveOpenAIModel(apiKey)
    const payload = {
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    }

    const resp = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const txt = await resp.text()
      return NextResponse.json({ error: txt }, { status: resp.status })
    }

    const data = await resp.json()
    const recommendation = data.choices?.[0]?.message?.content ?? ''
    return NextResponse.json({ recommendation })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
