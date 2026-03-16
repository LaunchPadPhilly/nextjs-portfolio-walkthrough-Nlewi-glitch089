import { NextResponse } from 'next/server'
import { resolveOpenAIModel } from '../../lib/openaiModel'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const PROJECTS = {
  'nerdstreetcrm': {
    title: 'Nerd Street CRM',
    desc: 'Nerd Street CRM is a donor relationship tool for nonprofits that centralizes donor records, donations, and engagement. It reduces reliance on spreadsheets and helps staff streamline renewals and outreach.',
    tech: ['React.js', 'Postgres', 'UX']
  },
  'nextstep': {
    title: 'NextStep',
    desc: 'A motivational goal-tracking app that helps users take small, actionable steps toward personal growth.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  'microlib': {
    title: 'Micro-Interaction Library',
    desc: 'A collection of reusable, accessible micro-interactions and UI primitives.',
    tech: ['React', 'Animation']
  },
  'dynlayout': {
    title: 'Dynamic Layout Engine',
    desc: 'Experimenting with AI-driven UI patterns that adapt layouts based on content type and user context.',
    tech: ['AI', 'Layout']
  }
}

export async function POST(req) {
  try {
    const { projectId } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })

    const proj = PROJECTS[projectId]
    if (!proj) return NextResponse.json({ error: 'Unknown project id' }, { status: 400 })

    const prompt = `Explain the project "${proj.title}" for a portfolio visitor. Include: the project's goal, the technologies used, and the impact or why someone should explore it. Keep the explanation concise (2-3 short paragraphs). Project description: ${proj.desc}`

    const model = process.env.OPENAI_MODEL || await resolveOpenAIModel(apiKey)
    const payload = {
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.6,
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
    const explanation = data.choices?.[0]?.message?.content ?? ''
    return NextResponse.json({ explanation })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
