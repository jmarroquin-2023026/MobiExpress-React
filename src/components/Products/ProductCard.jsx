import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteProduct } from '../../shared/hooks/products/useDeleteProduct'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

export const ProductCard = ({ id, name, description, category, price, brand, stock, images, navigateToProductHandler }) => {

  const ProductImage = ({ urls = [] }) => (
    <div className="relative pt-[100%] bg-gray-100 overflow-hidden rounded-t-lg">
      {urls.length > 0 ? (
        <img
          src={`http://localhost:2636/uploads/img/products/${urls[0]}`}
          alt={name}
          className="absolute top-0 left-0 object-contain p-4"
        />
      ) : (
        <div className="absolute top-0 left-0 w-34 h-52 flex items-center justify-center text-gray-400">
          Sin imagen
        </div>
      )}
    </div>
  )

  const { deleteProduct, isLoading } = useDeleteProduct()
  const navigate = useNavigate()

  const handleNavigateToProduct = () => {
    navigateToProductHandler(id)
  }

  const handleEditButton = (e) => {
    e.stopPropagation()
    navigate(`/products/updateProduct/${id}`)
  }

  const handleDetailsButton = (e) => {
    e.stopPropagation()
    navigate(`/products/details/${id}`)
  }

  const handleDeleteButton = async (e) => {
    e.stopPropagation()
    const confirmed = window.confirm('¿Estás seguro de eliminar este producto?')
    if (!confirmed) return

    const success = await deleteProduct(id)
    if (success) {
      toast.success('Producto eliminado con éxito')
      window.location.reload()
    }
  }

  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role === "ADMIN"

  return (
    isAdmin ? (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4">
          <img
            src={images.length ? `http://localhost:2636/uploads/img/products/${images[0]}` : 'https://via.placeholder.com/50'}
            alt={name}
            className="w-12 h-12 object-contain"
          />
          <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded">{name}</span>
        </div>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
            onClick={handleDetailsButton} // <-- sin pasar (id), solo referencia la función
          >
            Detalles
          </button>


          <button
            onClick={handleEditButton}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Actualizar
          </button>

          <button
            onClick={handleDeleteButton}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    ) : (
      <div
        onClick={handleNavigateToProduct}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer w-56"
      >
        <ProductImage urls={images} />

        <div className="p-4">
          <div className="w-full flex">
            <span className="text-xs text-gray-400">{brand}</span>
          </div>

          <p className="text-black text-sm line-clamp-2 mb-3 text-left">{description}</p>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            <span className="font-bold text-amber-500">Q{price}</span>
          </div>
          <div className="w-full flex">
            
            {category && (
              <span className="inline-block text-gray-400 py-1 text-[10px] xs:text-xx sm:text-xs rounded-full whitespace-nowrap">
                {category}
              </span>
              
            )}
            
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
            onClick={handleDetailsButton} // <-- sin pasar (id), solo referencia la función
          >
            Ver Detalles
          </button>
        </div>
      </div>
    )
  )
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  navigateToProductHandler: PropTypes.func.isRequired
}
