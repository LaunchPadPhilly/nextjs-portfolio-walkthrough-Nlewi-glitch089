import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  // Clear cookie (match SameSite and Path)
  res.headers.set('Set-Cookie', `admin_auth=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`)
  return res
}
