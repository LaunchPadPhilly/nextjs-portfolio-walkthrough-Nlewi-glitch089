import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const CTX_PATH = path.join(process.cwd(), 'data', 'ai_context.json')

export async function GET() {
  try {
    const raw = await readFile(CTX_PATH)
    const json = JSON.parse(raw.toString())
    return NextResponse.json(json)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    const toWrite = JSON.stringify(body, null, 2)
    await writeFile(CTX_PATH, toWrite)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
