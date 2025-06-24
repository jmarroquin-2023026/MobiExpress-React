import React, { useState, useEffect } from 'react'
import { Input1 } from '../Input1'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddProduct } from '../../shared/hooks/products/useAddProduct'
import { useUpdateProduct } from '../../shared/hooks/products/useUpdateProduct'
import { useCategories } from '../../shared/hooks/categories/useCategories'
import {
  validateProductBrand, validateProductDescription, validateProductImages,
  validateProductName, validateProductPrice, validateProductDiscount,
  validateProductStock, validateProductNameMsg, validateProductDescriptionMsg,
  validateProductPriceMsg, validateProductBrandMsg, validateProductStockMsg,
  validateProductDiscountMsg, validateProductImagesMsg
} from '../../shared/validators/productValidator'
import Select from 'react-select'

export const ProductForm = () => {
  const form = {
    name: { value: '', isValid: false, showError: false },
    description: { value: '', isValid: false, showError: false },
    category: { value: [], isValid: true, showError: false }, // sin validación
    price: { value: '', isValid: false, showError: false },
    brand: { value: '', isValid: false, showError: false },
    stock: { value: '', isValid: false, showError: false },
    discount: { value: '', isValid: false, showError: false },
    images: { value: [], isValid: false, showError: false },
  }

  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const { addProduct } = useAddProduct()
  const { updateProduct } = useUpdateProduct()

  const { getCategories, allCategories } = useCategories()
  useEffect(() => { getCategories() }, [])

  const [formData, setFormData] = useState(form)

  const categoryOptions = allCategories.map(cat => ({
  value: cat._id,
  label: cat.name
}))

  const isSubmitButtonDisable =
    !formData.name.isValid ||
    !formData.description.isValid ||
    !formData.price.isValid ||
    !formData.brand.isValid ||
    !formData.stock.isValid ||
    !formData.discount.isValid ||
    !formData.images.isValid

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'name':
        isValid = validateProductName(value); break
      case 'description':
        isValid = validateProductDescription(value); break
      case 'price':
        isValid = validateProductPrice(value); break
      case 'brand':
        isValid = validateProductBrand(value); break
      case 'stock':
        isValid = validateProductStock(value); break
      case 'discount':
        isValid = validateProductDiscount(value); break
      case 'images':
        isValid = validateProductImages(formData.images.value)
        break
    }
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], isValid, showError: !isValid }
    }))
  }

  const handleValueChange = (e, field) => {
    let value = e.target.value
    if (field === 'images') {
      value = Array.from(e.target.files)
    } else if (field === 'category') {
      value = Array.from(e.target.selectedOptions).map((opt) => opt.value)
    }
    setFormData((prev) => ({ ...prev, [field]: { ...prev[field], value } }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', formData.name.value)
    data.append('description', formData.description.value)
    formData.category.value.forEach((cat) => data.append('category', cat))
    data.append('price', formData.price.value)
    data.append('brand', formData.brand.value)
    data.append('stock', formData.stock.value)
    data.append('discount', formData.discount.value)
    formData.images.value.forEach((file) => data.append('images', file))

    if (isEditMode) {
      const updated = await updateProduct(id, data)
      if (updated) navigate('/products/list')
    } else {
      await addProduct(data)
      navigate('/products/list')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
  <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
      {id ? 'Actualizar Producto' : 'Crear Nuevo Producto'}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">

      <Input1
        field="name"
        label="Nombre del producto"
        value={formData.name.value}
        placeholder="Nombre"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.name.showError}
        validationMessage={validateProductNameMsg}
      />

      <Input1
        field="brand"
        label="Marca"
        value={formData.brand.value}
        placeholder="Marca"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.brand.showError}
        validationMessage={validateProductBrandMsg}
      />

      <Input1
        field="price"
        label="Precio"
        value={formData.price.value}
        placeholder="Precio"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.price.showError}
        validationMessage={validateProductPriceMsg}
      />

      <Input1
        field="stock"
        label="Stock"
        value={formData.stock.value}
        placeholder="Stock"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.stock.showError}
        validationMessage={validateProductStockMsg}
      />

      <Input1
        field="discount"
        label="Descuento (%)"
        value={formData.discount.value}
        placeholder="Descuento"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.discount.showError}
        validationMessage={validateProductDiscountMsg}
      />

      <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Categorías</label>
  <Select
    isMulti
    options={categoryOptions}
    value={categoryOptions.filter(opt => formData.category.value.includes(opt.value))}
    onChange={(selectedOptions) => {
      const values = selectedOptions.map(opt => opt.value)
      setFormData(prev => ({
        ...prev,
        category: { ...prev.category, value: values }
      }))
    }}
    className="text-sm"
    classNamePrefix="react-select"
    placeholder="Selecciona categorías..."
  />
</div>


      <Input1
        field="description"
        label="Descripción del producto"
        value={formData.description.value}
        placeholder="Descripción"
        type="text"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.description.showError}
        validationMessage={validateProductDescriptionMsg}
      />

      <Input1
        field="images"
        label="Imágenes"
        value={formData.images.value}
        type="file"
        onChangeHandler={handleValueChange}
        onBlurHandler={handleValidationOnBlur}
        showErrorMessage={formData.images.showError}
        validationMessage={validateProductImagesMsg}
      />

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitButtonDisable}
          className={`px-6 py-2 rounded-md font-semibold text-white transition-colors ${
            isSubmitButtonDisable
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {id ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  </div>
</div>

  )
}
