'use client'

import { useCartStore } from '@/app/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { CheckoutButton } from './CheckoutButton'

export function CartDrawer() {
  const useStore = useCartStore()

  const totalPrice = useStore.cart.reduce((acc, item) => {
    return acc + (item?.price ?? 0) * (item?.quantity ?? 0)
  }, 0)

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-black/25" onClick={() => useStore.toggleCart()}>
      <div
        className="absolute right-0 top-0 h-screen w-1/3 overflow-y-scroll bg-slate-600 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-sm font-bold text-teal-600" onClick={() => useStore.toggleCart()}>
          Voltar para loja
        </button>

        <div className="my-4 border-t border-gray-400" />

        {useStore.cart.map((item) => (
          <div key={item.id} className="flex gap-4 py-4">
            <Image src={item.image ?? ''} alt={item.name} width={120} height={120} className="w-24 object-cover" />
            <div>
              <h2 className="w-42 truncate">{item.name}</h2>
              <h2>Quantidade: {item.quantity}</h2>
              <p className="text-sm font-bold text-teal-600">{formatPrice(item.price)}</p>
              <button className="mr-1 mt-2 rounded-md border px-2 py-1 text-sm" onClick={() => useStore.addToCart(item)}>
                Adicionar
              </button>
              <button className="mr-1 mt-2 rounded-md border px-2 py-1 text-sm" onClick={() => useStore.removeFromCart(item)}>
                Remover
              </button>
            </div>
          </div>
        ))}

        {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && <CheckoutButton totalPrice={totalPrice} />}
      </div>
    </div>
  )
}
