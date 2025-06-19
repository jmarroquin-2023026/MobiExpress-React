import { useEffect, useState } from "react"
import { getCategoriesRequest } from "../../../services/Categoryapi"

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoriesRequest()
        setCategories(response.data.categories) // asegúrate que aquí esté el array correcto
      } catch (err) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { categories, isLoading, error }
}
