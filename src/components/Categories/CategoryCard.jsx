import React from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useDeleteCategory } from "../../shared/hooks/categories/useDeleteCategory"
import toast from "react-hot-toast"

export const CategoryCard = ({ name, id, picture, navigateToCategoryHandler }) => {
  const navigate = useNavigate()
  const { deleteCategory, isLoading } = useDeleteCategory()

  const handleNavigateToCategory = () => {
    navigateToCategoryHandler(id)
  }

  const searchByCategory = (id) => {
    navigate(`/dashboard/searchByCategory/${id}`)
  }

  const handleEditButton = (id) => {
    navigate(`/dashboard/updateCategory/${id}`)
  }

  const handleDeleteButton = async () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    if (!confirmed) return

    const success = await deleteCategory(id)
    if (success) {
      toast.success("Categoría eliminada con éxito")
      window.location.reload()
    } else {
      toast.error("Error al eliminar la categoría")
    }
  }

  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "ADMIN"

  return (
    <div
      className={`flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl shadow-md p-4 gap-6 cursor-pointer
        hover:shadow-lg transition-shadow duration-300
        ${isAdmin ? "md:cursor-default" : ""}
      `}
      onClick={!isAdmin ? handleNavigateToCategory : undefined}
    >
      {/* Imagen circular */}
      <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
        <img
          src={`http://localhost:2636/uploads/img/categories/${picture}`}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-grow h-full w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{name}</h3>

        <div className="flex flex-wrap gap-3">
          {/* Botón común para todos */}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              searchByCategory(id)
            }}
            disabled={isLoading}
            type="button"
          >
            Productos
          </button>

          {/* Botones exclusivos para admin */}
          {isAdmin && (
            <>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditButton(id)
                }}
                type="button"
              >
                Actualizar
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteButton()
                }}
                disabled={isLoading}
                type="button"
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  navigateToCategoryHandler: PropTypes.func.isRequired,
}
