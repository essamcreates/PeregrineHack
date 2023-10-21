import { useEffect, useState } from "react";


const DailyInteraction = ({currentUser}) => {

    // fetch daily question 
    // display options to user

    const [question, setQuestion] = useState();
    const [questionAnswered, setQuestionAnswered] = useState(false)
    const [userAnswer, setUserAnswer] = useState();

    const fetchQuestion = async (id) => {
        try {
          const response = await fetch(`http://localhost:8080/dailyQuestions/` + id , {
            method: "GET"
          });
          if (response.status === 302) {
            const data = await response.json();
            setQuestion(data);
          } else {
            console.error("Failed to fetch data");
          }
        } catch {
          console.error("Error while fetching data:", error);
        }
    };

    useEffect(()=>{
        if( !question){
        // returns a random number between 1 and 2 (to be increase once data loader is done)
        fetchQuestion(Math.floor((Math.random() * 2) + 1))}
    },[])

    const postQuestionAnswer = async(info) => {
        const url = `http://localhost:8080/answeredQuestions`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        })
    }

    const handleQuestionSubmit = (answer) => {
        setQuestionAnswered(true)
        setUserAnswer(answer)
        let template = {
                "chosenOption": answer,
                "dailyQuestionId": question.id, 
                "userId": currentUser.id
        }
        postQuestionAnswer(template)

    }


    const displayOptions = () => {
        const options=["optionOne","optionTwo","optionThree","optionFour","optionFive"]
        const choices=[]
        options.map((option)=> {
            const choice = question[option]
            if(choice){
                choices.push(
                <div>
                    <button value={option} onClick={(e)=>{handleQuestionSubmit(e.target.value)}}>{choice}</button>
                </div>
                )
            }
        });
        return choices
    }

    return (
        <>
        <div><h3>Question</h3></div>
        {question && !questionAnswered &&(
            <div>
                {question.question}
                {displayOptions()}
            </div>
        )}
        {questionAnswered && (
            <div>
                <p>Question: {question.question}</p>
                <p>Your Answer: {question[userAnswer]}</p>
            </div>
        )}
        </>
    )
}
export default DailyInteraction;