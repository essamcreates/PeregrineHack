import {Link} from "react-router-dom";
import Questions from "./Questions";
import "./QuizPage.css"

const QuizPage = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3x1 font-bold mb-4 text-center">Personality Questionnaire</h1>
            <div className="container mx-auto bg-white shadow-lg p-6 rounded-lg">
                <Questions/>
            </div>
        </div>
    )
}
export default QuizPage;