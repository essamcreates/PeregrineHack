import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Question from "./Question";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const fetchUserScore = async () => {
      try {
        const response = await fetch("http://localhost:8080/personalityQuestionnaire", {
          method: "GET"
        });
        console.log(response);
        if (response.status === 302) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch {
        console.error("Error while fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchUserScore();
    }, []);

    // have fetched all questions, now display one at a time.


    // display first question
    // dont map question have current question and then when option is clicked move on to next question (storing answer for prev also)
      
    const mappedQuestions = questions.map((question) => {  
      return (<div key={question.id}><Question question={question}/></div>)})
  
    return (
      <div>
         {mappedQuestions}

      </div>
    );
}
export default Questions;