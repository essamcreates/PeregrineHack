import {Link} from "react-router-dom";
import Questions from "./Questions";
import "./QuizPage.css"

const QuizPage = () => {

    return (
        <div>
            <h1>Personality Questionnaire</h1>
            <div className="question-box">
                <Questions/>
            </div>
        </div>
    )
}
export default QuizPage;