import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddProduct } from '../../shared/hooks/products/useAddProduct'
import { useUpdateProduct } from '../../shared/hooks/products/useUpdateProduct'
import { validateProductBrand, validateProductCategory, validateProductDescription, validateProductImages, validateProductName, validateProductPrice } from '../../shared/validators/productValidator'
import { useGetCategories } from '../../shared/hooks/categories/useGetCategories'

export const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const { addProduct } = useAddProduct()
  const { updateProduct } = useUpdateProduct()
  const { getCategories, allCategories } = useGetCategories()

  const [formData, setFormData] = useState({
    name: '', description: '', categories: [], price: '', brand: '', stock: '', images: []
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getCategories()
  }, [])

  const handleValueChange = (e) => {
    const { name, value, files, options } = e.target

    if (name === 'images') {
      setFormData({ ...formData, images: Array.from(files) })
    } else if (name === 'categories') {
      const selected = Array.from(options).filter(option => option.selected).map(option => option.value)
      setFormData({ ...formData, categories: selected })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!validateProductName(formData.name)) newErrors.name = 'Nombre inválido'
    if (!validateProductDescription(formData.description)) newErrors.description = 'Descripción inválida'
    if (!validateProductCategory(formData.categories)) newErrors.categories = 'Selecciona al menos una categoría'
    if (!validateProductPrice(formData.price)) newErrors.price = 'Precio inválido'
    if (!validateProductBrand(formData.brand)) newErrors.brand = 'Marca inválida'
    if (formData.stock === '' || isNaN(formData.stock)) newErrors.stock = 'Stock inválido'
    if (!validateProductImages(formData.images)) newErrors.images = 'Selecciona al menos una imagen'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const data = new FormData()
    data.append('name', formData.name)
    data.append('description', formData.description)
    formData.categories.forEach(cat => data.append('categories', cat))
    data.append('price', formData.price)
    data.append('brand', formData.brand)
    data.append('stock', formData.stock)
    formData.images.forEach(file => data.append('images', file))

    if (isEditMode) {
      await updateProduct(id, data)
    } else {
      await addProduct(data)
    }
    navigate('/dashboard/products')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" placeholder="Nombre del producto"
          value={formData.name} onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

        <textarea name="description" placeholder="Descripción"
          value={formData.description} onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}

        <select
          multiple
          name="categories"
          onChange={handleValueChange}
          value={formData.categories}
          className="w-full p-2 rounded bg-gray-700 border h-32"
        >
          {allCategories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        {errors.categories && <p className="text-red-400 text-sm">{errors.categories}</p>}

        <input type="number" name="price" placeholder="Precio"
          value={formData.price} onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}

        <input type="text" name="brand" placeholder="Marca"
          value={formData.brand} onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.brand && <p className="text-red-400 text-sm">{errors.brand}</p>}

        <input type="number" name="stock" placeholder="Stock"
          value={formData.stock} onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.stock && <p className="text-red-400 text-sm">{errors.stock}</p>}

        <input type="file" name="images" multiple onChange={handleValueChange}
          className="w-full p-2 rounded bg-gray-700 border"
        />
        {errors.images && <p className="text-red-400 text-sm">{errors.images}</p>}

        <button type="submit"
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700"
        >
          {isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>
    </div>
  )
}
