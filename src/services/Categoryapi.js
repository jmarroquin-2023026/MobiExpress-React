import axios from "axios";

const apiClient=axios.create(
    {
        baseURL:'http://localhost:2636/v1/category',
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


export const getCategoriesRequest=async()=>{
    try{
        return await apiClient.get('/category-list')
    }catch(e){
        return {
            error:true,
            e
        }
    }
}

export const addCategoryRequest=async(category)=>{
    try{
        return await apiClient.post('/category-register',category)
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const updateCategoryRequest=async(id,category)=>{
    try{
        const response=await apiClient.put(`/category-update/${id}`,category,{})
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const deleteCategoryRequest=async(id)=>{
    try{
        const response=await apiClient.delete(`/category-delete/${id}`)
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}