'use client'

import { useEffect, useState } from 'react'
import axios from '@/services/axios'
import { useProducts } from '@/services/query/product'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCookies } from 'react-cookie'

const OrderPage = () => {
  const router = useRouter()
  const [locationAllowed, setLocationAllowed] = useState(false)
  const [sessionInitialized, setSessionInitialized] = useState(false)
  const [error, setError] = useState('')
  const [cookies, setCookie] = useCookies(['sessionId'])
  const urlSearchParams = useSearchParams()
  const tenantId = urlSearchParams.get('tenantId')
  const storeId = urlSearchParams.get('storeId')
  const tableNumber = urlSearchParams.get('tableNumber')

  // TODO: この処理は共通化させたい
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await axios.get('/session/init', {
          params: { tenantId, storeId, tableNumber },
        })
        if (response.data) {
          setCookie('sessionId', response.data.sessionId, { path: '/' })
          setSessionInitialized(true)
        }
      } catch (err) {
        setError('Failed to initialize session.')
      }
    }

    const checkLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            if (isWithinStoreLocation(latitude, longitude)) {
              setLocationAllowed(true)
              initializeSession()
            } else {
              setLocationAllowed(false)
              setError('You need to be inside the store to place an order.')
              router.push('/')
            }
          },
          () => {
            setError('Location access is required to place an order.')
            setLocationAllowed(false)
            router.push('/')
          },
        )
      } else {
        setError('Geolocation is not supported by your browser.')
        setLocationAllowed(false)
        router.push('/')
      }
    }

    checkLocation()

    const intervalId = setInterval(() => {
      checkLocation()
    }, 60000) // 1分ごとに確認

    return () => {
      clearInterval(intervalId)
    }
  }, [tenantId, storeId, tableNumber])

  const isWithinStoreLocation = (latitude: any, longitude: any) => {
    // TODO: 各店舗が持っている緯度経度を取得してくる ← Officeにカラムを追加する必要あり
    const storeLatitude = 26.2142389 // 店舗の緯度（例）
    const storeLongitude = 127.7079327 // 店舗の経度（例）
    const distance = getDistanceFromLatLonInKm(latitude, longitude, storeLatitude, storeLongitude)
    return distance < 0.1 // 店舗内にいるかどうかの判定（100m以内）
  }

  const getDistanceFromLatLonInKm = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371 // 地球の半径（km）
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // 距離（km）
    return distance
  }

  const deg2rad = (deg: any) => {
    return deg * (Math.PI / 180)
  }

  const { data: products, isLoading, isError } = useProducts(Number(tenantId), Number(storeId))

  if (!locationAllowed || !sessionInitialized) {
    return <div>{error}</div>
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading products</div>
      ) : (
        <ul>
          {products?.data.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderPage
