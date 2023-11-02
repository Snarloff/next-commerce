import { stripe } from '@/lib/stripe'
import { ProductType } from '@/types/product.type'

interface GetProductsParams {
  lastProductId?: string | undefined
}

interface GetProductsResult {
  formatedProducts: ProductType[]
  hasMore: boolean
}

export async function getProducts({ lastProductId }: GetProductsParams): Promise<GetProductsResult> {
  const params = lastProductId ? { starting_after: lastProductId, limit: 12 } : { limit: 12 }
  const { data: products, has_more: hasMore } = await stripe.products.list({ ...params })

  const formatedProducts = await Promise.all(
    products.map(async (product) => {
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

  return { formatedProducts, hasMore }
}
