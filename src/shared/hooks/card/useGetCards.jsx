import { useEffect, useState } from 'react'
import { getCardsByUserRequest } from '../../../services/Cardapi'
import toast from 'react-hot-toast'

export const useGetCards = () => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getCards = async () => {
    try {
      const response = await getCardsByUserRequest()
      setCards(response.data.cards || [])
    } catch (e) {
      const msg = e?.response?.data?.message || 'Error al obtener las tarjetas'
      toast.error(msg)
      setError(msg)
    } 
  }

  useEffect(() => {
    getCards()
  }, [])

  return {
    cards,
    isLoading,
    error
  }
}
