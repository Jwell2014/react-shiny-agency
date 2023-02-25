import React from 'react';
import Img404 from '../images/page404.jpeg'

const PageNotFound = () => {
    return (
        <div>
            <img src={Img404} alt='page 404'style={{ width: '100%', }} />
        </div>
    );
};

export default PageNotFound;