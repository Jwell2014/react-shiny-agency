import React from 'react';
import { useFetch } from '../utils/hooks/callAPI';
import styled from 'styled-components';
import { Loader } from '../utils/styles/atoms';
import { useParams } from 'react-router-dom';





const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Profils = () => {
    const { profilId } = useParams;   

    const {data, isLoading, error} = useFetch(`http://localhost:8000/freelances`);


    return (
        <div>
             {isLoading ? (
        <LoaderWrapper>
          <Loader  />
        </LoaderWrapper>
      ) : (
        <div>
          <label>{label}</label>
            <img src={picture} alt="freelance" />
            <span>{title}</span>
        </div>
      )}
        </div>
    );
};

export default Profils;

Profils.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,

}
