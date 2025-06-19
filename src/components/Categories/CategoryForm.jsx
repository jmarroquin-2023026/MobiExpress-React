import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddCategory } from '../../shared/hooks/categories/useAddCategory'
import { useUpdateCategory } from '../../shared/hooks/categories/useUpdateCategory'
import {
  categoryNameValidator,
  categoryNameValidatorMesg,
  descriptionCategoryValidator,
  descriptionCategoryValidatorMsg,
  validateCategoryPicuture,
  validateCategoryPicutureMsg,
} from '../../shared/validators/categoryValidators'
import { Input } from '../Input'

export const CategoryForm = () => {
  const form = {
    name: {
      value: '',
      isValid: false,
      showError: false,
    },
    description: {
      value: '',
      isValid: false,
      showError: false,
    },
    picture: {
      value: '',
      isValid: false,
      showError: false,
    },
  }

  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const { addCategory } = useAddCategory()
  const [formData, setFormData] = useState(form)
  const { updateCategory } = useUpdateCategory()

  const isSubmitButtonDisable =
    !formData.name.isValid ||
    !formData.description.isValid ||
    !formData.picture.isValid

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', formData.name.value)
    data.append('description', formData.description.value)
    data.append('picture', formData.picture.value)

    if (isEditing) {
      const updatedCategory = await updateCategory(id, data)
      navigate('/dashboard/categories')
      if (updatedCategory) {
        setFormData({
          name: {
            value: updatedCategory.name,
            isValid: true,
            showError: false,
          },
          description: {
            value: updatedCategory.description,
            isValid: true,
            showError: false,
          },
          picture: {
            value: updatedCategory.picutre,
            isValid: true,
            showError: false,
          },
        })
      }
    } else {
      await addCategory(data)
      navigate('/dashboard/categories')
    }
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'name':
        isValid = categoryNameValidator(value)
        break
      case 'description':
        isValid = descriptionCategoryValidator(value)
        break
      case 'picture':
        isValid = validateCategoryPicuture(value)
        break
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid,
      },
    }))
  }

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }))
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-white-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-center text-2xl font-bold mb-10">Editar Categoria</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <Input
                field="name"
                label=""
                onChangeHandler={handleValueChange}
                value={formData.name.value}
                placeholder="Ingrese el nombre"
                type="text"
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={categoryNameValidatorMesg}
                className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
              <Input
                field="description"
                label=""
                onChangeHandler={handleValueChange}
                value={formData.description.value}
                placeholder="Ingrese una descripción"
                type="text"
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.description.showError}
                validationMessage={descriptionCategoryValidatorMsg}
                className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Image(s)</label>
            <Input
              field="picture"
              label=""
              onChangeHandler={handleValueChange}
              value={formData.picture.value}
              placeholder=""
              type="file"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.picture.showError}
              validationMessage={validateCategoryPicutureMsg}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitButtonDisable}
              className={`w-60 py-2 rounded-md text-white font-semibold transition ${
                isSubmitButtonDisable
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-400 hover:bg-blue-500'
              }`}
            >
              {id ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
