import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { ProductCard } from './ProductCard'

export const Products = () => {
  const { products } = useOutletContext()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            category={
              Array.isArray(product.category) && product.category.length > 0
                ? product.category[0].name
                : 'Sin categoría'
            }
            price={product.price}
            brand={product.brand}
            stock={product.stock}
            images={product.images}
            navigateToProductHandler={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
