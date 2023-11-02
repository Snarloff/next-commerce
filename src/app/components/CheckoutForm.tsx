'use client'

import { useCartStore } from '@/app/store'
import { formatPrice } from '@/lib/utils'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

interface CheckoutFormProps {
  clientSecret: string
}

export function CheckoutForm({ clientSecret }: CheckoutFormProps): JSX.Element {
  const stripe = useStripe()
  const elements = useElements()
  const useStore = useCartStore()

  const [isLoading, setIsLoading] = useState(false)

  const totalPrice = formatPrice(
    useStore.cart.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 0)
    }, 0)
  )

  useEffect(() => {
    if (!stripe) return
    if (!clientSecret) return

    console.log('x')
  }, [clientSecret, stripe])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          useStore.setCheckout('success')
        }

        setIsLoading(false)
      })
  }
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <h1 className="py-4 font-bold">Total: {totalPrice}</h1>
      <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-white" disabled={!stripe || isLoading}>
        {isLoading ? 'Processando...' : 'Finalizar compra'}
      </button>
    </form>
  )
}
