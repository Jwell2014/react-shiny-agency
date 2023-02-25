import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div >
           <nav >
        <Link to={"/"} className='linkHeader'>Home</Link>
      
        <Link to={"/survey/1"} className='linkHeader'>Questionnaire</Link>

        <Link to={"/freelance"} className='linkHeader'>Freelance</Link>

      </nav> 
        </div>
    );
};

export default Header;