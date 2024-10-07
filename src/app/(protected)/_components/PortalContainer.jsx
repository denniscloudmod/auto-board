import React from 'react';

const PortalContainer = ({children}) => {
    return (
        <div className={'p-4 md:p-6 2xl:p-10'}>
            {children}
        </div>
    );
};

export default PortalContainer;