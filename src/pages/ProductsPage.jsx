import React, { useEffect, useState } from 'react'
import { useProducts } from '../shared/hooks/products/useProducts'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

export const ProductsPage = () => {
  const { getProducts, allProducts } = useProducts()
  const location = useLocation()
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate('/products/form')
  }


  useEffect(() => {
    if (location.pathname === '/products/list') {
      getProducts()
    }
  }, [location])

  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role === "ADMIN"
  return (
    isAdmin ? (
      <div>
        <Navbar />
         <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Agregar
        </button>
        <Outlet context={{ products: allProducts, getProducts }} />
       
      </div>
    ) : (
      <div>
        <Navbar />
        <Outlet context={{ products: allProducts, getProducts }} />
      </div>
    )

  )
}
