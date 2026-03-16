import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'

const CTX_PATH = new URL('../../../data/ai_context.json', import.meta.url)

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
