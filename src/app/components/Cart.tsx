'use client'

import { useCartStore } from '@/app/store'
import { CartDrawer } from './CartDrawer'

export function Cart() {
  const useStore = useCartStore()

  return (
    <>
      <div className="relative flex cursor-pointer items-center" onClick={() => useStore.toggleCart()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute bottom-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-sm font-bold">
          {useStore.cart?.length}
        </span>
      </div>

      {useStore.isOpen && <CartDrawer />}
    </>
  )
}
