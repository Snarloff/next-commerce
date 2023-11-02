import { getProducts } from '@/app/(home)/actions'
import { InfiniteScroll } from '@/app/components/InfiniteScroll'

export default async function Home() {
  const { formatedProducts } = await getProducts({})

  return (
    <div className="mx-auto max-w-7xl px-8 pt-8 xl:px-0">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        <InfiniteScroll initialProducts={formatedProducts} />
      </div>
    </div>
  )
}
