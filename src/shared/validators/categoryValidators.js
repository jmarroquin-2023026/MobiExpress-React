export const categoryNameValidator=(name)=>{
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,50}$/
    return regex.test(name.trim())
}

export const descriptionCategoryValidator = (description) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{10,150}$/
    return regex.test(description.trim())
}

export const validateCategoryPicuture= (picture) => {
    if (!picture) return false

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 10 * 1024 * 1024 

    return validTypes.includes(picture.type) && picture.size <= maxSize
}

export const categoryNameValidatorMesg='El nombre de la categoria debe contener un mínimo de 3 y un máximo 50 carácteres'
export const descriptionCategoryValidatorMsg='La descripción de la categoria debe contener un mínimo de 10 y un máxido 150 carácteres'
export const validateCategoryPicutureMsg='La imagen debe ser JPG, JPEG, PNG o WEBP y no superar los 5 MB'