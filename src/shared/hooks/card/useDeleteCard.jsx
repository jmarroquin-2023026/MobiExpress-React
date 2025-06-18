import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteCardRequest } from '../../../services/Cardapi'

export const useDeleteCard = () => {
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const deleteCard=async(id)=>{
        setIsLoading(true)
        const response=await deleteCardRequest(id)
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                const arrayErrors=response?.e?.response?.data?.errors
                for(const error of arrayErrors){
                    toast.error(error.msg)
                }
            }else{
                toast.error(
                    response?.e?.response?.data?.msg||
                    response?.e?.data?.msg||
                    'Error al elminar la tarjeta'
                )
            }
            return false
        }

        setError(false)
        toast.success('Categoria eliminada correctamente')
        return true
    }
  return {
    deleteCard,
    isLoading,
    error,
    setError
  }
}


