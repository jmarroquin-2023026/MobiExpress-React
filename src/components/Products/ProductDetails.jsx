import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetById } from '../../shared/hooks/products/useGetById'
import toast from 'react-hot-toast'

export const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, isLoading, error } = useGetById(id)
  const [quantity, setQuantity] = useState(1)

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <div className="bg-slate-700 rounded-3xl shadow-xl w-full max-w-5xl p-6 md:p-10 text-white space-y-10">

        <h1 className="text-center text-4xl font-extrabold text-white">Detalles del Producto</h1>

        <div>
          <h2 className="text-2xl font-bold mb-3">Galería</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:2636/uploads/img/products/${image}`}
                  alt={`Product image ${index}`}
                  className="w-60 h-40 object-cover rounded-lg shadow"
                />
              ))
            ) : (
              <p className="text-gray-400">Sin imágenes disponibles</p>
            )}
          </div>
        </div>

        <div className="border border-slate-500 rounded-xl p-6 bg-slate-800 max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-center">{product.name}</h2>

          <p className="text-slate-300 text-base">
            <span className="font-semibold">Descripción:</span> {product.description}
          </p>

          <p className="text-slate-300 text-base">
            <span className="font-semibold">Precio:</span> ${Number(product.price).toFixed(2)}
          </p>

          <p className="text-slate-300 text-base">
            <span className="font-semibold">Stock disponible:</span> {product.stock}
          </p>

          <p className="text-slate-300 text-base">
            <span className="font-semibold">Categoría:</span> {product.category?.name || 'Sin categoría'}
          </p>

          {/* Contador y botón */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={decrease}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-white"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={increase}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-white"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToOrder}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold text-lg"
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  )
}
