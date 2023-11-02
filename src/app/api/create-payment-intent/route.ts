import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { ProductType } from '@/types/product.type'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const calculateOrderAmount = (items: ProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.price || 0) * (item.quantity || 0)
  }, 0)

  return totalPrice
}

export async function POST(req: Request) {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  })

  if (!currentUser) {
    return new Response('User not found.', { status: 404 })
  }

  const { items, payment_intent_id: paymentIntentID } = await req.json()

  const total = calculateOrderAmount(items)

  const order = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'brl',
    status: 'pending',
    paymentIntentID,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),
    },
  }

  if (paymentIntentID) {
    const currentIntent = await stripe.paymentIntents.retrieve(paymentIntentID)

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(paymentIntentID, {
        amount: total,
      })

      const [existingOrder] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentID,
          },
          include: {
            products: true,
          },
        }),
        prisma.order.update({
          where: {
            paymentIntentID,
          },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
        }),
      ])

      if (!existingOrder) {
        return new Response('Order not found', { status: 404 })
      }

      return NextResponse.json({ paymentIntent: updatedIntent }, { status: 200 })
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    })

    order.paymentIntentID = paymentIntent.id

    await prisma.order.create({
      data: {
        ...order,
      },
    })

    return NextResponse.json({ paymentIntent }, { status: 200 })
  }
}
