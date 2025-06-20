import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useCategories } from "../shared/hooks/categories/useCategories"
import { useGetLimitedProducts } from "../shared/hooks/products/useGetLimitedProducts"
import Navbar from "./NavBar/NavBar"

export const Home = () => {
  const {
    allCategories: categories,
    isFetching: loadingCategories,
    getCategories
  } = useCategories()

  const {
    products,
    isLoading: loadingProducts,
    error: errorProducts
  } = useGetLimitedProducts(10)

  // ⚠️ Llama a getCategories al montar el componente
  useEffect(() => {
    getCategories()
  }, [])

  if (loadingCategories || loadingProducts)
    return <p className="text-center mt-12 text-lg">Cargando productos...</p>

  if (errorProducts)
    return <p className="text-center mt-12 text-lg text-red-600">Error al cargar productos</p>
  return (
    <>

    <Navbar/>
    <div className="mt-30 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-lg mx-4 mt-4 shadow-lg">
        <img
          src="/images/hero-bg.png"
          alt="Elegant outdoor event setup"
          className="object-cover w-full h-full rounded-lg transform hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute inset-0  items-center justify-start  text-white">
          <div className="relative w-full h-full overflow-hidden">
            <img src="/images/HomePage.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
            <h1 className="text-3xl md:text-6xl font-extrabold leading-tight drop-shadow-lg absolute inset-0 flex items-center justify-start pl-8 md:pl-16 text-white">
            Mobiliario
            <br />
            para tus
            <br />
            fiestas
          </h1>
            </div>
          
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {Array.isArray(categories) &&
            categories.slice(0,3).map((category) => (
              <Link
                key={category._id}
                to={`/dashboard/searchByCategory/${category._id}`}
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.picture ? `http://localhost:2636/uploads/img/categories/${category.picture}` : "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-700 group-hover:text-yellow-500 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-yellow-500 mr-3 text-2xl">✨</span>
          Recomendaciones especiales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
              >
                <div className="h-40 bg-white overflow-hidden rounded-t-lg flex items-center justify-center">
  <img
    src={
      product.images?.length > 0
        ? `http://localhost:2636/uploads/img/products/${product.images[0]}`
        : "/placeholder.svg"
    }
    alt={product.name}
    className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-500"
  />
</div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-orange-600 font-bold text-lg mb-4">Q{product.price}</p>
                  <Link to={`/product/${product._id}`} className="mt-auto">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm py-2 rounded shadow-sm transition-colors duration-300">
                      Ver detalles
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
        </>
  )
}
