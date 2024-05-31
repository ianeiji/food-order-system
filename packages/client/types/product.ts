export interface Product {
  id: number
  name: string
  description: string
  price: number
  categoryId: number
  tenantId: number
  storeId: number
  inventory: number
  productImages?: string[]
  isOutOfStock?: boolean
}

export interface ProductListResponse {
  data: Product[]
  meta: {
    total: number
    page: number
    perPage: number
    lastPage: number
    prev: number | null
    next: number | null
  }
}
