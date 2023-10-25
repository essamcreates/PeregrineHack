import {Link} from "react-router-dom";
import PersonalityAssessmentBar from "./PersonalityAssessmentBar";
import Questions from "./Questions";
import "./QuizPage.css"
import { useEffect, useState } from "react";

const QuizPage = ({currentUser}) => {
    const [currentQuestionId, setCurrentQuestionId] = useState(42);


    return (
        <div className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-red-200 via-red-300 to-yellow-200">
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3x1 font-bold mb-4 text-center">Personality Questionnaire</h1>
            <div className="container mx-auto bg-white shadow-lg p-6 rounded-lg">
                <Questions
                currentQuestionId={currentQuestionId}
                setCurrentQuestionId={setCurrentQuestionId}
                currentUser={currentUser}
                />
            </div>
        </div>
        </div>
    )
}
export default QuizPage;

