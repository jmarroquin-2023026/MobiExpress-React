import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAddOrder } from '../../shared/hooks/order/useAddOrder'
import { CardForm } from '../Card/CardForm'
import { SavedCards } from '../Card/SavedCards'
import Navbar from '../NavBar/NavBar'


export const OrderForm = () => {
  const [order, setOrder] = useState([])
  const [dueDate, setDueDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const { addOrder, isLoading } = useAddOrder()
  const navigate = useNavigate()

  const loadOrder = () => {
  const stored = JSON.parse(localStorage.getItem('order')) || []
  console.log("Datos cargados desde localStorage:", stored)
  setOrder(stored)
}


  useEffect(() => {
    loadOrder()
  }, [])

 const handleSubmit = async () => {
  if (!order.length) {
    return toast.error('No hay productos para registrar')
  }

  if (!dueDate) {
    return toast.error('Por favor selecciona la fecha de entrega')
  }

  if (!returnDate) {
    return toast.error('Por favor selecciona la fecha de devolución')
  }

  if (new Date(returnDate) < new Date(dueDate)) {
    return toast.error('La fecha de devolución no puede ser anterior a la fecha de entrega')
  }

  const payload = {
    products: order.map(p => ({
      product: p._id,
      quantity: p.quantity
    })),
    dueDate,
    returnDate
  }

  console.log("Payload enviado al backend:", payload)

  const res = await addOrder(payload)
  if (res) {
    localStorage.removeItem('order')
    setOrder([])

  }
}




  const handleDeleteProduct = (id) => {
    const updated = order.filter(p => p._id !== id)
    setOrder(updated)
    localStorage.setItem('order', JSON.stringify(updated))
    toast.success('Producto eliminado del pedido')
  }

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6">
        <Navbar/>
      <h1 className="text-3xl font-bold text-center">Registrar Pedido</h1>

      {/* Mostrar productos del pedido */}
      <div className="space-y-4">
        {order.length === 0 ? (
          <p className="text-gray-500 text-center">No hay productos agregados.</p>
        ) : (
          order.map(p => (
            <div key={p._id} className="border p-4 rounded bg-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p>Cantidad: {p.quantity}</p>
                <p>Precio: Q{Number(p.price).toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(p._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Fechas */}
      <div>
        <label>Fecha de entrega</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label>Fecha de devolución</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      {/* Forma de pago */}
      <div>
        <label>Forma de pago</label>
        <select
          className="w-full p-2 border rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="efectivo">Efectivo</option>
        </select>
      </div>

      {/* Mostrar tarjeta si aplica */}
      {paymentMethod === 'tarjeta' && (
        <>
          <CardForm />
          <SavedCards />
        </>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        {isLoading ? 'Registrando...' : 'Registrar Pedido'}
      </button>
    </div>
  )
}
