import axios from '../axios'
import { Product, ProductListResponse } from '@/types/product'

export const getProducts = async (tenantId: number, storeId: number, sessionId: string) => {
  const response = await axios.get('/product', {
    params: { tenantId, storeId },
    headers: { sessionId: sessionId },
  })
  return response.data
}

export const getProduct = async (
  id: number,
  tenantId: number,
  storeId: number,
  sessionId: string,
) => {
  const response = await axios.get(`/product/${id}`, {
    params: { tenantId, storeId },
    headers: { sessionId: sessionId },
  })
  return response.data
}
