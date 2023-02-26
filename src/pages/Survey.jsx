import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { Loader } from "../utils/styles/atoms";
import { useContext } from "react";
import { SurveyContext } from "../utils/styles/context";
import {useFetch, useTheme} from '../utils/hooks/callapi';

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
text-decoration: underline;
text-decoration-color: ${colors.primary};
color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
margin: 30px;
color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
}
`
const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
  &:hover{
    background-color: #8186a0;
  }
`

const ReplyWrapper = styled.div`
border: none;
height: 100px;
width: 300px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${({ theme }) =>
  theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
border-radius: 30px;
cursor: pointer;
box-shadow: ${(props) =>
  props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
&:first-child {
  margin-right: 15px;
}
&:last-of-type {
  margin-left: 15px;
}
`


const Survey = () => {
    const { questionId } = useParams();   
    const questionIdInt = parseInt(questionId);
    const prevQuestionId = questionIdInt === 1 ? 1 : questionIdInt - 1;
    const nextQuestionId = questionIdInt + 1;
    const { theme } = useTheme()
    const {answers, saveAnswers} = useContext(SurveyContext);
     // Permet de sauvegarder la reponse en fonction de la question
     function saveReply(answer) {
      saveAnswers({ [questionId]: answer })
    }


    const {data, isLoading, error} = useFetch(`http://localhost:8000/survey`);
    const surveyData = data?.surveyData   
   
    // Permet de faire l'appel a l'API pour recuperer les données,
  //On l'affiche uniquement à la première initialisation de notre composant,
  //et on précise un tableau de dépendances vide dans notre fichier
  // useEffect(() => {
  //   async function fetchSurvey() {
  //       setDataLoading(true)
  //       try {
  //         const response = await fetch(`http://localhost:8000/survey`)
  //         const { surveyData } = await response.json()
  //         setSurveyData(surveyData)
  //       } catch (err) {
  //         console.log(err)
  //         setError(true)
  //       } finally {
  //         setDataLoading(false)
  //       }
  //     }
  //     fetchSurvey()
  //   }, [])

    if (error) {
      return <span>Oups il y a eu un problème</span>
    }


    return (
        <SurveyContainer>
            
            {/* Affichage de la question recuperer sur API */}
            <QuestionTitle theme={theme}>Question {questionId}</QuestionTitle>
            {isLoading ? (
                <Loader/>
            ):
            // vérifier que surveyData  est défini avant de l'utiliser dans le composant
            <QuestionContent theme={theme}> {surveyData[questionId]}</QuestionContent>
            }
            {/* Bouton pour permettre une reponse a la question */}
            <ReplyWrapper>
              <ReplyBox
                onClick={() => saveReply(true)}
                isSelected={answers[questionId] === true}
              >
                Oui
              </ReplyBox>
              <ReplyBox
                onClick={() => saveReply(false)}
                isSelected={answers[questionId] === false}
              >
                Non
              </ReplyBox>
            </ReplyWrapper>

            {/* Permet de passer d'une question a une autre */}
            <LinkWrapper theme={theme}>
                <Link to={`/survey/${prevQuestionId}`}>Précédent</Link>
                {/* vérifier que surveyData  est défini avant de l'utiliser dans le composant */}
                {surveyData && surveyData[questionId] ? (
                    <Link to={`/survey/${nextQuestionId}`}>Suivant</Link>
                ) : (
                    <Link to="/results">Résultats</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
       
    );
};

export default Survey;