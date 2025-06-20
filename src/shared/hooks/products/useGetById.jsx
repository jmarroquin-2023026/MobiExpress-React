import { useEffect, useState } from 'react'
import { getProductRequest } from '../../../services/Productsapi'
import toast from 'react-hot-toast'

export const useGetById = (id) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)

      const response = await getProductRequest(id)
      if (response.error) {
        setError(response.e)
        toast.error(
          response?.e?.response?.data?.message ||
          'Error al obtener el detalle del producto'
        )
      } else {
        setProduct(response.data.message)
      }

      setIsLoading(false)
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  return {
    product,
    isLoading,
    error,
  }
}
