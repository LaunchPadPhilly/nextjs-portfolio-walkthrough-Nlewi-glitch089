import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(req) {
  try {
    const form = await req.formData()
    const file = form.get('avatar')
    if (!file || typeof file === 'string') return NextResponse.json({ error: 'No file' }, { status: 400 })

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '')}`
    await mkdir(UPLOAD_DIR, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    const outPath = path.join(UPLOAD_DIR, filename)
    await writeFile(outPath, buffer)
    const publicPath = `/uploads/${filename}`
    return NextResponse.json({ ok: true, path: publicPath })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
