import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetById } from '../../shared/hooks/products/useGetById'
import toast from 'react-hot-toast'

export const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, isLoading, error } = useGetById(id)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(null)

  const renderStatusMessage = (message, color = 'text-gray-300') => (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <p className={`${color} text-lg`}>{message}</p>
    </div>
  )

  const increase = () => {
    if (product && quantity < product.stock) {
      setQuantity(q => q + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  const handleAddToOrder = () => {
    if (!product) return
    const storedOrder = JSON.parse(localStorage.getItem('order')) || []
    const alreadyExists = storedOrder.find(p => p._id === product._id)
    if (alreadyExists) {
      toast.error('Este producto ya fue agregado al pedido')
      return
    }
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
      quantity,
      stock: product.stock,
    }
    localStorage.setItem('order', JSON.stringify([...storedOrder, productToAdd]))
    toast.success('Producto agregado al pedido')
  }

  if (isLoading) return renderStatusMessage('Cargando...')
  if (error) return renderStatusMessage('Error al cargar el producto', 'text-red-500')
  if (!product) return renderStatusMessage('No se encontró el producto')

  const selectedImage = mainImage || (product.images?.[0] && `http://localhost:2636/uploads/img/products/${product.images[0]}`)

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 0">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Imagen Principal y Carrusel */}
        <div className="flex flex-col items-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Imagen principal"
              className="w-full max-w-md h-64 object-contain border rounded-lg shadow"
            />
          ) : (
            <p className="text-gray-500">Sin imagen</p>
          )}
          <div className="mt-4 flex justify-center gap-3 overflow-x-auto max-w-md">
            {product.images && product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:2636/uploads/img/products/${img}`}
                alt={`Miniatura ${index}`}
                className={`w-16 h-16 object-contain border rounded cursor-pointer ${selectedImage === `http://localhost:2636/uploads/img/products/${img}` ? 'border-yellow-500' : 'border-gray-300'}`}
                onClick={() => setMainImage(`http://localhost:2636/uploads/img/products/${img}`)}
              />
            ))}
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600"><span className="font-semibold">Descripción:</span> {product.description}</p>
          <p className="text-gray-600"><span className="font-semibold">Stock Disponible:</span> {product.stock}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-yellow-600">Q{Number(product.price).toFixed(2)}</span>
            <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded">{product.category }</span>
          </div>

          {/* Control de cantidad */}
          <div className="flex items-center gap-3">
            <button
              onClick={decrease}
              className="w-8 h-8 rounded-full bg-yellow-500 text-white text-xl font-bold hover:bg-yellow-600"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={increase}
              className="w-8 h-8 rounded-full bg-yellow-500 text-white text-xl font-bold hover:bg-yellow-600"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToOrder}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded font-semibold shadow"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
