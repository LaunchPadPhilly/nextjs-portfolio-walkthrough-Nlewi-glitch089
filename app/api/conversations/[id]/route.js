import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()
if (!global.prisma) global.prisma = prisma

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    await prisma.message.deleteMany({ where: { conversationId: id } })
    await prisma.conversation.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
