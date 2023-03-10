import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { Loader } from "../utils/styles/atoms";
import { useContext } from "react";
import { SurveyContext } from "../utils/styles/context";
import {useFetch, useTheme} from '../utils/hooks/callAPI';

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
  text-align: center;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
}
`
const LinkValidate = styled(Link)`
  text-decoration: none;
  color:${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const ReplyBox = styled(Link)`
  border: none;
  text-decoration: none;
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
    margin-right: 10px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
  &:hover{
    background-color: #8186a0;
    color: white;
  }
  & a {
    text-decoration: none;
    color: black;
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
    const nextQuestionId = questionIdInt === 7 ? 7 : questionIdInt + 1;
    const { theme } = useTheme()
    const {answers, saveAnswers} = useContext(SurveyContext);
     // Permet de sauvegarder la reponse en fonction de la question
     function saveReply(answer) {
      saveAnswers({ [questionId]: answer })
    }


    const {data, isLoading, error} = useFetch(`http://localhost:8000/survey`);
    const surveyData = data?.surveyData   
   
    // Permet de faire l'appel a l'API pour recuperer les donn??es,
  //On l'affiche uniquement ?? la premi??re initialisation de notre composant,
  //et on pr??cise un tableau de d??pendances vide dans notre fichier
  // seEffect(() => {
  //   async function fetchSurvey() {
  //       setDataLoading(true)
  //       try {
  //         const response = await fetch(`http://localhost:8000/survey`)
  //         const { surveyData } = await response.json()
  //         setSurveyData(surveyData)
  //       } catch (err) {
  //         console.log(err)
  //         setError(true)
  //       } finally u{
  //         setDataLoading(false)
  //       }
  //     }
  //     fetchSurvey()
  //   }, [])

    if (error) {
      return <span>Oups il y a eu un probl??me</span>
    }


    return (
        <SurveyContainer>
            
            {/* Affichage de la question recuperer sur API */}
            <QuestionTitle theme={theme}>{surveyData && surveyData[questionId] ? ('Question' + ' ' + `${questionId}`):('R??sultat')}</QuestionTitle>
            {isLoading ? (
                <Loader/>
            ):
            // v??rifier que surveyData  est d??fini avant de l'utiliser dans le composant
            <QuestionContent theme={theme}> {surveyData[questionId]}</QuestionContent>
            }
            {/* Bouton pour permettre une reponse a la question */}
            {surveyData && surveyData[questionId] ? (
                    <div>
                    <ReplyWrapper>
                    <ReplyBox
                      onClick={() => saveReply(true)}
                      isSelected={answers[questionId] === true}
                      to={`/survey/${nextQuestionId}`}
                    >
                          oui
                    </ReplyBox>
                    <ReplyBox
                      onClick={() => saveReply(false)}
                      isSelected={answers[questionId] === false}
                      to={`/survey/${nextQuestionId}`}
                    >
                          non
                    </ReplyBox>
      
                  </ReplyWrapper>
                    {/* Permet de passer d'une question a une autre  */}
                    <LinkWrapper theme={theme}>
                    <Link to={`/survey/${prevQuestionId}`}>Question Pr??c??dente</Link>
                    {/* v??rifier que surveyData  est d??fini avant de l'utiliser dans le composant */}
                    {surveyData && surveyData[questionId] ? (
                        <Link to={`/survey/${nextQuestionId}`}>Question Suivante</Link>
                    ) : (
                        <Link to="/results">R??sultats</Link>
                    )}
                   </LinkWrapper>
                   </div>
                ) : (
                    <LinkValidate theme={theme} to="/results">
                      <p>?????????????????????????????????????????????????????????????????????????????????</p>
                      <p>CLIQUER POUR VOIR LE RESULTAT ICI</p>
                      <p>?????????????????????????????????????????????????????????????????????????????????</p>
                      </LinkValidate>
                    
                )}
            

          
        </SurveyContainer>
       
    );
};

export default Survey;