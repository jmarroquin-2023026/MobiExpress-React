import React, { useState } from "react";
import { validateEmailOrUsername, validatePassword } from "../../shared/validators/validators";
import { useLogin } from "../../shared/hooks/auth/useLogin";
import { Input } from "../Input";

export const Login=({switchAuthHandler})=>{
    const {login}=useLogin()
    const [formData,setFormData]=useState(
        {
            userLogin:{
                value:'',
                isValid:false,
                showError:false
            },
            password:{
                value:'',
                isValid:false,
                showError:false
            }
        }
    )

    const isSubmitButtonDisable=!formData.userLogin.isValid||
                                !formData.password.isValid

    const onValueChange=(value,field)=>{
        setFormData((prevData)=>(
            {
                    ...prevData,
                [field]:{
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case'userLogin':
                isValid=validateEmailOrUsername(value)
                break
            case 'password':
                isValid=validatePassword(value)
                break
            default:
                break
        }
        setFormData((prevData)=>(
            {
                    ...prevData,
                [field]:{
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    const handleLogin=(e)=>{
        e.preventDefault()
        login(
            formData.userLogin.value,
            formData.password.value
        )
    }
    


    return(
        <div>
            <form onSubmit={handleLogin}>
                <Input 
                    field='userLogin'
                    label='Username o Email' 
                    value={formData.userLogin.value}
                    onChangeHandler={onValueChange}
                    placeholder={formData.userLogin.value}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.userLogin.showError}

                />
                <Input 
                    field='password'
                    label='Password' 
                    onChangeHandler={onValueChange}
                    value={formData.password.value} 
                    type='password'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.password.showError}
                />
                <button
                    type="submit"
                    disabled={isSubmitButtonDisable}
                >
                    LogIn
                </button>
            </form>
            <span onClick={switchAuthHandler}>
                ¿Aún no tienes una cuenta? ¡Registrate...!
            </span>
        </div>
    )
}