import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { CategoryCard } from './CategoryCard'

export const Categories = () => {
  const { categories } = useOutletContext()
  const navigate = useNavigate()

  // Verificar si el usuario es ADMIN
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.role === 'ADMIN'

  return (
    <div className='mt-20 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Categorías</h1>

        {isAdmin && (
          <button
            onClick={() => navigate('/dashboard/addCategory')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
          >
            + Nueva Categoría
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            id={category._id}
            name={category.name}
            picture={category.picture}
            navigateToCategoryHandler={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
