// useGetByCategory.jsx
import React, { useState } from 'react'
import { getByCategoryRequest } from '../../../services/Productsapi'
import toast from 'react-hot-toast'

export const useGetByCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([]) // ← Agregado

  const getByCategory = async (id) => {
    setIsLoading(true)
    try {
      const response = await getByCategoryRequest(id)
      setProducts(response.data.products) // Asegúrate que la respuesta tenga .products
      setIsLoading(false)
      toast.success('Productos encontrados con esta categoría:')
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
          'Error al buscar productos. Intenta de nuevo'
        )
      }
      return false;
    }
  };

  return {
    getByCategory,
    isLoading,
    error,
    products, // ← Agregado
    setError,
  };
};
