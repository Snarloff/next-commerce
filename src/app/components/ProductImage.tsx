'use client'

import { ProductType } from '@/types/product.type'
import Image from 'next/image'
import { useState } from 'react'

type ProductImageProps = {
  product: ProductType
  fill?: boolean
}

export function ProductImage({ product, fill }: ProductImageProps) {
  const [loading, setLoading] = useState(true)

  return fill ? (
    <Image
      fill
      src={product.image}
      alt={product.title}
      onLoadingComplete={() => setLoading(false)}
      className={`object-cover ${loading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'}`}
    />
  ) : (
    <Image
      width={400}
      height={700}
      src={product.image}
      alt={product.title}
      onLoadingComplete={() => setLoading(false)}
      className={`object-cover ${loading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'}`}
    />
  )
}
