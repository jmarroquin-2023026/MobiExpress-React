import PropTypes from 'prop-types'
import React from 'react'

export const Input1 = ({
    field,
    label,
    value,
    onChangeHandler,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    type,
    placeholder,
    textarea
}) => {

    const handleValueChange = (e) => {
    const val = type === 'file' ? e.target.files[0] : e.target.value
    onChangeHandler(val, field)
}

    const handleOnBlur = (e) => {
        const val = type === 'file' ? e.target.files[0] : e.target.value
        onBlurHandler(val, field)
    }

    return (
        <>
            <div>
                <span>{label}</span>
            </div>
            {
                textarea ? (
                    <textarea
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleOnBlur}
                        rows={5}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        value={type === 'file' ? undefined : value}
                        onChange={(e) => onChangeHandler(e, field)}
                        onBlur={handleOnBlur}
                        placeholder={placeholder}
                        multiple
                       className="shadow-sm bg-white border border-gray-300 text-gray-800 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 placeholder-gray-500"

                    />
                )
            }
            <span>{showErrorMessage && validationMessage}</span>
        </>
    )
}

Input1.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool
}