import { useState } from 'react';
import { useUser } from '../../shared/hooks/user/useUser';
import { validatePassword } from '../../shared/validators/validators';

export const ChangePasswordPage = () => {
    const [passwordMessage,setPasswordMessage]=useState('')
    const {changePassword}=useUser()
    const [formData, setFormData] = useState({
        oldPassword:{
            value:'',
            error: true,
        },
        newPassword:{
            value:'',
            error: true,
        },
        confirmPassword:{
            value:'',
            error: true,
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name] :{
            ...prev[name],
            value:value
        }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        changePassword(formData.oldPassword.value,formData.newPassword.value)
        
    };

    const handlePasswordConfirmation = async()=>{
        if(formData.newPassword.value === formData.confirmPassword.value){
            setPasswordMessage('')
            setFormData(prev => ({
                ...prev,
                ['confirmPassword'] :{
                    ...prev['confirmPassword'],
                    error:false
                }
            }))
        }else{
            setPasswordMessage('La contraseña no coincide')
            setFormData(prev => ({
                ...prev,
                ['confirmPassword'] :{
                    ...prev['confirmPassword'],
                    error:true
                }
            }))
        }
    }
    
    const handleOnBlurPassword = async(e)=>{
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        [name] :{
            ...prev[name],
            error:!validatePassword(value)
        }
        }))

        console.log(isButtonDisabled);
        
    }

    const isButtonDisabled = formData.newPassword.error||formData.oldPassword.error
    ||formData.confirmPassword.error
    return (
        <div className='mt-30'>
        <h1>Cambiar Contraseña</h1>
        
        <form onSubmit={handleSubmit}>
            <div>
            <label>Contraseña Actual:</label>
            <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword.value}
                onChange={handleChange}
                onBlur={handleOnBlurPassword}
            />
            </div>

            <div>
            <label>Nueva Contraseña:</label>
            <input
                type="password"
                name="newPassword"
                value={formData.newPassword.value}
                onChange={handleChange}
                required
                onBlur={handleOnBlurPassword}
            />
            </div>

            <div>
            <label>Confirmar Nueva Contraseña:</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword.value}
                onChange={handleChange}
                onBlur={handlePasswordConfirmation}
                required
            />
            <span>{passwordMessage}</span>
            </div>

            <button type="submit" disabled={isButtonDisabled}>
                Cambiar Contraseña
            </button>
        </form>
        </div>
    );
};
