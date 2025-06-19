import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { CategoryCard } from './CategoryCard'

export const Categories = () => {
    const {categories}=useOutletContext()

  return (
    <div className='mt-30'>
      <h1>Categorias</h1>
      {
        categories.map((category)=>(
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
  )
}


