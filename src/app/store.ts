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
      addToCart: (product) =>
        set((state) => {
          const productInCart = state.cart.find((item) => item.id === product.id)

          if (productInCart) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return {
                  ...item,
                  quantity: item.quantity ? item.quantity + 1 : 1,
                }
              }
              return item
            })

            return { cart: updatedCart }
          }

          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((item) => item.id === product.id)

          if (existingProduct && existingProduct.quantity > 1) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                }
              }
              return item
            })

            return { cart: updatedCart }
          }

          const filteredCart = state.cart.filter((item) => item.id !== product.id)
          return { cart: filteredCart }
        }),
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: 'cart-storage' }
  )
)
