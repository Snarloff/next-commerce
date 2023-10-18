import { ProductType } from '@/types/product.type'
import { ProductCard } from './components/Product'

async function getData() {
  const res = await fetch('https://fakestoreapi.com/products')

  if (!res.ok) {
    throw new Error('Something went wrong')
  }

  return await res.json()
}

export default async function Home() {
  const products: ProductType[] = await getData()

  return (
    <div className="mx-auto max-w-7xl px-8 pt-8 xl:px-0">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
