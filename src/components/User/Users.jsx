import React, { useEffect, useState } from "react"
import { useUser } from "../../shared/hooks/user/useUser"
import { UserCard } from "./UserCard"
import Navbar from "../NavBar/NavBar"

export const Users = () => {
  const { getUsers, users, setUsers } = useUser()
  const [filter, setFilter] = useState('ALL')
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  useEffect(() => {
    if (filter === 'ALL') {
      getUsers()
    } else {
      let usersList = users.filter((user) => user.role === filter)
      setFilteredUsers(usersList)
    }
  }, [filter])

  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">Filtrar:</label>
        <select
          className="border border-gray-300 rounded px-3 py-1"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">Todos</option>
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYE">Empleados</option>
          <option value="CLIENT">Clientes</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user._id} userData={user} />
        ))}
      </div>
    </div>
  )
}
