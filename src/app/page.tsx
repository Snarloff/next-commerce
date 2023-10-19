import { ProductCard } from '@/app/components/Product'
import { ProductType } from '@/types/product.type'

import Stripe from 'stripe'

async function getData(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })

  const products = await stripe.products.list()
  const formatedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      })

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.data[0].unit_amount,
        currency: price.data[0].currency,
        image: product.images[0],
      }
    })
  )

  return formatedProducts
}

export default async function Home() {
  const products = await getData()

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
