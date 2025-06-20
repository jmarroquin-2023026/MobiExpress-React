import React, { useEffect, useState } from 'react'
import { useProducts } from '../shared/hooks/products/useProducts'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

export const ProductsPage = () => {
  const { getProducts, allProducts } = useProducts()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (location.pathname === '/products/list') {
      getProducts()
    }
  }, [location])

  return (
    <div className="mt-36">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={{ products: allProducts, getProducts, searchTerm }} />
    </div>
  )
}
