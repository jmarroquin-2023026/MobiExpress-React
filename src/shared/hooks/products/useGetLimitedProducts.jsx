import { useEffect, useState } from 'react'
import { getLimitedProductsRequest } from '../../../services/Productsapi'
import toast from 'react-hot-toast'

export const useGetLimitedProducts = (limit = 10) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await getLimitedProductsRequest(limit)
        setProducts(response.data.products || [])
        setIsLoading(false)
      } catch (err) {
        setError(true)
        setIsLoading(false)
        toast.error('Error al cargar productos')
      }
    }

    fetchProducts()
  }, [limit])

  return { products, isLoading, error }
}
