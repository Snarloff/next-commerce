import { AddCart } from '@/app/components/AddCart'
import { ProductImage } from '@/app/components/ProductImage'
import { stripe } from '@/lib/stripe'
import { formatPrice } from '@/lib/utils'

async function getProduct(id: string) {
  const product = await stripe.products.retrieve(id)
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
}

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id)

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 p-10 md:flex-row">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <h2 className="text-xl text-teal-600">{formatPrice(product.price)}</h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddCart product={product} />
      </div>
    </div>
  )
}
