import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteProductRequest } from '../../../services/Productsapi'

export const useDeleteProduct = () => {
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const deleteProduct=async(id)=>{
        setIsLoading(true)
        const response=await deleteProductRequest(id)
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
                    'Error al elminar el producto'
                )
            }
            return false
        }

        setError(false)
        toast.success('Producto eliminado correctamente')
        return true
    }
  return {
    deleteProduct,
    isLoading,
    error,
    setError
  }
}


