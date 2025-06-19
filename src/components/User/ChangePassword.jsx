import { useState } from 'react';
import { useUser } from '../../shared/hooks/user/useUser';

export const ChangePasswordPage = () => {
    const [passwordMessage,setPasswordMessage]=useState('')
    const {changePassword}=useUser()
    const [disabled,setDisabled]=useState(true)
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        changePassword(formData.oldPassword,formData.newPassword)
        
    };

    const handlePasswordConfirmation = async()=>{
        if(formData.newPassword === formData.confirmPassword){
            setPasswordMessage('')
            setDisabled(false)
        }else{
            setPasswordMessage('La contraseña no coincide')
            setDisabled(true)
        }
    }

    return (
        <div>
        <h1>Cambiar Contraseña</h1>
        
        <form onSubmit={handleSubmit}>
            <div>
            <label>Contraseña Actual:</label>
            <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
            />
            </div>

            <div>
            <label>Nueva Contraseña:</label>
            <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
            />
            </div>

            <div>
            <label>Confirmar Nueva Contraseña:</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handlePasswordConfirmation}
                required
            />
            <span>{passwordMessage}</span>
            </div>

            <button type="submit" disabled={disabled}>
                Cambiar Contraseña
            </button>
        </form>
        </div>
    );
};
