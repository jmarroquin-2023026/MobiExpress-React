import { Link } from 'react-router-dom'
import { useUser } from '../../shared/hooks/user/useUser'
import { DeleteProfile } from './DeleteProfile'
import React, { useState, useEffect } from 'react'

export const UpdatePage = () => {
  const [initialData, setInitialData] = useState(null)
  const { getUser, updateUser, userData } = useUser()

  useEffect(() => {
    // Asumiendo que getUser obtiene los datos del usuario
    if (userData) {
      setInitialData(userData) // Establecer datos iniciales
    }
  }, [userData]) // Actualiza los datos cuando userData cambia

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    // Asignar los datos del usuario al formulario cuando 'userData' cambie
    if (userData) {
      setFormData({
        name: userData?.name || '',
        surname: userData?.surname || '',
        email: userData?.email || '',
        username: userData?.username || '',
        phone: userData?.phone || '',
        address: userData?.address || ''
      })
    }
  }, [userData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let id = JSON.parse(localStorage.getItem('user')).uid
    updateUser(id, formData)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl font-bold mb-4">Edit User Profile</h1>

      <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
        </svg>
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
        <div className="block text-gray-700 text-sm font-medium mb-1">
                <label>Dirección:</label>
                <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                minLength={20}
                maxLength={200}
                />
            </div>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <button
            type="submit"
            className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <DeleteProfile className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" />

          <Link to="/dashboard/profile/updatePassword">
            <button
              type="button"
              className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded"
            >
              Change password
            </button>
          </Link>
          <Link to="/dashboard/profile/changeProfilePicture">
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-600 text-black px-4 py-2 rounded"
            >
              Change Profile Picture
            </button>
          </Link>
          
          <Link to='/orders/MyOrder'>
            <button
            type="button"
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
          >
            Historial
          </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
