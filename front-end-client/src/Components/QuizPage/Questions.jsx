import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PersonalityAssessmentBar from "./PersonalityAssessmentBar";

const Questions = ({currentUser}) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(42);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [score, setScore] = useState()
    const [quizCompleted, setQuizCompleted] =useState(false)
    const [explanation, setExplanation] = useState()
    const [postSent, setPostSent] = useState(false);

    const [request, setRequest] = useState(
          {
            "userId": currentUser.id,
            "questionAnswers":[
              {"42":null},{"43":null},{"44":null},{"45":null},{"46":null},{"47":null},{"48":null},{"49":null},{"50":null},
              {"51":null},{"52":null},{"53":null},{"54":null},{"55":null},{"56":null},{"57":null},{"58":null},{"59":null},
              {"60":null},{"61":null},{"62":null},{"63":null},{"64":null},{"65":null},{"66":null},{"67":null},{"68":null},
              {"69":null},{"70":null},{"71":null},{"72":null},{"73":null},{"74":null},{"75":null},{"76":null},{"77":null},
              {"78":null},{"79":null},{"80":null},{"81":null},{"82":null},{"83":null},{"84": null}
          ]
        })

//  fetches all questions
    const fetchQuestions = async () => {
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
//  useEffect means that all questions fetched on page load
    useEffect(() => {
      fetchQuestions();
    }, []);


    // /calculate-personality-score
    const calculateScore = async () => {
      const url = `http://localhost:8080/personalityQuestionnaire/calculate-personality-score`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(request),
      })
      const data = await response.json()
      setScore(data)
      setQuizCompleted(true)
      console.log(response.body);
  }

  const describeScores = async (input) => {
    try {
      const url = `http://localhost:8080/openAI`;
      setPostSent(true)
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "give an overall result of these big five personality scores and also infomation on what each mean. Here are my scores "+ input + " (response in less than 80 words)"
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("sent to " + input);
      const data = await response.text();

      // Set the response data in the component's state
      setExplanation(data);
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(()=>{
    if(postSent && score){
      const results = "Openness: " + Math.round(score.openness) + "%  Conscientiousness: " +
      Math.round(score.conscientiousness) + "%  extraversion: " +Math.round(score.extraversion) + "% Agreeablness: " + 
      Math.round(score.agreeableness) + "% neuroticism: " +Math.round(score.neuroticism)
      describeScores(results)
    }
  },[postSent])
  

    const displayScore = () => {
      if (score !== null) {
        return (<>
          <div className="text-center flex flex-col">
            <h1 className="text-3xl"><b>Your score:</b></h1>
            <p><b>Openness</b> : {Math.round(score.openness)}% </p>
            <p><b>Conscientiousness</b> : {Math.round(score.conscientiousness)}% </p>
            <p><b>Extraversion</b> : {Math.round(score.extraversion)}% </p> 
            <p><b>Agreeableness</b> : {Math.round(score.agreeableness)}% </p>
            <p><b>Neuroticism</b> : {Math.round(score.neuroticism)}%</p>
          </div>
          <div>
            {explanation ? (<>
              {explanation}
            </>) 
            : 
            <p>Loading ....</p> }
          </div>
        </>)
      }
      return null;
    }

    const handleAnswer = (chosenAnswer) =>{
      // want to push their answer to json
      // request.questionAnswers[currentQuestionId-42] = choosenAnswer
      // setCurrentQuestionId(currentQuestionId+1)
      // console.log(request)
      const chosenAnswerInt = parseInt(chosenAnswer, 10);
      const updatedRequest = { ...request };

      // Update the copy with the user's chosen answer
      updatedRequest.questionAnswers[currentQuestionId - 42] = { [currentQuestionId.toString()]: chosenAnswerInt };
    
      // Update the currentQuestionId to move to the next question
      setCurrentQuestionId(currentQuestionId + 1);
      setQuestionsAnswered(questionsAnswered + 1);
    
      // Set the updated copy as the new state
      setRequest(updatedRequest)
    
      console.log(request);
    }


    const displayQuestion = () => {
      //  finds the question from its id
      if (questions && questions.length > 0) {
      const currentQuestion= questions.find((step) => step.id === currentQuestionId)
      console.log(currentQuestion)
      const options= ["strongly disagree", "disagree", "neutral" , "agree", "strongly agree" ]
      const choices = []

      options.map((option, index)=>{
        choices.push(
        <div key={index} className="inline-block mx-2 text-center">
          <button 
          value={index+1} 
          onClick={(e)=>{handleAnswer(e.target.value) }}
          className="bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-full"
          >
            {option}
            </button>
            </div>
            )
      })

      const questionNumber = currentQuestionId - 41;

      return (
        <div>
        <PersonalityAssessmentBar 
            currentQuestionId={currentQuestionId}
            totalQuestions={questions.length}
            questionsAnswered={questionsAnswered}
        />
        <div className="text-center transition-opacity duration-1000">
            <p className="mb-8 font-bold">{currentQuestion.question}</p>
            <div className="mt-4">
                {choices}
            </div>
        </div>
    </div>
      );  
    }else{
      return <div><p>Loading question</p></div>
    }
  }
  
    return (
            <div>
         {!quizCompleted && (<>{questions && (currentQuestionId!==85) && (<div>{displayQuestion()}</div>)}
         {currentQuestionId===85 && (
          <div className="flex justify-center">
            <button onClick={()=>{calculateScore()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focuse:outline-none focuse:shadow-outline">
            Submit
          </button>
          </div>
          )}</>)}
          {score && quizCompleted && (<>{displayScore()}</>)}
      </div>
    );

}
export default Questions;