import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Question from "./Question";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(42)


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

    const displayQuestion = () => {
      //  finds the question from its id
      const currentQuestion= questions.find((step) => step.id === currentQuestionId)
      console.log(currentQuestion)
      const options= ["strongly disagree", "disagree", "neutral" , "agree", "strongly agree" ]
      const choices = []
      options.map((option, index)=>{
        choices.push(<div key={index}><button value={index+1} onClick={()=>{setCurrentQuestionId(currentQuestion.id+1)}}>{option}</button></div>)
      })
      return (<div>
        <p>Question : {currentQuestion.question}</p>
        <div>{choices}</div>
      </div>)


      // const choices =[]
      // currentLevel.options.map((option, index)=>{
      //     choices.push(<div key={index}><button onClick={()=>{handleOptionClick(option.sendText,option.next)}}>{option.displayText}</button></div>)
      // })
      // return (<div  className="chat-bot-message">
      //     <div className="message"><p>{currentLevel.message}</p></div>
      //     <div>{choices}</div>
      // </div>)

    }
  
    return (
      <div>
         {questions && (<div>{displayQuestion()}</div>)}
         {/* {mappedQuestions} */}

      </div>
    );
}
export default Questions;