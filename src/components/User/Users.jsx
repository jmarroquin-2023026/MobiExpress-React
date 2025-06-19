import React, { useEffect, useState } from "react"
import { useUser } from "../../shared/hooks/user/useUser"
import { UserCard } from "./UserCard"

export const Users =()=>{
    const {getUsers,users,setUsers}=useUser()
    const [filter,setFilter]=useState('ALL')
    const [filteredUsers,setFilteredUsers]=useState([])
    useEffect(()=>{
        getUsers()
    },[])
    useEffect(()=>{
        setFilteredUsers(users)
    },[users])
    useEffect(()=>{
        console.log(filter);
        if(filter === 'ALL'){
            getUsers()
        }else{
            let usersList = users.filter((user)=> user.role === filter)
            setFilteredUsers(usersList)
        }
    },[filter])
    return(
        <div>
            <label >Filtrar:</label>
            <select onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">Todos</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYE">Empleados</option>
            <option value="CLIENT">Clientes</option>
            </select>
            <div>
                {filteredUsers.map((user)=>(
                    <UserCard key={user._id} userData={user}/>
                ))}
            </div>
        </div>
    )
}