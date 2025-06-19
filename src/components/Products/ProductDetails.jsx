import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductDetails } from '../../shared/hooks/Product/useProductDetails'

export const ProductDetails = () => {
  const { id } = useParams()
  const { product, isLoading, error } = useProductDetails(id)

  const renderStatusMessage = (message, color = 'text-gray-300') => (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <p className={`${color} text-lg`}>{message}</p>
    </div>
  )

  if (isLoading) return renderStatusMessage('Cargando...')
  if (error) return renderStatusMessage('Error al cargar el producto', 'text-red-500')
  if (!product) return renderStatusMessage('No se encontró el producto')

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <div className="bg-slate-700 rounded-3xl shadow-xl w-full max-w-5xl p-6 md:p-10 text-white space-y-8">

        <h1 className="text-center text-4xl font-extrabold text-white">Detalles del Producto</h1>

        <div>
          <h2 className="text-2xl font-bold mb-3">Galería</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {product.photos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:2636/uploads/img/products/${photo}`}
                alt={`Product image ${index}`}
                className="w-60 h-40 object-cover rounded-lg shadow"
              />
            ))}
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
        </div>
      </div>
    </div>
  )
}
