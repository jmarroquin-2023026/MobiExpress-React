import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { updateProductRequest } from '../../../services/Productsapi'

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateProduct = async (id, product) => {
    setIsLoading(true)
    try {
      const response = await updateProductRequest(id, product)
      setIsLoading(false)
      toast.success('Producto actualizado exitosamente')
      setError(false)
      return true
    } catch (e) {
      setIsLoading(false)
      setError(true)

      const arrayErrors = e?.response?.data?.errors
      if (arrayErrors && arrayErrors.length) {
        arrayErrors.forEach(error => toast.error(error.msg))
      } else {
        toast.error(
          e?.response?.data?.msg ||
          'Error al actualizar producto. Intenta de nuevo'
        )
      }
      return false
    }
  }

  return {
    updateProduct,
    isLoading,
    error,
    setError,
  }
}
