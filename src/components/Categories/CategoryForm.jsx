import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddCategory } from '../../shared/hooks/categories/useAddCategory'
import { useUpdateCategory } from '../../shared/hooks/categories/useUpdateCategory'
import { categoryNameValidator, categoryNameValidatorMesg, descriptionCategoryValidator, descriptionCategoryValidatorMsg, validateCategoryPicuture, validateCategoryPicutureMsg } from '../../shared/validators/categoryValidators'
import { Input } from '../Input'

export const CategoryForm = () => {
    const form={
        name:{
            value:'',
            isValid:false,
            showError:false
        },
        description:{
            value:'',
            isValid:false,
            showError:false
        },
        picture:{
            value:'',
            isValid:false,
            showError:false
        }
    }

    const {id}=useParams()
    const navigate=useNavigate()
    const isEditing=Boolean(id)
    const {addCategory}=useAddCategory()
    const [formData,setFormData]=useState(form)
    const {updateCategory}=useUpdateCategory()

    const isSubmitButtonDisable=
    !formData.name.isValid||
    !formData.description.isValid||
    !formData.picture.isValid

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const data=new FormData()
        data.append('name',formData.name.value)
        data.append('description',formData.description.value)
        data.append('picture', formData.picture.value)

        if(isEditing){
            const updatedCategory=await updateCategory(id,data)
            navigate('/dashboard/categories')
            if(updatedCategory){
                setFormData({
                    name:{value:updatedCategory.name,isValid:true,showError:false},
                    description:{value:updatedCategory.description,isValid:true,showError:false},
                    picture:{value:updatedCategory.picutre,isValid:true,showError:false}
                })
            }
        }else{
            await addCategory(data)
        }
    }

    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case 'name':
                isValid=categoryNameValidator(value)
                break
            case 'description':
                isValid=descriptionCategoryValidator(value)
                break
            case 'picture':
                isValid=validateCategoryPicuture(value)
                break
        }
        setFormData((prevData)=>({
            ...prevData,
            [field]:{
                ...prevData[field],
                isValid,
                showError:!isValid
            }
        }))
    }

    const handleValueChange=(value,field)=>{
        setFormData((prevData)=>({
            ...prevData,
            [field]:{
                ...prevData[field],
                value
            }
        }))
    }
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <div>
                <Input
                    field='name'
                    label='Category Name'
                    onChangeHandler={handleValueChange}
                    value={formData.name.value}
                    placeholder={formData.name.value}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.name.showError}
                    validationMessage={categoryNameValidatorMesg}
                />
            </div>
            <div>
                <Input
                    field='description'
                    label='Category Description'
                    onChangeHandler={handleValueChange}
                    value={formData.description.value}
                    placeholder={formData.description.value}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.description.showError}
                    validationMessage={descriptionCategoryValidatorMsg}
                />
            </div>
            <div>
                <Input
                    field='picture'
                    label='Category Image'
                    onChangeHandler={handleValueChange}
                    value={formData.picture.value}
                    placeholder={formData.picture.value}
                    type='file'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.picture.showError}
                    validationMessage={validateCategoryPicutureMsg}
                />
            </div>
            <button
                type='submit'
                disabled={isSubmitButtonDisable}
            >
                {id?'Actualizar Categoria':'Agregar Categoria'}
            </button>
      </form>
    </div>
  )
}


