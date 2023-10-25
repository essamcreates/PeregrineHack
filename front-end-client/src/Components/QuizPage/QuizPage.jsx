import {Link} from "react-router-dom";
import PersonalityAssessmentBar from "./PersonalityAssessmentBar";
import Questions from "./Questions";
import { useEffect, useState } from "react";

const QuizPage = ({currentUser}) => {
    const [currentQuestionId, setCurrentQuestionId] = useState(42);


    return (
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Personality Questionnaire</h1>
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

