import React, { useState } from "react";
import { validateEmailOrUsername, validatePassword } from "../../shared/validators/validators";
import { useLogin } from "../../shared/hooks/auth/useLogin";
import { Input } from "../Input";

export const Login = ({ switchAuthHandler }) => {
    const { login } = useLogin();
    const [formData, setFormData] = useState({
        userLogin: { value: '', isValid: false, showError: false },
        password: { value: '', isValid: false, showError: false }
    });

    const isSubmitButtonDisable = !formData.userLogin.isValid || !formData.password.isValid;

    const onValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: { ...prevData[field], value }
        }));
    };

    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'userLogin':
                isValid = validateEmailOrUsername(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormData(prevData => ({
            ...prevData,
            [field]: { ...prevData[field], isValid, showError: !isValid }
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(formData.userLogin.value, formData.password.value);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Columna izquierda - formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
                <div className="max-w-md w-full px-6 py-12 shadow-md rounded-md bg-white">
                    <div className="text-center mb-6">
                        <img src="/images/Mobi.png" alt="Logo" className="h-45 mx-auto mb-2" />
                        <h2 className="text-2xl font-bold text-gray-700">Mobi Express</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            field="userLogin"
                            label="Username o Email"
                            value={formData.userLogin.value}
                            onChangeHandler={onValueChange}
                            placeholder="example@mail.com"
                            type="text"
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.userLogin.showError}
                        />
                        <Input
                            field="password"
                            label="Password"
                            onChangeHandler={onValueChange}
                            value={formData.password.value}
                            type="password"
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.password.showError}
                        />

                        <div className="flex justify-between text-sm text-gray-600">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox mr-2" />
                                Recordar
                            </label>
                            <a href="#" className="text-blue-600 hover:underline">Olvidé mi contraseña</a>
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
                            Inicia Sesión
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6 text-gray-600">
                        ¿Aún no tienes una cuenta?{" "}
                        <span
                            onClick={switchAuthHandler}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            ¡Regístrate...!
                        </span>
                    </p>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img
                    src="/images/Event1.jpg"
                    alt="Evento"
                    className="w-full h-full object-cover"
                />
                <div className="text-center mt-2 text-sm text-gray-600"></div>
            </div>
        </div>
    );
};
