import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const PATH = path.join(process.cwd(), 'data', 'projects.json')

export async function GET() {
  try {
    const raw = await readFile(PATH)
    const json = JSON.parse(raw.toString())
    return NextResponse.json({ projects: json })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    if (!Array.isArray(body)) return NextResponse.json({ error: 'Expected array' }, { status: 400 })
    await writeFile(PATH, JSON.stringify(body, null, 2))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
