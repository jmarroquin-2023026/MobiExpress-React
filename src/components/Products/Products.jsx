import React, { useState, useMemo } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { SidebarFilter } from '../SideBarFilter'

export const Products = () => {
  const { products, searchTerm } = useOutletContext()
  const navigate = useNavigate()

  const [selectedCategories, setSelectedCategories] = useState([])

  const allCategories = useMemo(() => {
    const categories = products.flatMap((product) =>
      Array.isArray(product.category) && product.category.length > 0
        ? product.category.map((c) => c.name)
        : ['Sin categoría']
    )
    return Array.from(new Set(categories))
  }, [products])

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const searchedProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    )
  }, [products, searchTerm])

  const finalProducts = useMemo(() => {
    if (selectedCategories.length === 0) return searchedProducts

    return searchedProducts.filter((product) => {
      const productCategories = Array.isArray(product.category) && product.category.length > 0
        ? product.category.map((c) => c.name)
        : ['Sin categoría']

      return selectedCategories.some((category) => productCategories.includes(category))
    })
  }, [searchedProducts, selectedCategories])

  const handleAddProduct = () => {
    navigate('/products/form')
  }


  console.log("Products:", products)



  return (
    <div className="flex">
      <SidebarFilter
        categories={allCategories}
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />

      <div className="flex-1 p-4">
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
          {finalProducts.map((product) => (
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
              navigateToProductHandler={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
