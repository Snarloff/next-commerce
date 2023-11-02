'use client'

import { useCartStore } from '@/app/store'
import { useEffect, useState } from 'react'

import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/app/components/CheckoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export function Checkout() {
  const useStore = useCartStore()
  const [clientSecret, setClientSecret] = useState()

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
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        useStore.setPaymentIntent(data.paymentIntent.id)
        setClientSecret(data.paymentIntent?.client_secret)
      })
  }, [useStore, useStore.cart, useStore.paymentIntent])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'night', labels: 'floating' },
  }

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  )
}
