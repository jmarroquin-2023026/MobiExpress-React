import { useState } from "react";
import { addEmployeeRequest, changePasswordRequest, changeProfilePictureRequest, deleteProfileRequest, getUserRequest, getUsersRequest, updateUserRequest } from "../../../services/Userapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUser=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [userData,setUserData]=useState(null)
    const [users,setUsers]=useState([])
    const navigate = useNavigate()
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
        setIsLoading(false)
    }
    const changePassword = async(oldPass,newPass)=>{
        setIsLoading(true)
        const response = await changePasswordRequest(oldPass,newPass)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Cambiando la Contraseña. Intente de nuevo'
            )
        }
        setIsLoading(false)
        toast.success('Contraseña actualizada exitosamente')
    }
    const getUsers = async()=>{
        setIsLoading(true)
        const response = await getUsersRequest()
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Listando los Usuarios. Intente de nuevo'
            )
        }
        setUsers(response.data.message)
        setIsLoading(false)
    }
    const addEmployee = async(employee)=>{
        setIsLoading(true)
        const response = await addEmployeeRequest(employee)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Agregando el Empleado. Intente de nuevo'
            )
        }
        toast.success('Empleado creado exitosamente')
        setIsLoading(false)
    }

    const changeProfilePicture = async(picture)=>{
        setIsLoading(true)
        const response = await changeProfilePictureRequest(picture)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Actualizando la Foto de Perfil. Intente de nuevo'
            )
        }
        let user = JSON.parse(localStorage.getItem('user'))
        let rep = await getUserRequest(user.uid)
        if(rep.error){
            return toast.error(
                rep?.e?.response?.data?.message||
                'Error Buscando El usuario. Intente de nuevo'
            )
        }
        user.profilePicture= rep.data.message.profilePicture
        localStorage.setItem('user',JSON.stringify(user))
        toast.success('Foto Actualizada')
        setIsLoading(false)
    }

    const deleteProfile = async()=>{
        setIsLoading(true)
        let user = JSON.parse(localStorage.getItem('user'))
        const response = await deleteProfileRequest(user.uid)
        console.log(response.e);
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message||
                'Error Al Eliminar el Perfil. Intente de nuevo'
            )
        }
        localStorage.removeItem('token')
        localStorage.setItem('user',JSON.stringify(null))
        setIsLoading(false)
        navigate('/auth')
    }

    return{
        updateUser,
        isLoading,
        getUser,
        userData,
        changePassword,
        getUsers,
        users,
        setUsers,
        addEmployee,
        changeProfilePicture,
        deleteProfile
    }
}