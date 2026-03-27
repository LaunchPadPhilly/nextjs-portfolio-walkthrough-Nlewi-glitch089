import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const LOG_PATH = path.join(process.cwd(), 'data', 'debug_logs.json')

export async function GET(req) {
  try {
    // If caller requests logs (e.g. ?logs=1), return the debug logs if available.
    const url = new URL(req.url)
    const wantLogs = url.searchParams.get('logs')
    if (wantLogs) {
      try {
        const raw = await readFile(LOG_PATH)
        const json = JSON.parse(raw.toString())
        return NextResponse.json({ ok: true, count: Array.isArray(json) ? json.length : 0, logs: json })
      } catch (e) {
        return NextResponse.json({ ok: true, count: 0, logs: [] })
      }
    }

    // Only expose non-secret, safe build/runtime info. Do NOT return secrets.
    const env = {}
    for (const key of Object.keys(process.env)) {
      if (key.startsWith('NEXT_PUBLIC_') || key === 'NODE_ENV' || key === 'VERCEL') {
        env[key] = process.env[key]
      }
    }

    const info = {
      ok: true,
      env,
      nodeEnv: process.env.NODE_ENV || null,
      vercel: !!process.env.VERCEL,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(info)
  } catch (err) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const entry = {
      timestamp: new Date().toISOString(),
      origin: 'chat-widget',
      payload: body,
    }

    let current = []
    try {
      const raw = await readFile(LOG_PATH)
      current = JSON.parse(raw.toString())
      if (!Array.isArray(current)) current = []
    } catch (e) {
      // ignore read errors (file may not exist)
      current = []
    }

    current.push(entry)
    // Keep log size reasonable by trimming to last 100 entries
    if (current.length > 200) current = current.slice(current.length - 200)

    await writeFile(LOG_PATH, JSON.stringify(current, null, 2))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}
