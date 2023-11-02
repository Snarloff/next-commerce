/* eslint-disable no-case-declarations */

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

async function handler(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') || ''

  if (!signature) {
    return new Response('Invalid signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '')

    switch (event.type) {
      case 'payment_intent.created':
        event.data.object as Stripe.PaymentIntent
        break
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge

        if (typeof charge.payment_intent === 'string') {
          await prisma.order.update({
            where: { paymentIntentID: charge.payment_intent },
            data: { status: 'complete' },
          })
        }
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return new Response(`Webhook Error: ${error}`, { status: 400 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
