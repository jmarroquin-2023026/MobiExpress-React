import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../../shared/hooks/categories/useDeleteCategory"

export const CategoryCard = ({ name, id, picture, navigateToCategoryHandler }) => {
  const navigate=useNavigate()

  const {deleteCategory,isLoading}=useDeleteCategory()

  const handleNavigateToCategory = () => {
    navigateToCategoryHandler(id)
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

  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "ADMIN";

  return (
    <div
      /* style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isAdmin ? "flex-start" : "center",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "1rem",
        cursor: !isAdmin ? "pointer" : "default",
        gap: "1rem",
        width: isAdmin ? "100%" : "150px",
      }} */
     onClick={handleNavigateToCategory}
    >
      {/* Imagen redonda visible para ambos */}
      <div
        /* style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #000",
          flexShrink: 0,
        }} */
      >
        <img
          src={`http://localhost:2636/uploads/img/categories/${picture}`}
          alt={name}
          /* style={{ width: "100%", height: "100%", objectFit: "cover" }} */
        />
      </div>

      {/* Contenido condicional */}
      {isAdmin ? (
        <div /* style={{ flex: 1 }} */>
          <div

            /* style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "0.5rem",
            }} */
          >{name}</div>
          <div /* style={{ display: "flex", gap: "0.5rem" }} */>
            <button
             /*  style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }} */
             onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteButton()
              }}
              disabled={isLoading}
  
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
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
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  navigateToCategoryHandler: PropTypes.func.isRequired,
};