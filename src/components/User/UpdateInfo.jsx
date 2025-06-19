import React, { useState,useEffect } from 'react';
import { useUser } from '../../shared/hooks/user/useUser';
import { DeleteProfile } from './DeleteProfile';
export const UpdatePage = () => {
    const [initialData,setInitialData]=useState(null)
    const {getUser,updateUser,userData,usernameExist,usernameMessage
        ,emailMessage,emailExist
        }=useUser()
    
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

    const handleUsernameBlur =(e)=>{
        usernameExist(e.target.value)
    }

    const handleEmailOnBlur =(e)=>{
        emailExist(e.target.value)
    }
    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data mt-30">
            <div>
                <label>Nombre:</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                minLength={3}
                maxLength={30}
                />
            </div>

            <div>
                <label>Apellido:</label>
                <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                
                minLength={3}
                maxLength={30}
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                placeholder={formData.email}
                onChange={handleChange}
                onBlur={handleEmailOnBlur}
                />
            </div>
            <span>{emailMessage}</span>
            <div>
                <label>Nombre de usuario:</label>
                <input
                type="text"
                name="username"
                placeholder={formData.username}
                onChange={handleChange}
                onBlur={handleUsernameBlur}
                minLength={5}
                maxLength={15}
                />
            </div>
            <span>{usernameMessage}</span>
            <div>
                <label>Teléfono:</label>
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={8}
                maxLength={13}
                placeholder="+502 12345678"
                />
            </div>

            <div>
                <label>Dirección:</label>
                <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                
                minLength={20}
                maxLength={200}
                />
            </div> 

            <button type="submit">Actualizar Usuario</button>
            </form>
            <DeleteProfile />
        </>
);

};
