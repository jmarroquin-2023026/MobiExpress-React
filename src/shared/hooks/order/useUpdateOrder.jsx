import React, { useState } from 'react'
import { updateOrderRequest } from '../../../services/Orderapi'
import toast from 'react-hot-toast'

export const useUpdateOrder = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateOrder = async (id, newStatus) => {
    setIsLoading(true)
    try {
      const response = await updateOrderRequest(id, { status: newStatus })
      setIsLoading(false)
      toast.success('Pedido actualizado exitosamente')
      setError(false)
      return true
    } catch (e) {
      setIsLoading(false)
      setError(true)

      const arrayErrors = e?.response?.data?.errors;
      if (arrayErrors && arrayErrors.length) {
        arrayErrors.forEach(error => toast.error(error.msg))
      } else {
        toast.error(
          e?.response?.data?.msg ||
          'Error al actualizar pedidos. Intenta de nuevo'
        )
      }
      return false
    }
  }

  return {
    updateOrder,
    isLoading,
    error,
    setError,
  }
}