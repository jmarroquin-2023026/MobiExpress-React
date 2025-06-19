import React, { useState } from 'react'
import { addOrderRequest } from '../../../services/Orderapi'
import toast from 'react-hot-toast'

export const useAddOrder = () => {
    const[isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const addOrder=async(order)=>{
        setIsLoading(true)
        const response=await addOrderRequest(order)
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                const arrayErrors=response?.e?.response?.data?.errors
                for(const error of arrayErrors){
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg||
                response?.e?.data?.msg||
                'Error al agregar pedido. Intenta de nuevo'
            )
        }
        setError(false)
        return toast.success('Registro exitoso')
    }

  return {
    addOrder,
    isLoading,
    error,
    setError
  }
}
