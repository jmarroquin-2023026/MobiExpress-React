import { Link } from "react-router-dom"
import { useCategories } from "../shared/hooks/categories/useCategories"
import { useGetLimitedProducts } from "../shared/hooks/products/useGetLimitedProducts"

export const Home =()=> {
  const { categories, isLoading: loadingCategories, error: errorCategories } = useCategories()
  console.log("categorías:", categories)

  const { products, isLoading: loadingProducts, error: errorProducts } = useGetLimitedProducts(10)

  if (loadingCategories || loadingProducts) return <p>Cargando productos...</p>
  if (errorCategories || errorProducts) return <p>Error al cargar datos</p>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-lg mx-4 mt-4">
        <img
          src="/images/hero-bg.png"
          alt="Elegant outdoor event setup"
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Mobiliario
            <br />
            para tus
            <br />
            fiestas
          </h1>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array.isArray(categories) && categories.map((category) => (
            <Link key={category.id} to={`/dashboard/getProductById/${category._id}`}>
              <div className="bg-white rounded shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="h-48">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-700">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Special Recommendations Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="text-orange-500 mr-2">✨</span>
            Recomendaciones especiales
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(products) && products.map((product) => (
              <div key={product._id} className="bg-white rounded shadow hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-32 bg-gray-100">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-bold text-orange-600 mb-2">Q{product.price}</p>
                  <Link to={`/product/${product._id}`}>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-2 rounded">
                      Detalles
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
