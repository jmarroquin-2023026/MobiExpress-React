import { useEffect, useState, useMemo } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useGetByCategory } from "../../shared/hooks/products/useGetByCategory"
import { ProductCard } from "./ProductCard"
import { SidebarFilter } from "../SideBarFilter"

export const GetByCategorie = () => {
  const { id } = useParams()
  const { getByCategory, products, isLoading, error } = useGetByCategory()

  useEffect(() => {
    if (id) {
      getByCategory(id)
    }
  }, [id])

  const { searchTerm } = useOutletContext()
  const navigate = useNavigate()

  const [selectedCategories, setSelectedCategories] = useState([])

  // Obtener categorías únicas
  const allCategories = useMemo(() => {
    const categories = products.flatMap((product) =>
      Array.isArray(product.category) && product.category.length > 0
        ? product.category.map((c) => c.name)
        : ["Sin categoría"]
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

  // Filtrar por término de búsqueda
  const searchedProducts = useMemo(() => {
  if (!searchTerm) return products
  return products.filter((product) =>
    (product.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [products, searchTerm])


  // Filtrar por categorías seleccionadas
  const finalProducts = useMemo(() => {
    if (selectedCategories.length === 0) return searchedProducts

    return searchedProducts.filter((product) => {
      const productCategories =
        Array.isArray(product.category) && product.category.length > 0
          ? product.category.map((c) => c.name)
          : ["Sin categoría"]

      return selectedCategories.some((category) =>
        productCategories.includes(category)
      )
    })
  }, [searchedProducts, selectedCategories])

  const renderStatusMessage = (message, color = 'text-gray-300') => (
    <div className="flex justify-center items-center min-h-screen">
      <p className={`${color} text-lg`}>{message}</p>
    </div>
  )
  
  if (isLoading) return renderStatusMessage('Cargando...')
  if (error) return renderStatusMessage('Error, la categoria aun no cuenta con productos', 'text-red-500')
  if (!products) return renderStatusMessage('No se encontrarón productos para esta categoria')
  return (
    <div className="flex mt-26">
        <SidebarFilter
        categories={allCategories}
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />
      <div className="p-4 flex-1">
    
      <h1 className="text-center text-4xl font-bold">Lista de productos</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  : "Sin categoría"
              }
              price={product.price}
              brand={product.brand}
              stock={product.stock}
              images={product.images}
              navigateToProductHandler={() => {}}
            />
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
    </div>
  )
}
