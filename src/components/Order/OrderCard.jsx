import React from 'react'
import { useOrder } from '../../shared/hooks/order/useOrder'
import { useUpdateOrder } from '../../shared/hooks/order/useUpdateOrder'
import toast from 'react-hot-toast'

export const OrderCard = () => {
  const { orders } = useOrder()
  const { updateOrder, isLoading } = useUpdateOrder()

  if (!orders || orders.length === 0)
    return <p className="text-center py-4">No hay pedidos registrados.</p>

  const handleUpdate = async (orderId) => {
    const confirmed = window.confirm('¿Deseas actualizar el estado de este pedido?')
    if (!confirmed) return

    const success = await updateOrder(orderId)
    if (success) {
      toast.success('Estado del pedido actualizado')
      window.location.reload()
    } else {
      toast.error('No se pudo actualizar el estado')
    }
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Pedidos Registrados</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {orders.map((order) => (
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
              <div className="text-base font-semibold">{order.clientName}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Total</div>
              <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Estado actual</div>
              <div className="text-sm">{order.status}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Fecha</div>
              <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>

            <button
              className="w-full text-xs bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-full transition-colors font-semibold"
              onClick={() => handleUpdate(order._id)}
              disabled={isLoading}
            >
              Actualizar Estado
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
