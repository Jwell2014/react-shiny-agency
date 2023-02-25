import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { Loader } from "../utils/styles/atoms";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const Survey = () => {
    const { questionId } = useParams();   
    const questionIdInt = parseInt(questionId);
    const prevQuestionId = questionIdInt === 1 ? 1 : questionIdInt - 1;
    const nextQuestionId = questionIdInt + 1;
    const [surveyData, setSurveyData] = useState({});
    const [isDataloading, setDataLoading] = useState(false);
    const [error, setError] = useState(false)
   

    // Permet de faire l'appel a l'API pour recuperer les données,
  //On l'affiche uniquement à la première initialisation de notre composant,
  //et on précise un tableau de dépendances vide dans notre fichier
  useEffect(() => {
    async function fetchSurvey() {
        setDataLoading(true)
        try {
          const response = await fetch(`http://localhost:8000/survey`)
          const { surveyData } = await response.json()
          setSurveyData(surveyData)
        } catch (err) {
          console.log(err)
          setError(true)
        } finally {
          setDataLoading(false)
        }
      }
      fetchSurvey()
    }, [])



    return (
        <SurveyContainer>
            <QuestionTitle>Question {questionId}</QuestionTitle>
            {isDataloading ? (
                <Loader/>
            ):<QuestionContent>{surveyData[questionId]}</QuestionContent>
            }
            <LinkWrapper>
                <Link to={`/survey/${prevQuestionId}`}>Précédent</Link>
                {surveyData[questionIdInt + 1] ? (
                    <Link to={`/survey/${nextQuestionId}`}>Suivant</Link>
                ) : (
                    <Link to="/result">Résultats</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
       
    );
};

export default Survey;