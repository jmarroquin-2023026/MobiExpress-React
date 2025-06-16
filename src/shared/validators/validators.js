export const validateEmailOrUsername = (user) => {
    const emailRegex = /\S+@\S+\.\S+/
    const usernameRegex = /^\S{3,8}$/

    return emailRegex.test(user) || usernameRegex.test(user);
}

export const validateName = (name) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,30}$/
    return regex.test(name.trim())
}

export const validateSurname = (surname) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,30}$/
    return regex.test(surname.trim())
}


export const validateEmail = (email)=>{
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}

export const validateUsername = (username)=>{
    const regex = /^\S{5,8}$/
    return regex.test(username)
}

export const validatePassword = (password)=>{
    const regex = /^\S{5,20}$/ 
    return regex.test(password)
}


export const validateAddress = (address) => {
    const regex = /^[A-Za-z0-9\s,.'-]{20,200}$/
    return regex.test(address)
}

export const validatePhone = (phone) => {
    const regex = /^\+502 \d{8}$/
    return regex.test(phone)
}
export const validatePassConfirm = (password, confirmPassword)=>{
    return password === confirmPassword
}

    
    
export const validateProfilePicture = (profilePicture) => {
    if (!profilePicture) return false

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 10 * 1024 * 1024 

    return validTypes.includes(profilePicture.type) && profilePicture.size <= maxSize
}


export const nameValidationMessage = 'El nombre debe tener entre 2 y 30 letras, sin caracteres especiales ni espacios'
export const surnameValidationMessage = 'El apellido debe tener entre 2 y 30 letras, sin caracteres especiales ni espacios'
export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const usernameValidationMessage = 'El nombre de usuario debe contener entre 3 y 8 caracteres (Sin espacios)'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios'
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'
export const profilePictureValidationMessage = 'La imagen debe ser JPG, JPEG, PNG o WEBP y no superar los 5 MB'
export const addressValidationMessage = 'La dirección debe tener entre 10 y 200 caracteres'
export const phoneValidationMessage = 'El número de teléfono debe comenzar con +502 seguido de un espacio y luego 8 dígitos numéricos'
