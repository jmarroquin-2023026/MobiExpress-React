import React, { useState } from 'react'
import { getCategoriesRequest } from '../../../services/Categoryapi'
import toast from 'react-hot-toast'

export const useCategories = () => {
    const [categories,setCategories]=useState(null)
    const getCategories=async()=>{
        const categoriesData=await getCategoriesRequest()
         console.log('Respuesta de categorías:', categoriesData)
        if(categoriesData.error){
            return toast.error(
                categoriesData?.e?.response?.data||
                'Error al obtener las categorias'
            )
        }
        setCategories(
            {
                categories: categoriesData.data.categories
            }
        )
    }

  return {
    getCategories,
    isFetching:!categories,
    allCategories: categories?.categories||[]
  }
}

