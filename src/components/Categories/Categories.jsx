import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { CategoryCard } from './CategoryCard'

export const Categories = () => {
    const {categories}=useOutletContext()

  return (
    <div className='mt-30' >
      <h1 className='text-center text-4xl font-bold'>Categorias</h1>
      
      <div className='mt-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      
        {categories.map((category)=>(
          <CategoryCard
            key={category._id}
            id={category._id}
            name={category.name}
            picture={category.picture}
            navigateToCategoryHandler={()=>{}}
          />
        ))
      }
    </div>
    </div>
  )
}


