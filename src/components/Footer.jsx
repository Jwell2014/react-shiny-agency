import React from 'react';
import styled from 'styled-components';
import colors from '../utils/styles/colors';
import { useContext } from 'react';
import { ThemeContext } from '../utils/styles/context';

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
  
    
`
 
const NightModeButton = styled.button`
    background-color: transparent;
    cursor: pointer;
    color: ${colors.secondary};
    border-radius: 20px;
    margin: 10px;
    &:hover{
      background-color: green;
      color: white;
    }
`
const Footer = () => {
    const { toggleTheme, theme } = useContext(ThemeContext)

    return (
      <FooterContainer>
        <NightModeButton onClick={() => toggleTheme()}>
          Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
        </NightModeButton>
      </FooterContainer>
    )
};

export default Footer;