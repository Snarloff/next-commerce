'use client'

import { getProducts } from '@/app/(home)/actions'
import { ProductCard } from '@/app/components/Product'
import { ProductType } from '@/types/product.type'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface InfiniteScrollProps {
  initialProducts: ProductType[]
}

export function InfiniteScroll({ initialProducts }: InfiniteScrollProps): JSX.Element {
  const [products, setProducts] = useState<ProductType[]>(initialProducts)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const lastProductId = products[products.length - 1]?.id

  const [ref, inView] = useInView({
    threshold: 0, // 0% of the element visible
    triggerOnce: false,
  })

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true)

    const { formatedProducts, hasMore } = await getProducts({ lastProductId })

    if (formatedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formatedProducts])
      setHasMore(hasMore)
    }

    setIsLoading(false)
  }, [lastProductId])

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts()
    }
  }, [hasMore, inView, isLoading, loadMoreProducts])

  if (!products) {
    return <div>Carregando...</div>
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}

      {hasMore && <div ref={ref}>carregando mais registros..</div>}
    </>
  )
}
