import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 2000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') // トークンの取得
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // トークンがあればリクエストヘッダーに追加
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance

const initializeSession = async (tenantId: number, storeId: number) => {
  const response = await axios.get('/session/init', {
    params: { tenantId, storeId },
  })
  console.log(response.data)
}
// テナントIDと店舗IDを渡してセッションを初期化
initializeSession(1, 1) // 実際のテナントIDと店舗IDを使用
