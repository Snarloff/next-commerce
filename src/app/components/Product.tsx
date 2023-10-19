import { AddCart } from '@/app/components/AddCart'
import { ProductImage } from '@/app/components/ProductImage'
import { formatPrice } from '@/lib/utils'
import { ProductType } from '@/types/product.type'
import Link from 'next/link'

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex h-96 flex-col bg-slate-800 p-5 text-gray-300 shadow-lg">
        <div className="relative max-h-72 flex-1">
          <ProductImage product={product} fill />
        </div>
        <div className="my-3 flex justify-between font-bold">
          <p className="w-40 truncate">{product.name}</p>
          <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
        </div>
        <AddCart product={product} />
      </div>
    </Link>
  )
}
