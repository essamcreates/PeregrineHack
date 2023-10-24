import { useEffect } from "react";

const PersonalityAssessmentBar = ({currentQuestionId, totalQuestions}) => {
    const progress = (currentQuestionId / totalQuestions) * 100;

    useEffect (() => {
        progress
    }, [currentQuestionId]
    )
    
    return (
        <div className="w-full mb-4">
            <div className="bg-gray-200 h-4 rounded-full">
                <div className="bg-cyan-500 h-4 rounded-full transition-width duration-500"
                style={{width: `${progress}%`}}
                ></div>
            </div>
            <p className="text-center mt-2">{`Question ${currentQuestionId} of ${totalQuestions}`}</p>
        </div>
    )
}
export default PersonalityAssessmentBar;