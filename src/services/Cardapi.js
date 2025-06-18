import axios from 'axios'

const apiClient=axios.create(
    {
        baseURL:'http://localhost:2636/v1/cards',
        timeout:2000
    }
)

export const addCardRequest = async (cardData) => {
  try {
    const token = localStorage.getItem('token')

    const response = await apiClient.post('/addCard', cardData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    return { error }
  }
}


export const getCardsByUserRequest=async()=>{
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

export const deleteCardRequest=async(id)=>{
    try{
        const token=localStorage.getItem('token')
        const response=await apiClient.delete(`/deleteCard/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
    }catch(e){
        return{
            error:true,
            e
        }
    }
}