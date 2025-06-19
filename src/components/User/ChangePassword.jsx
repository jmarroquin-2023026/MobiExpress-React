import { useState } from 'react'
import { useUser } from '../../shared/hooks/user/useUser'

export const ChangePasswordPage = () => {
    const [passwordMessage, setPasswordMessage] = useState('')
    const { changePassword } = useUser()
    const [disabled, setDisabled] = useState(true)
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        changePassword(formData.oldPassword, formData.newPassword)
    }

    const handlePasswordConfirmation = async () => {
        if (formData.newPassword === formData.confirmPassword) {
            setPasswordMessage('')
            setDisabled(false)
        } else {
            setPasswordMessage('La contraseña no coincide')
            setDisabled(true)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 shadow-md rounded-md">
                <h1 className="text-center text-xl font-semibold mb-6">Change your password</h1>

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border border-gray-500 overflow-hidden">
                        <img
                            src="/ruta/a/tu/imagen.png" // reemplaza con tu ruta
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña Actual:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handlePasswordConfirmation}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
                        />
                        {passwordMessage && (
                            <span className="text-sm text-red-500">{passwordMessage}</span>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={disabled}
                            className="bg-sky-400 text-white px-6 py-2 rounded-md hover:bg-sky-500 disabled:opacity-50 transition"
                        >
                            Cambiar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
