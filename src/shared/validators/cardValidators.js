export const validateName = (name) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/
    return regex.test(name.trim())
}

export const validateNumber=(number)=>{
    const regex=/^[0-9]{16}$/
    return regex.test(number.trim())
}

export const validateDate=(date)=>{
    const regex=/^([0-9]{2})\/(0[1-9]|1[0-2])$/
    return regex.test(date.trim())
}

export const validateCvv=(cvv)=>{
    const regex=/^[0-9]{3}$/
    return regex.test(cvv.trim())
}

export const validateNameMsg = 'El nombre debe contener solo letras y tener entre 10 y 50 caracteres'
export const validateNumberMsg = 'El número de tarjeta debe tener 16 dígitos numéricos'
export const validateDateMsg = 'La fecha debe estar en formato YY/MM'
export const validateCvvMsg = 'El CVV debe tener exactamente 3 dígitos numéricos'