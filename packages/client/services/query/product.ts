'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts, getProduct } from '@/services/api/ProductService'
import { Product, ProductListResponse } from '@/types/product'
import { useCookies } from 'react-cookie'

export const useProducts = (tenantId: number, storeId: number) => {
  const [cookies] = useCookies(['sessionId'])
  const sessionId = cookies.sessionId

  return useQuery<ProductListResponse, Error>({
    queryKey: ['products', tenantId, storeId],
    queryFn: () => getProducts(tenantId, storeId, sessionId),
    enabled: !!sessionId,
  })
}

export const useProduct = (id: number, tenantId: number, storeId: number) => {
  const [cookies] = useCookies(['sessionId'])
  const sessionId = cookies.sessionId

  return useQuery<Product, Error>({
    queryKey: ['product', id, tenantId, storeId],
    queryFn: () => getProduct(id, tenantId, storeId, sessionId),
    enabled: !!sessionId,
  })
}
