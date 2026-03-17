import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

function getPrisma() {
  if (global.prisma) return global.prisma
  const p = new PrismaClient()
  global.prisma = p
  return p
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    const prisma = getPrisma()
    await prisma.message.deleteMany({ where: { conversationId: id } })
    await prisma.conversation.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
