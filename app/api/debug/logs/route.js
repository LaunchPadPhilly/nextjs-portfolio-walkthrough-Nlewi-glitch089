import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const LOG_PATH = path.join(process.cwd(), 'data', 'debug_logs.json')

export async function GET() {
  try {
    const raw = await readFile(LOG_PATH)
    const json = JSON.parse(raw.toString())
    return NextResponse.json({ ok: true, count: Array.isArray(json) ? json.length : 0, logs: json })
  } catch (err) {
    // If the file doesn't exist, return empty list rather than error
    return NextResponse.json({ ok: true, count: 0, logs: [] })
  }
}
