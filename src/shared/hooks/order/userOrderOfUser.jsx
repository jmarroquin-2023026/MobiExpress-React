import { useState } from 'react'
 
import toast from 'react-hot-toast'
import { getOrdersByUserRequest } from '../../../services/Orderapi'

export const useUserOrders = () => {
  const [orders, setOrders] = useState([])

  const getUserOrders = async () => {
    const response = await getOrdersByUserRequest()
    if (response.error) {
      toast.error('Error al obtener los pedidos del usuario')
      return
    }

    setOrders(response.data.orders)
  }

  return {
    getUserOrders,
    userOrders: orders
  }
}
