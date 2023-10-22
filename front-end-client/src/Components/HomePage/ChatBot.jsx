import { useEffect, useState } from "react";

const ChatBot = () => {

    const [usingChatBot, setUsingChatBot] = useState(false);
    const [requestString, setRequestString] = useState("");  // message that will be sent to openapi
    const [currentStep, setCurrentStep] = useState(1);
    const [response, setResponse] = useState("");
    const [previousSteps, setPreviousSteps] = useState([]);
    const [userInput, setUserInput] = useState();
    const [sent, setSent] = useState(false)
    const [prevChoices, setPrevChoices] = useState([])

    // will have a conversation (with directed points) , these directed points/ options will be sent to api
    // chat bot will display the question & options and the user will click the button (choosing thier desired option) then the next question will come up
    // need to display users question.


    const chatBotRequest=async(input)=>{
        try {
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: input + "response in less than 70 words",
            });
            
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.text();
        
            // Set the response data in the component's state
            setResponse(data);
            console.log(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
       
    }

    // next : 0 , 0 indicates send
    const conversationFlow = [
        {
            id: 1,
            message: "Would you like to chat about..",
            options: [
                { displayText: "Wellness", sendText: "Question : Regarding my wellness at work ", next: 2 },
                { displayText: "Career", sendText: "Question : In terms of my career ", next: 6 },
                { displayText : "Or Ask Farai a Question", sendText: "Question", next: 100 } // 100 means user wants to input
            ],
        },
        {
            id: 2,
            message: null,
            options: [
                { displayText: "Looking for advice", sendText: "I am looking for advice on ", next: 4 },
                { displayText: "Want to de-stress", sendText: "how should I de-stress in ", next: 5 },
            ],
        },
        {
            id: 4,
            message: "Please choose a topic",
            options: [
                { displayText: "Imposter Syndrome", sendText: "Having imposter syndrome ", next: 0 }, // possible switch 0 to word send
                { displayText: "Personal Life", sendText: "Dealing with personal problems ", next: 0 },
                { displayText: "Over Stressed", sendText: "Being over stressed ", next: 0 },
                { displayText: "Can't Focus", sendText: "Can't focus at work ", next: 0 },
            ],
        },
        {
            id: 5,
            message: "When are you planning on trying to de-stress?",
            options: [
                { displayText: "Short Break", sendText: "(Short break) est 15 minutes ", next: 0 },
                { displayText: "Take Lunch ", sendText: "(Lunch) est 60 mins or so ", next: 0 },
                { displayText: "After Work ", sendText: "Evening ", next: 0 },
                { displayText: "At the Weekend", sendText: "The weekend / days off ", next: 0 },
            ],
        },
        {
            id: 6,
            message: "Please choose a skill you would like to improve",
            options: [
                { displayText: "Leadership", sendText: "how should I improve leadership skills", next: 0 },
                { displayText: "Teamwork", sendText: "how should I improve teamwork skills", next: 0 },
                { displayText: "Time Management", sendText: "how should I improve time management skills", next: 0 },
                { displayText: "Presentation", sendText: "how should I improve presentation skills", next: 0 },
            ],
        },
    ];

    const handleOptionClick = async(choice, text , nextStep) => {
        setRequestString(requestString+text)
        setPrevChoices((prevChoices) => [...prevChoices, choice])

        if(nextStep!==0){
            setPreviousSteps((prevSteps) => [...prevSteps, currentStep])
            setCurrentStep(nextStep)
            chatBotText();
        }else {
            await chatBotRequest(requestString+text)
            setSent(true)
            console.log(previousSteps)
            setPreviousSteps((prevSteps) => [...prevSteps, currentStep])
        }
        
    }

    const chatBotText = () => {
        if(currentStep === 0) {return}
        if(currentStep=== 100){
            // meaning user wants to input a question
            // 
            return (
            <div>
                {!sent && (<div>
                <input type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
                <button onClick={()=>{chatBotRequest(userInput);setPrevChoices((prevChoices) => [...prevChoices, userInput]) ;setSent(true)}}>Ask Farai</button></div>)}
                {sent && response && (<div>
                    <p> {userInput}</p>
                </div>)}
                {/* above doesnt currently display */}
                </div>)
        }
        const currentLevel= conversationFlow.find((step) => step.id === currentStep)
        const choices =[]
        currentLevel.options.map((option, index)=>{
            if((index=== currentLevel.options.length -1) && (index % 2===0)){
                choices.push(<div class="col-span-2 flex items-center justify-center m-1" key={index}><button class="w-11/12 h-full mt-3 m-2 border-2 border-blue-900 bg-red-200 p-1 text-center rounded-md"onClick={()=>{handleOptionClick(option.displayText,option.sendText,option.next)}}>{option.displayText}</button></div>) 
            }else{
            choices.push(<div class=" flex items-center justify-center m-1" key={index}><button class="w-10/12 h-full m-2 mt-2 border-2 border-blue-900 bg-red-200 p-1 text-center rounded-md"onClick={()=>{handleOptionClick(option.displayText,option.sendText,option.next)}}>{option.displayText}</button></div>)
            }
        })
        return (<div class="place-items-start">
            <p class="text-sm ml-2 mb-0">Farai</p>
            {currentLevel.message && (<div><p class="border-2 border-blue-900 bg-blue-200 w-3/4 p-2 text-center rounded-md m-1">{currentLevel.message}</ p></div>)}
            <div class="grid grid-cols-2 w-3/4 m-1">{choices}</div>
        </div>)
    }

    const prevChatBotText = () => {
        return previousSteps.map((stepId, index)=>{
            const prevText = conversationFlow.find((step) => step.id === stepId)
            const choices =[]
            prevText.options.map((option, index)=>{
                if((index=== prevText.options.length -1) && (index % 2===0)){
                    choices.push(<div class="col-span-2 flex items-center justify-center m-1" key={index}><button class="w-11/12 h-full mt-3 m-2 border-2 border-blue-900 bg-red-100 p-1 text-center rounded-md" disabled>{option.displayText}</button></div>)
                }else{
                choices.push(<div class=" flex items-center justify-center m-1" key={index}><button class="ml-1 h-full w-10/12 border-2 border-blue-900 bg-red-100 p-1 text-center rounded-md" disabled>{option.displayText}</button></div>)
                }
            })
            return (<div>
                <p class="text-sm ml-1 mb-0">Farai</p>
            {prevText.message && (<div><p class="ml-1 border-2 border-blue-900 bg-blue-100 w-3/4 p-2 text-center rounded-md ">{prevText.message}</p></div>)}
            <div class="grid grid-cols-2 w-3/4 m-1">{choices}</div>
            <div class="flex justify-end">
                <p class="text-sm mr-1 mb-0">You</p></div>
            <div class="flex justify-end">
                <p class="mr-1 w-2/5 border-2 border-blue-900 bg-green-100 p-1 text-center rounded-md">{prevChoices[index]}</p>
            </div>
        </div>)
        })
    }

    useEffect(()=>{
        prevChatBotText();
    }, [previousSteps])

    return (
        <div class="border-2 border-slate-700 bg-slate-200 h-full rounded-lg p-1 shadow-xl shadow-inner">
        <h2 class="mt-2 text-2xl">ChatBot</h2>
        {!usingChatBot && (
            <div>
        <div class=" flex items-center justify-center">
            <button class="bg-slate-400 ring-stone-400 ring-offset-1 ring-offset-stone-600 ring-4 p-20"  onClick={()=>setUsingChatBot(true)}>Click to speak to Farai!</button></div>
            <div class=" flex items-center justify-center mt-20 "><img src="src/assets/bird-removebg-preview.png" class="w-1/2 motion-safe:animate-bounce" alt="Image of Farai the bird"/>
        </div>
        </div>)}
        {usingChatBot && (
            <div class="flex items-center justify-center h-full">
            <div class="w-11/12 h-5/6 overflow-scroll">
           {previousSteps && (
                <p>{prevChatBotText()}</p>
            )}
            <div> 
                {!response && !sent &&
                <p>{chatBotText()}</p>
            }
            </div>

            {sent &&(
                <div>
                    {response && (<p class="text-sm ml-1 mb-0">Farai</p>)}
                    <p class="ml-1 border-2 border-blue-900 bg-blue-100 w-11/12 p-2 text-center rounded-md" >{response}</p> 
                </div>
        )}</div>
        </div>
        )}
        
        </div>
    )
}
export default ChatBot;