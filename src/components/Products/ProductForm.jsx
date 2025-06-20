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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input1
            field='name'
            label='Name'
            value={formData.name.value}
            placeholder="Enter product name"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.name.showError}
            validationMessage={validateProductNameMsg}
          />
        </div>
        <div className="mb-5">
          <Input1
            field='description'
            label='Product description'
            value={formData.description.value}
            placeholder="Enter product description"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.description.showError}
            validationMessage={validateProductDescriptionMsg}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Categories
          </label>
          <select
            id="category"
            multiple
            value={formData.category.value}
            onChange={(e) => handleValueChange(e, 'category')}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <Input1
            field='price'
            label='Product price'
            value={formData.price.value}
            placeholder="Enter product price"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.price.showError}
            validationMessage={validateProductPriceMsg}
          />
        </div>
        <div className="mb-5">
          <Input1
            field='brand'
            label='Brand'
            value={formData.brand.value}
            placeholder="Enter product brand"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.brand.showError}
            validationMessage={validateProductBrandMsg}
          />
        </div>
        <div className="mb-5">
          <Input1
            field='stock'
            label='Stock'
            value={formData.stock.value}
            placeholder="Enter product stock"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.stock.showError}
            validationMessage={validateProductStockMsg}
          />
        </div>
        <div className="mb-5">
          <Input1
            field='discount'
            label='Discount'
            value={formData.discount.value}
            placeholder="Enter product discount"
            type='text'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.discount.showError}
            validationMessage={validateProductDiscountMsg}
          />
        </div>
        <div className="mb-5">
          <Input1
            field='images'
            label='Images'
            value={formData.images.value}
            placeholder="Upload product images"
            type='file'
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.images.showError}
            validationMessage={validateProductImagesMsg}
          />
        </div>
        <button
          type='submit'
          disabled={isSubmitButtonDisable}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            isSubmitButtonDisable ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {id ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>
    </div>
  )
}
