export const validateProductName = (name) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-\.]{3,50}$/
    return regex.test(name.trim())
}

export const validateProductDescription = (description) => {
    const trimmed = description.trim()
    return trimmed.length >= 10 && trimmed.length <= 500
}

export const validateProductCategory = (category) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,30}$/
    return regex.test(category.trim())
}

export const validateProductPrice = (price) => {
    const regex = /^\d+(\.\d{1,2})?$/
    return regex.test(price) && parseFloat(price) > 0
}

export const validateProductBrand = (brand) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-]{2,30}$/
    return regex.test(brand.trim())
}

export const validateProductStock = (stock) => {
    const regex = /^[0-9]+$/
    return regex.test(stock) && parseInt(stock) >= 0
}

export const validateProductDiscount = (discount) => {
    const regex = /^(100|[1-9]?[0-9])%$/
    return regex.test(discount.trim())
}

export const validateProductImages = (images) => {
    if (!images || images.length === 0 || images.length > 3) return false
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 10 * 1024 * 1024
    
    return images.every(img => 
        img && validTypes.includes(img.type) && img.size <= maxSize
    )
}

export const validateProductNameMsg = 'El nombre debe contener 3-50 caracteres (letras, números, guiones o puntos)'
export const validateProductDescriptionMsg = 'La descripción debe tener entre 10 y 500 caracteres'
export const validateProductCategoryMsg = 'La categoría debe contener solo letras y tener entre 3 y 30 caracteres'
export const validateProductPriceMsg = 'El precio debe ser un número positivo (ej. 10 o 10.50)'
export const validateProductBrandMsg = 'La marca debe contener entre 2 y 30 caracteres (letras, números o guiones)'
export const validateProductStockMsg = 'El stock debe ser un número entero positivo'
export const validateProductImagesMsg = 'Debe subir entre 1 y 3 imágenes válidas (JPEG/PNG/JPG/WEBP, máx 10MB cada una)'
export const validateProductDiscountMsg = 'Tiene que ser un numero del 1% al 100%'
