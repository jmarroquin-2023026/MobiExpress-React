import React, { useEffect, useState } from 'react'
import { useUserOrders } from '../../shared/hooks/order/userOrderOfUser'
import { useUpdateOrder } from '../../shared/hooks/order/useUpdateOrder'
import Navbar from '../NavBar/NavBar'
import toast from 'react-hot-toast'

export const UserOrderCard = () => {
  const { getUserOrders, userOrders } = useUserOrders()
  const { updateOrder, isLoading } = useUpdateOrder()
  const [updatingOrderId, setUpdatingOrderId] = useState(null)

  useEffect(() => {
    getUserOrders()
  }, [])

  const handleCancelOrder = async (orderId) => {
    const confirm = window.confirm('¿Estás seguro de que deseas cancelar este pedido?')
    if (!confirm) return

    try {
      setUpdatingOrderId(orderId)
      const success = await updateOrder(orderId, 'cancelled')
      if (success) {
        toast.success('Pedido cancelado correctamente')
        await getUserOrders()
      } else {
        toast.error('No se pudo cancelar el pedido')
      }
    } catch (error) {
      console.error('Error al cancelar el pedido:', error)
      toast.error('Error interno al cancelar el pedido')
    } finally {
      setUpdatingOrderId(null)
    }
  }

  if (userOrders.length === 0)
    return (
      <div>
        <Navbar />
        <p className="text-center py-4 mt-36">No hay pedidos registrados para este usuario.</p>
      </div>
    )

  return (
    <div className="px-6 py-8">
      <Navbar />
      <h2 className="mt-20 text-3xl font-bold mb-8 text-center text-gray-800">Mis Pedidos</h2>

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
              <div className="text-sm">
                {order.status === 'returned'
                  ? 'Devuelto'
                  : order.status === 'cancelled'
                  ? 'Cancelado'
                  : 'En uso'}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-indigo-200 mb-1">Fecha de devolución</div>
              <div className="text-sm">
                {new Date(order.returnDate).toLocaleDateString('es-ES')}
              </div>
            </div>

            {/* Botón solo si no está cancelado ni devuelto */}
            {order.status !== 'cancelled' && order.status !== 'returned' && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
                disabled={isLoading || updatingOrderId === order._id}
              >
                {updatingOrderId === order._id ? 'Cancelando...' : 'Cancelar Pedido'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
