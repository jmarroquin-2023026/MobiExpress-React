import React, { useEffect } from 'react'
import { useOrder } from '../../shared/hooks/order/useOrder'
import { useUpdateOrder } from '../../shared/hooks/order/useUpdateOrder'
import Navbar from '../NavBar/NavBar'

export const OrderCard = () => {
  const { getOrders, allOrders } = useOrder()
  const { isLoading } = useUpdateOrder()

  useEffect(() => {
    getOrders()
  }, [])

  if (allOrders.length === 0)
    return <p className="text-center py-4">No hay pedidos registrados.</p>

  return (
    <div className="px-6 py-8">
      <Navbar />
      <h2 className="mt-20 text-3xl font-bold mb-8 text-center text-gray-800">Pedidos Registrados</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allOrders.map((order) => (
          <div
            key={order._id}
            className="relative bg-gradient-to-br from-indigo-800 to-indigo-700 rounded-2xl p-5 text-white shadow-xl border border-indigo-300/20"
          >
            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">ID del Pedido</div>
              <div className="text-sm font-mono break-words">{order._id}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Cliente</div>
              <div className="text-base font-semibold">
                {order.user ? `${order.user.name} ${order.user.surname}` : 'Sin nombre de cliente'}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Total</div>
              <div className="text-lg font-bold">Q{order.total.toFixed(2)}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Estado actual</div>
              {order.status === 'cancelled' ? (
                <button
                  disabled
                  className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg cursor-not-allowed"
                >
                  Cancelado
                </button>
              ) : (
                <span className="text-sm">
                  {order.status === 'returned' ? 'Devuelto' : 'En uso'}
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Fecha de devolución</div>
              <div className="text-sm">
                {new Date(order.returnDate).toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
