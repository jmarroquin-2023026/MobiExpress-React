import React, { useState } from 'react'
import { Input } from '../Input'
import { addressValidationMessage, emailValidationMessage, nameValidationMessage, passConfirmValidationMessage, passwordValidationMessage, 
    phoneValidationMessage, 
    profilePictureValidationMessage, surnameValidationMessage, usernameValidationMessage, 
    validateAddress, 
    validatePhone} from '../../shared/validators/validators'
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
        <form onSubmit={handleSubmit}>
                <h1>Register</h1>
            <div >
            <label>Name</label>
            <Input
                field='name'
                value={formData.name.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.name.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={nameValidationMessage}
            />
            </div>
            <div >
            <label>Surname</label>
            <Input
                field='surname'
                value={formData.surname.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.surname.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.surname.showError}
                validationMessage={surnameValidationMessage}
            />
            </div>
            <div >
            <label>Email</label>
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
            <div >
            <label>Username</label>
            <Input 
                field='username'
                onChangeHandler={handleValueChange}
                value={formData.username.value} 
                placeholder={formData.username.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.username.showError}
                validationMessage={usernameValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label>Phone</label>
            <Input 
                field='phone'
                onChangeHandler={handleValueChange}
                value={formData.password.value} 
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.phone.showError}
                validationMessage={phoneValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label>Adress</label>
            <Input 
                field='address'
                onChangeHandler={handleValueChange}
                value={formData.address.value} 
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={addressValidationMessage}
            />
            </div>
            <div >
            <label>Password</label>
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
            <div >
            <label>Password Confirmation</label>
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
            <div className="mb-6 ">
            <label>Profile Picture</label>
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
            disabled={isSubmitButtonDisable} type='submit'>Enviar</button>
            <span onClick={switchAuthHandler} >
                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
            </span>
        </form>
    )
}