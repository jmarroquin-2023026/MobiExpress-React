import { useState } from 'react'
import { getCategoriesRequest } from '../../../services/Categoryapi'
import toast from 'react-hot-toast'

export const useCategories = () => {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(false)

  const getCategories = async () => {
    const categoriesData = await getCategoriesRequest()
    if (categoriesData.error) {
      setError(true)
      return toast.error(
        categoriesData?.e?.response?.data ||
        'Error al obtener las categorías'
      )
    }
    setCategories({ categories: categoriesData.data.categories })
  }

  return {
    getCategories,
    isFetching: !categories,
    allCategories: categories?.categories || [],
    error,
  }
}
