import React, { useEffect } from 'react'
import { useUserOrders } from '../../shared/hooks/order/userOrderOfUser'




export const UserOrderCard = () => {
  const { getUserOrders, userOrders } = useUserOrders()

  useEffect(() => {
    getUserOrders()
  }, [])

  if (userOrders.length === 0)
    return <p className="text-center py-4">No hay pedidos registrados para este usuario.</p>

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Mis Pedidos</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userOrders.map((order) => (
          <div
            key={order._id}
            className="relative bg-gradient-to-br from-indigo-800 to-indigo-700 rounded-2xl p-5 text-white shadow-xl border border-indigo-300/20"
          >
            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">ID del Pedido</div>
              <div className="text-sm font-mono break-words">{order._id}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Total</div>
              <div className="text-lg font-bold">Q{order.total.toFixed(2)}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Estado</div>
              <div className="text-sm">{order.status === 'returned' ? 'Devuelto' : 'En uso'}</div>
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
