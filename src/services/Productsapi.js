import axios from "axios";

const apiClient=axios.create(
    {
        baseURL:'http://localhost:2636/v1/products',
        timeout:2000
    }
)

apiClient.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=token
        }
        return config
    }
)

export const addProductRequest=async(data)=>{
    try{
        return await apiClient.post('/addProduct',data)
    }catch(e){  
        return {
            error:true,
            e
        }
    }
}
export const getProductsRequest=async()=>{
    try{
        return await apiClient.get('/getProduct')
    }catch(e){
        return {
            error:true,
            e
        }
    }
}

export const addCategoryRequest=async(products)=>{
    try{
        return await apiClient.post('/getProduct',products)
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const getByCategoryRequest=async(id,products)=>{
    try{
        const response=await apiClient.put(`/getByCategory/${id}`,products)
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const getByName=async(id,products)=>{
    try{
        const response=await apiClient.put(`/getByName/${id}`,products)
        return response
    }catch(e){
        return{
            error:true,
            e
        }   
    }
}

export const updateProductRequest=async(id,product)=>{
    try{
        const response=await apiClient.put(`/updateProduct/${id}`,product,{})
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const deleteProductRequest=async(id)=>{
    try{
        const response=await apiClient.delete(`/deleteProduct/${id}`)
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}