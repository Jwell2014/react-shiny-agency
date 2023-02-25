import { useParams, Link } from "react-router-dom";


const Survey = () => {
    const { questionId } = useParams()
    const questionIdInt = parseInt(questionId)
    const prevQuestionId = questionIdInt === 1 ? 1 : questionIdInt - 1
    const nextQuestionId = questionIdInt + 1

    return (
        <div>
            <h1>Questionnaire a Remplir</h1>
            <Link to={`/survey/${prevQuestionId}`}>Précédent</Link>
            {questionIdInt === 10 ? (
                <Link to="/result">Résultats</Link>
            ) : (
                <Link to={`/survey/${nextQuestionId}`}>Suivant</Link>
            )}
        </div>
    );
};

export default Survey;