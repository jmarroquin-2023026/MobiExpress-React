import React, { useState,useEffect } from 'react';
import { useUser } from '../../shared/hooks/user/useUser';
import { DeleteProfile } from './DeleteProfile';
export const UpdatePage = () => {
    const [initialData,setInitialData]=useState(null)
    const {getUser,updateUser,userData}=useUser()
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
    }, []);
    
    useEffect(() => {
        console.log('Datos actualizados:', userData);
        setFormData({
            name: userData?.name || '',
            surname: userData?.surname || '',
            email: userData?.email || '',
            username: userData?.username || '',
            phone: userData?.phone || '',
            address: userData?.address || ''
        })
    }, [userData]);
    
    const [formData, setFormData] = useState({
        name:'',
        surname:'',
        email:'',
        username:'',
        phone:'',
        address:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let id =JSON.parse(localStorage.getItem('user')).uid
        
        updateUser(id,formData)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label>Apellido:</label>
                <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Nombre de usuario:</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Teléfono:</label>
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Dirección:</label>
                <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                />
            </div>

            <button type="submit">Actualizar Usuario</button>
            </form>
            <DeleteProfile/>
        </>
    );
};
