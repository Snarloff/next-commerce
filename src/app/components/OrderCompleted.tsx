'use client'

import { useCartStore } from '@/app/store'
import { useEffect } from 'react'

export function OrderCompleted(): JSX.Element {
  const useCart = useCartStore()

  useEffect(() => {
    useCart.setPaymentIntent('')
    useCart.clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Pedido concluído com sucesso</h1>
      <button
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
        onClick={() => {
          setTimeout(() => {
            useCart.setCheckout('cart')
          }, 1000)

          useCart.toggleCart()
        }}
      >
        Voltar para a loja
      </button>
    </div>
  )
}
