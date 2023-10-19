import { ProductType } from '@/types/product.type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartState = {
  cart: ProductType[]
  isOpen: boolean
  addToCart: (product: ProductType) => void
  removeFromCart: (product: ProductType) => void
  clearCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (product) => set((state) => ({ cart: state.cart.filter((item) => item.id !== product.id) })),
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: 'cart-storage' }
  )
)
