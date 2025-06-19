import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addProductRequest } from '../../../services/Productsapi'

export const useAddProduct = () => {
    const[isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const addProduct=async(category)=>{
        setIsLoading(true)
        const response=await addProductRequest(category)
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
                'Error al agregar un producto. Intenta de nuevo'
            )
        }
        setError(false)
        return toast.success('Registro exitoso')
    }

  return {
    addProduct,
    isLoading,
    error,
    setError
  }
}


