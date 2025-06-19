import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddProduct } from '../../shared/hooks/products/useAddProduct'
import { useUpdateProduct } from '../../shared/hooks/products/useUpdateProduct'
import { validateProductBrand, validateProductCategory, validateProductDescription, validateProductImages, validateProductName, validateProductPrice } from '../../shared/validators/productValidator'

export const ProductForm = () => {
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
        category:{
            value:'',
            isValid:false,
            showError:false
        },
        price:{
            value:'',
            isValid:false,
            showError:false
        },
        brand:{
            value:'',
            isValid:false,
            showError:false
        },
        stock:{
            value:'',
            isValid:false,
            showError:false
        },
        images:{
            value:'',
            isValid:false,
            showError:false
        },

    }

    const {id}=useParams()
    const navigate=useNavigate()
    const isEditMode=Boolean(id)
    const {addProduct}=useAddProduct()
    const {updateProduct}=useUpdateProduct()
    const [formData,setFormData]=useState(form)

    const isSubmitButtonDisable=!formData.name.isValid||
                                !formData.description.isValid||
                                !formData.category.isValid||
                                !formData.price.isValid||
                                !formData.brand.isValid||
                                !formData.stock.isValid||
                                !formData.images.isValid

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const data = new FormData()
        data.append('name',formData.owner.value)
        data.append('description',formData.description.value)
        data.append('category',formData.category.value)
        data.append('price',formData.price.value)
        data.append('brand',formData.brand.value)
        data.append('stock',formData.stock.value)
        formData.images.value.forEach(file=>data.append('image',file))

        if(isEditMode){
            const updateProduct=await updateProduct(id,data)
            navigate('/dashboard/categories')
            if(updateProduct){
                setFormData({
                    name:{value:updateProduct.name,isValid:true,showError:false},
                    description:{value:updateProduct.description,isValid:true,showError:false},
                    category:{value:updateProduct.category,isValid:true,showError:false},
                    price:{value:updateProduct.price,isValid:true,showError:false},
                    brand:{value:updateProduct.brand,isValid:true,showError:false},
                    stock:{value:updateProduct.stock,isValid:true,showError:false},
                    image:{value:[],isValid:true,showError:false}
                })
            }
        }else{
            await addProduct(data)
        }
    }

    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case 'name':
                isValid=validateProductName(value)
                break;
            case 'description':
                isValid=validateProductDescription(value)
                break;
            case 'category':
                isValid=validateProductCategory(value)
            case 'price':
                isValid=validateProductPrice(value)
                break;
            case 'brand':
                isValid=validateProductBrand(value)
                break;
            case 'stock':
                break;
            case 'images':
                isValid=validateProductImages(value)
                break;
        }
    }

    const handleValueChange=(e,field)=>{
        let value       
    }
  return (
    <div>
      
    </div>
  )
}


