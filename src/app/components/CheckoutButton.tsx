'use client'

import { useCartStore } from '@/app/store'
import { formatPrice } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function CheckoutButton({ totalPrice }: { totalPrice: number }) {
  const { toggleCart, setCheckout } = useCartStore()
  const { push } = useRouter()
  const { user } = useUser()

  const handleCheckout = async () => {
    if (!user) {
      push('/sign-in?redirectUrl=/')
      toggleCart()
      return
    }

    setCheckout('checkout')
  }

  return (
    <div>
      <p className="font-bold text-teal-600">Total: {formatPrice(totalPrice)}</p>
      <button className="mt-2 w-full rounded-md bg-teal-600 py-2 text-white" onClick={handleCheckout}>
        Finalizar Compra
      </button>
    </div>
  )
}
