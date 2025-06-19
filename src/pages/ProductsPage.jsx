import React, { useEffect } from 'react'
import { useProducts } from '../shared/hooks/products/useProducts'
import { useLocation, Outlet } from 'react-router-dom'

export const ProductsPage = () => {
  const { getProducts, allProducts } = useProducts()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/products/list') {
      getProducts()
    }
  }, [location])

  return (
    <div className='mt-36'>
      <Outlet context={{ products: allProducts, getProducts }} />
    </div>
  )
}
