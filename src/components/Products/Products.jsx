import React, { useState, useMemo } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { SidebarFilter } from '../SideBarFilter'

export const Products = () => {
  const { products, searchTerm } = useOutletContext()
  const navigate = useNavigate()

  // Estado para categorías seleccionadas en el filtro
  const [selectedCategories, setSelectedCategories] = useState([])

  // Obtener todas las categorías únicas disponibles en los productos
  const allCategories = useMemo(() => {
    const categories = products.flatMap((product) =>
      Array.isArray(product.category) && product.category.length > 0
        ? product.category.map((c) => c.name)
        : ['Sin categoría']
    )
    return Array.from(new Set(categories))
  }, [products])

  // Manejar cambio en selección de categorías del filtro
  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  // Filtrar productos por término de búsqueda (case insensitive)
  const searchedProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  // Filtrar por categorías seleccionadas además del término de búsqueda
  const finalProducts = useMemo(() => {
    if (selectedCategories.length === 0) return searchedProducts

    return searchedProducts.filter((product) => {
      const productCategories =
        Array.isArray(product.category) && product.category.length > 0
          ? product.category.map((c) => c.name)
          : ['Sin categoría']

      return selectedCategories.some((category) =>
        productCategories.includes(category)
      )
    })
  }, [searchedProducts, selectedCategories])

  // Navegar a formulario para agregar producto
  const handleAddProduct = () => {
    navigate('/products/form')
  }
   const isAdmin = JSON.parse(localStorage.getItem("user")).role === "ADMIN"

  return (
    <div className="flex">
      {/* Sidebar con filtro de categorías */}
      <SidebarFilter
        categories={allCategories}
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />

      {/* Contenido principal */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Productos</h2>
          {isAdmin?(
            <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Agregar
          </button>
          ):(
            <></>
          )}
        </div>

        {/* Lista de productos filtrados */}
        <div className="flex flex-wrap gap-4">
          {finalProducts.length > 0 ? (
            finalProducts.map((product) => (
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
            ))
          ) : (
            <p>No se encontraron productos que coincidan con los filtros.</p>
          )}
        </div>
      </div>
    </div>
  )
}
