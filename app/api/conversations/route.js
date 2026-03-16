import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()
if (!global.prisma) global.prisma = prisma

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')
    if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 })

    const conv = await prisma.conversation.findUnique({
      where: { sessionId },
      include: { messages: { orderBy: { idx: 'asc' } } }
    })
    if (!conv) return NextResponse.json({ messages: [] })
    return NextResponse.json({ messages: conv.messages.map(m => ({ role: m.role, content: m.content })) })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { sessionId, messages } = body
    if (!sessionId || !messages) return NextResponse.json({ error: 'sessionId and messages required' }, { status: 400 })

    // Upsert conversation by sessionId: delete existing messages and replace
    let conv = await prisma.conversation.findUnique({ where: { sessionId } })
    if (!conv) {
      conv = await prisma.conversation.create({ data: { sessionId } })
    } else {
      // delete existing messages
      await prisma.message.deleteMany({ where: { conversationId: conv.id } })
    }

    // create messages
    const payload = messages.map((m, i) => ({ role: m.role, content: m.content ?? '', idx: i, conversationId: conv.id }))
    if (payload.length) {
      await prisma.message.createMany({ data: payload })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
