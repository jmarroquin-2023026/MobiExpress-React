

import React, { useState } from 'react'
import { addCardRequest } from '../../../services/Cardapi'
import toast from 'react-hot-toast'

export const useAddCard = () => {
    const[isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const add=async(data)=>{
        setIsLoading(true)
        const response=await addCardRequest(data)
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                const arrayErrors=response?.e?.data?.error
                for(const error of arrayErrors){
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg||
                response?.e?.data?.msg||
                'Error al intentar registrar la tarjeta'
            )
        }
        setError(false)
        return toast.success('Tarjeta registrada')
    }
  return {
    add,
    isLoading,
    error,
    setError
  }
}

