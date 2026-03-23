import { NextResponse } from 'next/server'
import { resolveOpenAIModel } from '../../lib/openaiModel'
import { readFile } from 'fs/promises'
import path from 'path'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const PROJECTS_PATH = path.join(process.cwd(), 'data', 'projects.json')

const CANONICAL_EXPLANATIONS = {
  nextstep: `NextStep is a career exploration and planning app designed for high school seniors and recent graduates who are unsure about their next step after graduation. Many students feel pressured to immediately choose a path such as college, trade school, or entering the workforce, even when they are still exploring their interests. NextStep was created to help users slow down that decision process and explore their options in a structured and supportive way.

The app helps users break down the overwhelming question of “What should I do after graduation?” into smaller, manageable steps. Instead of focusing only on goal tracking, NextStep guides users through career discovery, interest exploration, and realistic pathway planning. Users can explore different options such as college programs, technical careers, certifications, or entering the workforce, while setting small exploration goals like researching a field, attending an information session, or speaking with someone in that career.

NextStep emphasizes guided exploration rather than rigid goal setting. By helping users compare possibilities and reflect on their interests, the platform encourages informed decision-making and reduces the stress that often comes with post-graduation planning.

The project demonstrates how thoughtful digital tools can support life transitions and career discovery. Through its design, NextStep highlights the role technology can play in helping young adults navigate uncertainty and build confidence in choosing their future path.`,
  nerdstreetcrm: `Nerd Street CRM is a donor relationship management tool designed to help nonprofits organize and maintain meaningful connections with their supporters. Many smaller organizations rely heavily on spreadsheets to track donor information, which can quickly become disorganized, difficult to maintain, and prone to errors. This project was created to replace that fragmented system with a centralized platform for managing donor relationships and engagement.

The system allows nonprofit staff to store donor profiles, track contributions, and monitor communication history in one place. By organizing donor records and interaction data within a structured database, the platform makes it easier for organizations to follow up with supporters, manage renewals, and maintain consistent outreach. This helps teams focus less on administrative tasks and more on building long-term relationships with their donors.

Nerd Street CRM demonstrates how thoughtful software design can simplify operational challenges that nonprofits face every day. By transforming scattered spreadsheet data into a streamlined system, the project highlights how technology can support organizations in maintaining stronger donor engagement and improving the sustainability of their fundraising efforts.`,
  clearcents: `ClearCents is a personal finance tool designed to help users better understand and manage their spending habits. Many people struggle to keep track of where their money goes each month, especially when expenses are spread across multiple purchases and categories. ClearCents was created to make financial awareness more approachable by giving users a clear view of their spending patterns.

The platform allows users to record and categorize expenses, helping them visualize how their money is distributed across areas like food, entertainment, transportation, and savings. By organizing financial activity into simple summaries, ClearCents encourages users to reflect on their spending choices and identify opportunities to make more intentional financial decisions.

ClearCents focuses on clarity and accessibility, making personal finance less overwhelming for people who may be new to budgeting. The project demonstrates how simple digital tools can promote financial awareness and empower individuals to take greater control of their financial habits.`
}

async function loadProjects() {
  const raw = await readFile(PROJECTS_PATH)
  const json = JSON.parse(raw.toString())
  return Array.isArray(json) ? json : []
}

export async function POST(req) {
  try {
    const { projectId } = await req.json()
    const canonical = CANONICAL_EXPLANATIONS[projectId]
    if (canonical) return NextResponse.json({ explanation: canonical })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })

    const projects = await loadProjects()
    const proj = projects.find((p) => p?.id === projectId)
    if (!proj) return NextResponse.json({ error: 'Unknown project id' }, { status: 400 })

    const techList = Array.isArray(proj.tech) ? proj.tech.join(', ') : ''
    const prompt = `You are writing a project explanation for a software engineer's portfolio. The project is currently in development (Coming Soon).

Project name: ${proj.title}
Description: ${proj.desc}
Technologies: ${techList}

Write a concise 2-3 paragraph explanation for a portfolio visitor. Cover: what problem it solves and why it matters, how the technology stack enables the core experience, and what's interesting or ambitious about the idea. Be specific — avoid generic phrases like "user-friendly" or "powerful tool". Write in third person, present tense.`

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
    return NextResponse.json({ explanation, aiGenerated: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
