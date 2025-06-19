import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../../shared/hooks/categories/useDeleteCategory";

export const CategoryCard = ({ name, id, picture, navigateToCategoryHandler }) => {
  const navigate=useNavigate()

  const {deleteCategory,isLoading}=useDeleteCategory()

  const handleNavigateToCategory = () => {
    navigateToCategoryHandler(id)
}

  const searchByCategory = (id) => {
    navigate(`/dashboard/searchByCategory/${id}`)
  }

  const handleEditButton=(id)=>{
    navigate(`/dashboard/updateCategory/${id}`)
  }

   const handleDeleteButton = async () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta categoria?')
    if (!confirmed) return

    const success = await deleteCategory(id)
    window.location.reload()
    if (success) {
        toast.success('Categoria eliminado con éxito')
        
    }
}

  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "ADMIN"

  return (
     <div
      className={`flex flex-col items-center text-center cursor-pointer p-4 transition-transform hover:scale-105 ${isAdmin ? 'md:flex-row md:items-start md:text-left md:cursor-default md:hover:scale-100' : ''}`}
      onClick={handleNavigateToCategory}
    >
      {/* Imagen circular */}
      <div className="w-32 h-32 rounded-full border-2 border-black overflow-hidden flex items-center justify-center mb-2 md:mb-0 md:mr-4">
        <img
          src={`http://localhost:2636/uploads/img/categories/${picture}`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      {isAdmin ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="border border-gray-300 rounded p-2">{name}</div>
          <div className="flex gap-2">
            <button
             /*  style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }} */
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteButton()
              }}
              disabled={isLoading}
  
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button
             /*  style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }} */
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation()
                searchByCategory(id)
              }}
              disabled={isLoading}
  
            >
              
              Products
            </button>
            <button
              /* style={{
                backgroundColor: "#03a9f4",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }} */
             onClick={(e)=>{
              e.stopPropagation()
              handleEditButton(id)
             }}
            >
              Actualizar
            </button>
          </div>
        </div>
      ) : (
        <span /* style={{ marginTop: "0.5rem", textAlign: "center" }} */>{name}</span>
      )}
    </div>
  )
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  navigateToCategoryHandler: PropTypes.func.isRequired,
}