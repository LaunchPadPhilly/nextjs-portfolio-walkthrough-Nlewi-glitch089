import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD || 'changeme'
    if (password !== expected) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })

    const ts = Date.now().toString()
    const secret = process.env.ADMIN_SECRET || expected
    const hmac = crypto.createHmac('sha256', secret).update(ts).digest('hex')
    const token = `${ts}:${hmac}`

    const res = NextResponse.json({ ok: true })
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    // Set cookie for 7 days — use SameSite=Lax so top-level navigations and prefetches include the cookie
    res.headers.set('Set-Cookie', `admin_auth=${encodeURIComponent(token)}; HttpOnly; ${secureFlag}SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`)
    return res
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
