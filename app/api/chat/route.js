import { NextResponse } from 'next/server'
import { resolveOpenAIModel } from '../../lib/openaiModel'
import { readFile } from 'fs/promises'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

async function loadSystemPrompt() {
  try {
    const raw = await readFile(new URL('../../../data/ai_context.json', import.meta.url))
    const json = JSON.parse(raw.toString())
    return json.systemPrompt || ''
  } catch (e) {
    return `You are Nakerra Lewis's AI portfolio guide and should respond in first person as Nakerra. Answer questions about my projects, my skills, and my experience in UX, game design, and interactive media. If asked "you/your" questions, answer as me. Keep replies clear and concise.`
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { messages } = body
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })
    }

    const systemPrompt = await loadSystemPrompt()

    // Ensure the system prompt is first message server-side
    const finalMessages = [
      { role: 'system', content: systemPrompt },
      ...(messages || []),
    ]

    const model = process.env.OPENAI_MODEL || await resolveOpenAIModel(apiKey)
    const payload = {
      model,
      messages: finalMessages,
      max_tokens: 600,
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
    const reply = data.choices?.[0]?.message?.content ?? ''

    return NextResponse.json({ reply })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
