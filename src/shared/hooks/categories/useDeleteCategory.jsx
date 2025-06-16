import React from 'react'
import { useState } from 'react'
import { deleteCategoryRequest } from '../../../services/Categoryapi'
import toast from 'react-hot-toast'

export const useDeleteCategory = () => {
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)

    const deleteCategory=async(id)=>{
        setIsLoading(true)
        const response=await deleteCategoryRequest(id)
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
                    'Error al elminar categoria'
                )
            }
            return false
        }

        setError(false)
        toast.success('Categoria eliminada correctamente')
        return true
    }
  return {
    deleteCategory,
    isLoading,
    error,
    setError
  }
}


