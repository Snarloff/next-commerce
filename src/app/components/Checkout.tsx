'use client'

import { useCartStore } from '@/app/store'
import { useEffect } from 'react'

export function Checkout() {
  const useStore = useCartStore()

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: useStore.cart,
        payment_intent_id: useStore.paymentIntent,
      }),
    })
  }, [useStore.cart, useStore.paymentIntent])

  return <></>
}
