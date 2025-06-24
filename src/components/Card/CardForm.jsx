import React, { useState } from 'react'
import { useAddCard } from '../../shared/hooks/card/useAddCard'
import { validateCvv, validateCvvMsg, validateDate, validateDateMsg, validateName, validateNameMsg, validateNumber, validateNumberMsg } from '../../shared/validators/cardValidators'
import { Input } from '../Input'
import { useLogin } from '../../shared/hooks/auth/useLogin'

export const CardForm = () => {
    const form = {
        titular: {
            value: '',
            isValid: false,
            showErrors: false
        },
        number: {
            value: '',
            isValid: false,
            showErrors: false
        },
        expirationDate: {
            value: '',
            isValid: false,
            showErrors: false
        },
        cvv: {
            value: '',
            isValid: false,
            showErrors: false
        }
    }

    const [formData, setFormData] = useState(form)
    const { add } = useAddCard()
    const userId = JSON.parse(localStorage.getItem("user"));
    const user = userId?.uid;

    const isSubmitButtonDisabled = !formData.titular.isValid ||
        !formData.number.isValid ||
        !formData.expirationDate.isValid ||
        !formData.cvv.isValid

     const handleSubmit = (event) => {
        event.preventDefault();
        
        // Verificar que existe userId
        if (!user) {
            toast.error("Debes iniciar sesión para agregar una tarjeta");
            return;
        }

        // Mostrar datos en consola para debug
         const cardData = {
            titular: formData.titular.value,
            number: formData.number.value,
            expirationDate: formData.expirationDate.value,
        };
console.log('Datos a enviar:', cardData);
        // Llamar a la función add con el userId
         add(cardData);
    };

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'titular':
                isValid = validateName(value)
                break
            case 'number':
                isValid = validateNumber(value)
                break
            case 'expirationDate':
                isValid = validateDate(value)
                break
            case 'cvv':
                isValid = validateCvv(value)
                break
            default:
                break
        }
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showErrors: !isValid
            }
        }))
    }

    const handleValueChange = (value, field) => {
        if (field === 'expirationDate') {
            let newValue = value.replace(/\D/g, '')
            if (newValue.length > 2) {
                newValue = newValue.substring(0, 2) + '/' + newValue.substring(2, 4)
            }
            if (newValue.length > 5) return
            
            setFormData(prevData => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value: newValue
                }
            }))
        } else {
            setFormData(prevData => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }))
        }
    }

    return (
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <Input
                        field='titular'
                        label='Nombre del titular'
                        value={formData.titular.value}
                        onChangeHandler={handleValueChange}
                        placeholder='Ej: Juan Pérez'
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.titular.showErrors}
                        validationMessage={validateNameMsg}
                        maxLength={50}
                    />
                    <Input
                        field='number'
                        label='Número de la tarjeta'
                        value={formData.number.value}
                        onChangeHandler={handleValueChange}
                        placeholder='Ej: 1234567812345678'
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.number.showErrors}
                        validationMessage={validateNumberMsg}
                        maxLength={16}
                    />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            field='expirationDate'
                            label='Fecha de expiración (MM/YY)'
                            value={formData.expirationDate.value}
                            onChangeHandler={handleValueChange}
                            placeholder='YY/MM'
                            type='text'
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.expirationDate.showErrors}
                            validationMessage={validateDateMsg}
                            maxLength={5}
                        />
                    
                        <Input
                        field='cvv'
                        label='CVV'
                        value={formData.cvv.value}
                        onChangeHandler={handleValueChange}
                        placeholder='123'
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.cvv.showErrors}
                        validationMessage={validateCvvMsg}
                        maxLength={3}
                    />
                    </div>
                    
                    
                    <button
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                        className={`w-full py-2 rounded-md text-white transition ${
                            isSubmitButtonDisabled
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        Enviar
                    </button>
            </form>
        </div>
    )
}