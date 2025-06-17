import { useState } from "react";
import { changePasswordRequest, getUserRequest, getUsersRequest, updateUserRequest } from "../../../services/Usertapi";
import toast from "react-hot-toast";

export const useUser=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [userData,setUserData]=useState(null)
    const [users,setUsers]=useState([])
    const updateUser = async(id,data)=>{
        setIsLoading(true)
        const response = await updateUserRequest(id,data)
        
        
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error actualizando el perfil. Intente de nuevo'
            )
        }
        toast.success('Perfil actualizado exitosamente')
    }
    const getUser = async(id)=>{
        setIsLoading(true)
        const response = await getUserRequest(id)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error cargando los datos del Usuario. Intente de nuevo'
            )
        }
        setUserData(response.data.message)
    }
    const changePassword = async(oldPass,newPass)=>{
        setIsLoading(false)
        const response = await changePasswordRequest(oldPass,newPass)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Cambiando la Contraseña. Intente de nuevo'
            )
        }
        toast.success('Contraseña actualizada exitosamente')
    }
    const getUsers = async()=>{
        setIsLoading(false)
        const response = await getUsersRequest()
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Listando los Usuarios. Intente de nuevo'
            )
        }
        setUsers(response.data.message)
    }

    
    return{
        updateUser,
        isLoading,
        getUser,
        userData,
        changePassword,
        getUsers,
        users,
        setUsers
    }
}