import React, { useEffect } from 'react'
import { useCategories } from '../shared/hooks/categories/useCategories'
import { DashboardContent } from '../components/Categories/CategoryContent'
import { useLocation } from 'react-router-dom'

export const CategoriesPage = () => {
  const { getCategories, allCategories } = useCategories()
  const location = useLocation()

  useEffect(() => {
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
