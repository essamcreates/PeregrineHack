import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

const Option = () => {

    const [questions, setQuestions] = useState([]);
    const fetchUserScore = async () => {
        try {
        const response = await fetch('http://localhost:8080/personalityQuestionnaire');
        if (response.ok) {
        const data = await response.json();
        setQuestions(data);
    } else {
        console.error("Failed to fetch data");
    }
    } catch {
        console.error("Error while fetching data:", error);
    }
};

    useEffect(()=>{
        fetchUserScore();

    },[]);
    
    
    return (
        <div>
            <h1>Personality Questionnaire</h1>
            <ul>
            {questions.map((question, index) => (
            <li key={index}>{question}</li>
        ))}
        </ul>
        </div>
    )
}
export default Option;