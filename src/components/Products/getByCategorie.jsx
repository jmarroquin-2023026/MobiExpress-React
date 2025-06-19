import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGetByCategory } from "../../shared/hooks/products/useGetByCategory"
import { ProductCard } from "../../components/Products/ProductCard"

export const getByCategorie = () => {
  const { id } = useParams()
  const { getByCategory, products, isLoading, error } = useGetByCategory()

  useEffect(() => {
    if (id) {
      getByCategory(id)
    }
  }, [id])

  if (isLoading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
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
        <p>No se encontraron productos</p>
      )}
    </div>
  )
}
