import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { ProductCard } from './ProductCard'

export const Products = () => {
  const { products, searchTerm } = useOutletContext()
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate('/products/form')
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Productos</h2>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredProducts.map((product) => (
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
