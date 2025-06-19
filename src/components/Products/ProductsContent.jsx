import React from 'react'
import { Outlet } from 'react-router-dom'

export const ProductsContent = ({products=[],getProducts}) => {
  return (
    <div>
      <Outlet context={{products,getProducts}}/>
    </div>
  )
}

