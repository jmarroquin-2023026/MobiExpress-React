import React, { useState } from 'react'
import { Input } from '../Input'
import { addressValidationMessage, emailValidationMessage, nameValidationMessage, passConfirmValidationMessage, passwordValidationMessage, 
    phoneValidationMessage, 
    profilePictureValidationMessage, surnameValidationMessage, usernameValidationMessage, 
    validateAddress, 
    validateEmail, 
    validateName, 
    validatePassConfirm, 
    validatePassword, 
    validatePhone,
    validateProfilePicture,
    validateSurname,
    validateUsername} from '../../shared/validators/validators'
import { useRegister } from '../../shared/hooks/auth/useRegister'

export const Register = ({ switchAuthHandler }) => {
    const form = {
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        surname: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        address:{
            value:'',
            isValid:false,
            showError:false
        },
        phone:{
            value:'',
            isValid:false,
            showError:false
        },
        confirmPassword: {
            value: '',
            isValid: false,
            showError: false
        },
        profilePicture: {
            value: '',
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(form)
    const { register } = useRegister()
    const isSubmitButtonDisable = !formData.email.isValid ||
                                  !formData.surname.isValid ||
                                  !formData.username.isValid ||
                                  !formData.password.isValid ||
                                  !formData.phone.isValid||
                                  !formData.address.isValid||
                                  !formData.confirmPassword.isValid ||
                                  !formData.profilePicture.isValid

    const handleSubmit = (event) => {
    event.preventDefault()
    
    const data = new FormData()
    data.append('name', formData.name.value)
    data.append('surname', formData.surname.value)
    data.append('email', formData.email.value)
    data.append('username', formData.username.value)
    data.append('password', formData.password.value)
    data.append('phone',formData.phone.value)
    data.append('address',formData.address.value)
    data.append('confirmPassword', formData.confirmPassword.value)
    data.append('profilePicture', formData.profilePicture.value)

    register(data)
}


    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case 'name':
                isValid=validateName(value)
                break;
            case 'surname':
                isValid=validateSurname(value)
                break;
            case 'email':
                isValid=validateEmail(value)
                break;
            case 'username':
                isValid = validateUsername(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'phone':
                isValid=validatePhone(value)
                break
            case 'address':
                isValid=validateAddress(value)
                break
            case 'confirmPassword':
                isValid = validatePassConfirm(formData.password.value, value)
                break;
            case 'profilePicture':
                isValid=validateProfilePicture(formData.profilePicture.value)
                break;
            default:
                break;
        }
        setFormData((prevData)=>(
        {
                ...prevData,
                [field]:{
                    ...prevData[field],
                    isValid,
                    showError:!isValid
                }
        }
        ))
    }

    const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: {
            ...prevData[field],
            value
        }
    }))
}

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

            <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
                <div className="max-w-md w-full px-6 py-12 rounded-md ">
                    <div className="text-center mb-6">
                        <img src="/images/Mobi.png" alt="Logo" className="h-40 mx-auto mb-2" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Registro</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Email</label>
                            <Input 
                                field='email'
                                value={formData.email.value}
                                onChangeHandler={handleValueChange}
                                placeholder={formData.email.value}
                                type='email'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.email.showError}
                                validationMessage={emailValidationMessage}
                                
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className='flex flex-col'>
                                <label className="block mb-1 font-medium text-gray-700 ">Name</label>
                            <input
                                field='name'
                                value={formData.name.value}
                                onChangeHandler={handleValueChange}
                                placeholder={formData.name.value}
                                type='text'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.name.showError}
                                validationMessage={nameValidationMessage}
                                className="flex-1 p-2 box-border border border-gray-300 rounded"
                            />
                            </div>
                            <div className='flex flex-col'>
                              <label className="block mb-1 font-medium text-gray-700">Surname</label>
                            <input
                                field='surname'
                                value={formData.surname.value}
                                onChangeHandler={handleValueChange}
                                placeholder={formData.surname.value}
                                type='text'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.surname.showError}
                                validationMessage={surnameValidationMessage}
                                className="flex-1 p-2 box-border border border-gray-300 rounded"
                            />   
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <div className='flex flex-col'>
                               <label className="block mb-1 font-medium text-gray-700">Username</label>
                            <input 
                                field='username'
                                onChangeHandler={handleValueChange}
                                value={formData.username.value} 
                                placeholder={formData.username.value}
                                type='text'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.username.showError}
                                validationMessage={usernameValidationMessage}
                                className="flex-1 p-2 box-border border border-gray-300 rounded"
                            /> 
                            </div>
                            <div className='flex flex-col'>
                               <label className="block mb-1 font-medium text-gray-700">Phone</label>
                            <input 
                                field='phone'
                                onChangeHandler={handleValueChange}
                                value={formData.phone.value} 
                                type='text'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.phone.showError}
                                validationMessage={phoneValidationMessage}
                                className="flex-1 p-2 box-border border border-gray-300 rounded"
                            /> 
                            </div>
                            
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Address</label>
                            <Input 
                                field='address'
                                onChangeHandler={handleValueChange}
                                value={formData.address.value} 
                                type='text'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.address.showError}
                                validationMessage={addressValidationMessage}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Password</label>
                            <Input 
                                field='password'
                                onChangeHandler={handleValueChange}
                                value={formData.password.value} 
                                type='password'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.password.showError}
                                validationMessage={passwordValidationMessage}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Password Confirmation</label>
                            <Input 
                                field='confirmPassword'
                                onChangeHandler={handleValueChange}
                                value={formData.confirmPassword.value} 
                                type='password'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.confirmPassword.showError}
                                validationMessage={passConfirmValidationMessage}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Profile Picture</label>
                            <Input
                                field='profilePicture'
                                value={formData.profilePicture.value}
                                onChangeHandler={handleValueChange}
                                type='file'
                                onBlurHandler={handleValidationOnBlur}
                                showErrorMessage={formData.profilePicture.showError}
                                validationMessage={profilePictureValidationMessage} 
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitButtonDisable}
                            className={`w-full py-2 rounded-md text-white transition ${
                                isSubmitButtonDisable
                                    ? 'bg-blue-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Enviar
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6 text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <span
                            onClick={switchAuthHandler}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            ¡Inicia sesión acá!
                        </span>
                    </p>
                </div>
            </div>

            {/* Right column - image */}
            <div className="hidden md:block md:w-1/2 relative">
                <img
                    src="/images/Event.jpg"
                    alt="Evento"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
