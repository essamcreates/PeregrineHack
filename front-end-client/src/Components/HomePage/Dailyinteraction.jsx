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
        options.map((option, index)=> {
            const choice = question[option]
            if(choice){
                if((index === 4) && (index % 2===0)){
                choices.push(
                <div key={index}class="col-span-2 flex items-center justify-center">
                    <button class="text-sm bg-pink-100 ring-offset-1 ring-1 m-2 p-1 w-2/5 rounded-lg shadow-lg" value={option} onClick={(e)=>{handleQuestionSubmit(e.target.value)}}>{choice}</button>
                </div>
                )}else{
                    choices.push(
                        <div key={index}class="flex items-center justify-center">
                            <button class="text-sm bg-pink-100 ring-offset-1 ring-1 m-2 p-1 w-4/5 rounded-lg shadow-lg" value={option} onClick={(e)=>{handleQuestionSubmit(e.target.value)}}>{choice}</button>
                        </div>)
                }
            }
        });
        return choices
    }

    return (
        <div class="border-2 border-slate-700 bg-blue-50 h-full rounded-lg p-1 shadow-xl">
        <div><h3 class="text-xl ml-2">Question</h3></div>
        {question && !questionAnswered &&(
            <div>
                <div class="text-center text-xl mt-1">{question.question}</div>
                <div class="grid grid-cols-2 " >{displayOptions()}</div>
            </div>
        )}
        {questionAnswered && (
            <div >
                <p class="text-2xl text-center mt-6">{question.question}</p>
                <p class="text-xl text-center m-5" >{question[userAnswer]}</p>
            </div>
        )}
        </div>
    )
}
export default DailyInteraction;