import React, { useEffect } from "react"
import { useUser } from "../../shared/hooks/user/useUser"
import { UserCard } from "../../components/User/UserCard"

export const UsersPage =()=>{
    const {getUsers,users,setUsers}=useUser()
    useEffect(()=>{
        getUsers()
    },[])
    return(
        <div>
            <label >Filtrar:</label>
            <select>
            <option value="ALL">Todos</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYE">Empleados</option>
            <option value="CLIENT">Clientes</option>
            </select>
            <div>
                {users.map((user)=>(
                    <UserCard key={user._id} userData={user}/>
                ))}
            </div>
        </div>
    )
}