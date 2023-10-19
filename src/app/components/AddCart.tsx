'use client'

import { useCartStore } from '@/app/store'
import { ProductType } from '@/types/product.type'

export function AddCart({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore()

  return (
    <button className="rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm text-white" onClick={() => addToCart(product)}>
      Adicionar ao Carrinho
    </button>
  )
}
