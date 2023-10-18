import { ProductType } from '@/types/product.type'

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="flex h-96 flex-col bg-slate-800 p-5 text-gray-300 shadow-lg">
      <div className="relative max-h-72 flex-1">{product.image}</div>
      <div className="my-3 flex justify-between font-bold"></div>
      <button className="rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm text-white">Adicionar ao Carrinho</button>
    </div>
  )
}
