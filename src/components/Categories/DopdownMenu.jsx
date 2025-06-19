import React, { useEffect, useState } from 'react'
import { useCategories } from '../../shared/hooks/categories/useCategories'
import { addCategoryRequest } from '../../services/Categoryapi'
import toast from 'react-hot-toast'

export const DropDownMenu = () => {
  const { getCategories, allCategories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return toast.error('Nombre de categoría vacío')

    try {
      const res = await addCategoryRequest({ name: newCategoryName })
      if (res.error) {
        return toast.error(
          res?.e?.response?.data || 'Error al agregar la categoría'
        )
      }

      toast.success('Categoría agregada con éxito')
      setNewCategoryName('')
      getCategories() // Refresca la lista
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Categorías existentes:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Agregar nueva categoría:</label>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Ej: Electrónica"
        />
      </div>

      <button type="submit">Agregar categoría</button>
    </form>
  )
}
