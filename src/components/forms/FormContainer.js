import React from 'react';

const FormContainer = ({children}) => {
    return (
        <div className={`grid gap-6 md:grid-cols-2`}>
            {children}
        </div>
    );
};

export default FormContainer;