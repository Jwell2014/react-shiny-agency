import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../utils/styles/colors';
import logoDark from '../images/dark-logo.png'
import { NavLink } from "react-router-dom";
import '../styles/header.css';

const StyledLink = styled(NavLink)`
    padding: 10px;
    text-decoration: none;
    font-size: 18px;
  
    ${(props)=> props.$isFullLink && `color: white; border-radius: 10px; background-color: ${colors.primary};` }
`
const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const Header = () => {
    return (
     

        <NavContainer>
        <Link to="/">
          <HomeLogo src={logoDark} />
        </Link>
        <div>
        <NavLink
            className={({ isActive }) => (isActive ? "linkActive" : undefined)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "linkActive" : undefined)}
            to="/freelances">
              Profils
          </NavLink>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </div>
      </NavContainer>
    );
};

export default Header;