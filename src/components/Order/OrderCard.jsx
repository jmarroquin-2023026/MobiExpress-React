import React, { useEffect } from 'react'
import { useOrder } from '../../shared/hooks/order/useOrder'
import { useUpdateOrder } from '../../shared/hooks/order/useUpdateOrder'
import toast from 'react-hot-toast'
import Navbar from '../NavBar/NavBar'

export const OrderCard = () => {
  const { getOrders, allOrders } = useOrder()
  const { updateOrder, isLoading } = useUpdateOrder()

  useEffect(() => {
    getOrders()
  }, [])

  if (allOrders.length === 0)
    return <p className="text-center py-4">No hay pedidos registrados.</p>

  const handleUpdate = async (orderId, newStatus) => {
    const confirmed = window.confirm(`¿Deseas cambiar el estado del pedido a "${newStatus}"?`)
    if (!confirmed) return

    const success = await updateOrder(orderId, newStatus)

    if (success) {
      toast.success('Estado del pedido actualizado')
      getOrders()
    } else {
      toast.error('No se pudo actualizar el estado')
    }
  }


  return (
    <div className="px-6 py-8">
      <Navbar/>
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
              <select
                value={order.status}
                onChange={(e) => handleUpdate(order._id, e.target.value)}
                className={`w-full text-sm border rounded-md p-1 text-gray-400 shadow-sm`}
                disabled={isLoading}
              >
                <option value="in_use">En uso</option>
                <option value="returned">Devuelto</option>
              </select>
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