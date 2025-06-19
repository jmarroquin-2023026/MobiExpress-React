import React, { useEffect } from 'react'
import { useProducts } from '../shared/hooks/products/useProducts'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

export const ProductsPage = () => {
  const { getProducts, allProducts } = useProducts()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/products/list') {
      getProducts()
    }
  }, [location])

  return (
    <div>
      <Navbar/>
      <Outlet context={{ products: allProducts, getProducts }} />
      
    </div>
  )
}
