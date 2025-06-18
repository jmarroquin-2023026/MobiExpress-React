import React, { useEffect } from 'react'
import { useCategories } from '../shared/hooks/categories/useCategories'
import { DashboardContent } from '../components/Categories/CategoryContent'
import { useLocation } from 'react-router-dom'

export const ProductsPage = () => {
  const { getProducts, allProducts } = useCategories()
  const location = useLocation()

  useEffect(() => {
    // Se ejecuta cada vez que cambia la ruta (location)
    if (location.pathname === '/dashboard/categories') {
      getCategories()
    }
  }, [location])

  return (
    <div>
      <DashboardContent categories={allCategories} getCategories={getCategories} />
    </div>
  )
}
