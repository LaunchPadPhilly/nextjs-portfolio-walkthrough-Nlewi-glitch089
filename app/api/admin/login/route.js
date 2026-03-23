import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, createAdminToken, isSecureCookieRequest } from '../../../../lib/adminAuth'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD || 'changeme'
    if (password !== expected) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })

    const secret = process.env.ADMIN_SECRET || expected
    const token = await createAdminToken(secret)

    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: isSecureCookieRequest(req.url),
      maxAge: ADMIN_COOKIE_MAX_AGE,
    })
    return res
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
