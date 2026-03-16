import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()
if (!global.prisma) global.prisma = prisma

export async function GET() {
  try {
    const convs = await prisma.conversation.findMany({
      include: { _count: { select: { messages: true } } },
      orderBy: { updatedAt: 'desc' }
    })
    const mapped = convs.map(c => ({ id: c.id, sessionId: c.sessionId, createdAt: c.createdAt, updatedAt: c.updatedAt, messageCount: c._count?.messages || 0 }))
    return NextResponse.json({ conversations: mapped })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
