'use client'

import { Checkout } from '@/app/components/Checkout'
import { CheckoutButton } from '@/app/components/CheckoutButton'
import { OrderCompleted } from '@/app/components/OrderCompleted'
import { useCartStore } from '@/app/store'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'

import Image from 'next/image'

export function CartDrawer() {
  const useStore = useCartStore()

  const totalPrice = useStore.cart.reduce((acc, item) => {
    return acc + (item?.price ?? 0) * (item?.quantity ?? 0)
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="fixed left-0 top-0 z-50 h-screen w-full bg-black/25"
      onClick={() => useStore.toggleCart()}
    >
      <div
        className="absolute right-0 top-0 h-screen w-1/3 overflow-y-scroll bg-slate-600 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-sm font-bold text-teal-600" onClick={() => useStore.toggleCart()}>
          Voltar para loja
        </button>

        <div className="my-4 border-t border-gray-400" />

        {useStore.onCheckout === 'cart' && (
          <>
            {useStore.cart.map((item) => (
              <motion.div
                animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                initial={{
                  scale: 0.5,
                  rotateZ: -10,
                  opacity: 0,
                }}
                exit={{
                  scale: 0.5,
                  rotateZ: -10,
                  opacity: 0,
                }}
                key={item.id}
                className="flex gap-4 py-4"
              >
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
              </motion.div>
            ))}
          </>
        )}

        {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && <CheckoutButton totalPrice={totalPrice} />}
        {useStore.onCheckout === 'checkout' && <Checkout />}
        {useStore.onCheckout === 'success' && <OrderCompleted />}
      </div>
    </motion.div>
  )
}
