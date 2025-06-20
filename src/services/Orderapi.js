import axios from "axios";

const apiClient=axios.create(
    {
        baseURL:'http://localhost:2636/v1/order',
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


export const getOrdersRequest=async()=>{
    try{
        return await apiClient.get('/')
    }catch(e){
        return {
            error:true,
            e
        }
    }
}

export const addOrderRequest=async(order)=>{
    try{
        return await apiClient.post('/add',order)
    }catch(e){
        return{
            error:true,
            e
        }
    }
}

export const updateOrderRequest = async (orderId, data) => {
  try {
    const response = await apiClient.put(`/${orderId}`, data)
    return response.data
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const getOrdersByUserRequest=async()=>{
    try{
        const token=localStorage.getItem('token')

        return apiClient.get('/list',{
            headers:{
                 Authorization: `Bearer ${token}`
            }
        })
        
    }catch(e){
        return{
            error
        }
    }
}