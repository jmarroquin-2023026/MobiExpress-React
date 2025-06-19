import React, { useState } from 'react'
import { getProductsRequest } from '../../../services/Productsapi'
import toast from 'react-hot-toast'

export const useProducts = () => {
    const [products,setProducts]=useState(null)

    const getProducts=async()=>{
        const productsData=await getProductsRequest()
         console.log('Respuesta de productos:', productsData)
        if(productsData.error){
            return toast.error(
                productsData?.e?.response?.data||
                'Error al obtener los Productos'
            )
        }
        setProducts(
            {
                products: productsData.data.products
            }
        )
    }
return {
    getProducts: getProducts,
    isFetching:!products,
    allProducts: products?.products||[]
    }
}

