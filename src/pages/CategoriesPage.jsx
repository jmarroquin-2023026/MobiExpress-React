import React, { useEffect } from 'react'
import { useCategories } from '../shared/hooks/categories/useCategories'
import { DashboardContent } from '../components/Categories/CategoryContent'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

export const CategoriesPage = () => {
  const { getCategories, allCategories } = useCategories()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/dashboard/categories') {
      getCategories()
    }
  }, [location])

  return (
    <div className='mt-36'>
      <Navbar/>
      <DashboardContent categories={allCategories} getCategories={getCategories} />
    </div>
  )
}
