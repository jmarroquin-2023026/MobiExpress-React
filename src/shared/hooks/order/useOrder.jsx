import React, { useState } from 'react'
import { getOrdersRequest } from '../../../services/Orderapi'
import toast from 'react-hot-toast'

export const useOrder = () => {
    const [orders,setOrders]=useState(null)
    const getOrders=async()=>{
        const orderData=await getOrdersRequest()
         console.log('Respuesta de pedidos:', orderData)
        if(orderData.error){
            return toast.error(
                orderData?.e?.response?.data||
                'Error al obtener los pedidos'
            )
        }
        setOrders(
            {
                order: orderData.data.order
            }
        )
    }

  return {
    getOrders,
    isFetching:!orders,
    allOrders: orders?.orders||[]
  }
}