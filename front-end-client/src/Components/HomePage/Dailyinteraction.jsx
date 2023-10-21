import { useEffect, useState } from "react";


const DailyInteraction = ({currentUser}) => {

    // fetch daily question 
    // display options to user

    const [question, setQuestion] = useState();

    // "question": "How would you describe your day so far?",
    // "optionOne": "Excellent",
    // "optionTwo": "Terrible",
    // "optionThree": "Average",
    // "optionFour": "Ok",
    // "optionFive": null

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
        // returns a random number between 1 and 2
        fetchQuestion(Math.floor((Math.random() * 2) + 1))
    },[])


    // const displayOptions = () => {
    //     for
    // }

    return (
        <>
        <div><h3>Question</h3></div>
        {question && (<div>
            {question.question}
            {/* {displayOptions} */}

        </div>)}
        </>
    )
}
export default DailyInteraction;