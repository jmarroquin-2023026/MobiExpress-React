import React, { useState } from 'react'
import { useGetCards } from '../../shared/hooks/card/useGetCards'
import { useDeleteCard } from '../../shared/hooks/card/useDeleteCard'
import toast from 'react-hot-toast'

export const SavedCards = () => {
  const { cards } = useGetCards()
  const { deleteCard, isLoading } = useDeleteCard()

  const [selectedCards, setSelectedCards] = useState([])

  if (!cards || cards.length === 0)
    return <p className="text-center py-4">No hay tarjetas guardadas.</p>

  const handleDeleteButton = async (cardId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta tarjeta?')
    if (!confirmed) return

    const success = await deleteCard(cardId)
    if (success) {
      toast.success('Tarjeta eliminada con éxito')
      window.location.reload()
    }
  }

  const handleCheckboxChange = (cardId, checked) => {
    if (checked) {
      setSelectedCards((prev) => [...prev, cardId])
    } else {
      setSelectedCards((prev) => prev.filter((id) => id !== cardId))
    }
  }

  return (
    <div className="px-67 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tus Tarjetas</h2>
      <div className="relative">
        <div className="flex gap-4 pb-4 overflow-x-auto scroll-smooth snap-x">
          {cards.map((card) => (
            <div
              key={card._id}
              className="relative flex-shrink-0 w-80 h-48 bg-gradient-to-br from-blue-800 to-blue-700 rounded-2xl p-5 text-white shadow-xl border border-blue-300/20"
            >
              {/* Checkbox en la esquina superior izquierda */}
              <input
                type="checkbox"
                checked={selectedCards.includes(card._id)}
                onChange={(e) => handleCheckboxChange(card._id, e.target.checked)}
                className="absolute top-3 left-3 w-5 h-5 rounded border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600"
              />

              <div className="flex justify-between items-start mb-8">
                <div className="text-xs bg-white/20 px-2 py-1 rounded-full">Tarjeta</div>
                <button
                  className="right-3 text-xs bg-red-900 hover:bg-red-500/30 px-3 py-1 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteButton(card._id)
                  }}
                  disabled={isLoading}
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-6">
                <div className="text-xs text-blue-200 mb-1">Número de tarjeta</div>
                <div className="text-lg font-mono tracking-wider">
                  **** **** **** {card.number.slice(-4)}
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-blue-200 mb-1">Titular</div>
                  <div className="text-sm font-medium">{card.titular.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-200 mb-1">Expira</div>
                  <div className="text-sm font-medium">{card.expirationDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
