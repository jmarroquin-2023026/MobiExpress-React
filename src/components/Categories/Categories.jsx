import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { CategoryCard } from './CategoryCard'

export const Categories = () => {
    const {categories}=useOutletContext()

  return (
    <div>
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


