import React from 'react';

const FormInput = ({inputId, inputType='text', inputName, inputLabel, inputPlaceholder, required=false}) => {
    return (
            <div>
                <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputLabel}</label>
                <input type={inputType} id={inputId} name={inputName} onChange={onChange}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={inputPlaceholder} required={required}/>
            </div>
    );
};

export default FormInput;