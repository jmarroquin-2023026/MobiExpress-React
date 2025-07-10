import React, { useState, useEffect } from 'react'
import { useUser } from '../../shared/hooks/user/useUser'
import { DeleteProfile } from './DeleteProfile'
import { Link } from 'react-router-dom';

export const UpdatePage = () => {
  const [initialData, setInitialData] = useState(null)
  const { getUser, updateUser, userData } = useUser()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        await getUser(user.uid)
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error)
      }
    }
    loadUserData()
    setInitialData(userData)
  }, [])

  useEffect(() => {
    setFormData({
      name: userData?.name || '',
      surname: userData?.surname || '',
      email: userData?.email || '',
      username: userData?.username || '',
      phone: userData?.phone || '',
      address: userData?.address || ''
    })
  }, [userData])

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    phone: '',
    address: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let id = JSON.parse(localStorage.getItem('user')).uid
    updateUser(id, formData)
  }
  
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl font-bold mb-4">Edit User Profile</h1>

       <div className="w-20 h-20 rounded-full border border-gray-400 overflow-hidden">
          <img
            src={
              `http://localhost:2636/uploads/img/users/${user.profilePicture}`
            }
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

         <div className="flex flex-wrap gap-4 justify-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
          

          <Link to="/dashboard/profile/updatePassword">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Cambiar contraseña
            </button>
          </Link>
          <Link to="/dashboard/profile/changeProfilePicture">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Cambiar foto de perfil
            </button>
          </Link>
          
          <Link to='/orders/MyOrder'>
            <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Historial
          </button>
          </Link>
          <DeleteProfile className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" />
        </div>

      </form>
    </div>
    );
};