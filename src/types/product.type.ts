export type ProductType = {
  id: string
  price: number | null
  name: string
  quantity?: number | 1
  image: string | null
  description: string | null
  currency?: string
}
