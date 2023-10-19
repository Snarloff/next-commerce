import { prisma } from '@/lib/prisma'
import { Event, EventType } from '@/types/event.type'
import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook, WebhookRequiredHeaders } from 'svix'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''
process.env.TZ = 'America/Sao_Paulo'

async function handler(request: Request) {
  const payload = await request.json()
  const headersList = headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  }

  const wh = new Webhook(webhookSecret)
  let evt: Event | null = null

  try {
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
  } catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType: EventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data

    await prisma.user.upsert({
      where: {
        externalId: id as string,
      },
      create: {
        externalId: id as string,
        attributes,
      },
      update: {
        attributes,
      },
    })
  }

  return NextResponse.json({}, { status: 200 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
