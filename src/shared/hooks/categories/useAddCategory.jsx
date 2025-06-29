import React, { useState } from 'react'
import { addCategoryRequest } from '../../../services/Categoryapi'
import toast from 'react-hot-toast'

export const useAddCategory = () => {
    const[isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const addCategory=async(category)=>{
        setIsLoading(true)
        const response=await addCategoryRequest(category)
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
                'Error al agregar categoria. Intenta de nuevo'
            )
        }
        setError(false)
        return toast.success('Registro exitoso')
    }

  return {
    addCategory,
    isLoading,
    error,
    setError
  }
}


