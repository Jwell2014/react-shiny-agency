import React from 'react';
import PropTypes from 'prop-types'
import DefaultPicture from '../images/profile.png';
import styled from 'styled-components';
import colors from '../utils/styles/colors';
import { Link } from 'react-router-dom';

const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`;
    const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
    `
    const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

const Card = ({label,title,picture}) => {
    

    return (
        <CardWrapper style={{ display: 'flex', flexDirection: 'column', padding: 15, }}>
            <CardLabel>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" />
            <span>{title}</span>
            {/* <button><Link to={"/profils/:profilId"}>la fiche</Link></button> */}
        </CardWrapper>
    );
};

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,

}

Card.defaultProps = {
    title: '',
    label: '',
    picture: DefaultPicture
}
export default Card;