import { useEffect, useState } from "react";

const ChatBot = () => {

    const [usingChatBot, setUsingChatBot] = useState(false);
    const [requestString, setRequestString] = useState("");  // message that will be sent to openapi
    const [currentStep, setCurrentStep] = useState(1);
    const [response, setResponse] = useState("");
    const [previousSteps, setPreviousSteps] = useState([]);

    // will have a conversation (with directed points) , these directed points/ options will be sent to api
    // chat bot will display the question & options and the user will click the button (choosing thier desired option) then the next question will come up

    const chatBotRequest=async(input)=>{
        try {
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: input + "reponse in less than 70 words",
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
                { displayText: "Short Break (e.g., 15 minutes)", sendText: "(Short break) est 15 minutes ", next: 0 },
                { displayText: "Take Lunch ", sendText: "(Lunch) est 60 mins or so ", next: 0 },
                { displayText: "After Work ", sendText: "Evening ", next: 0 },
                { displayText: "At the Weekend/Days Off", sendText: "The weekend / days off ", next: 0 },
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

    const handleOptionClick = async(text , nextStep) => {
        setPreviousSteps((prevSteps) => [...prevSteps, currentStep])
        setRequestString(requestString+text)
        if(nextStep!==0){
            setCurrentStep(nextStep)
            chatBotText();
        }else {
            await chatBotRequest(requestString+text)
            console.log(previousSteps)
        }
        
    }

    const chatBotText = () => {
        if(currentStep === 0) {return}
        // console.log(conversationFlow[currentStep])
        const currentLevel= conversationFlow.find((step) => step.id === currentStep)
        // load choices into array
        const choices =[]
        currentLevel.options.map((option, index)=>{
            choices.push(<div key={index}><button onClick={()=>{handleOptionClick(option.sendText,option.next)}}>{option.displayText}</button></div>)
        })
        return (<div  className="chat-bot-message">
            <div className="message"><p>{currentLevel.message}</p></div>
            <div>{choices}</div>
        </div>)
    }

    const prevChatBotText = () => {
        return previousSteps.map((stepId)=>{
            const prevText = conversationFlow.find((step) => step.id === stepId)
            const choices =[]
            prevText.options.map((option, index)=>{
                choices.push(<div key={index}><button disabled>{option.displayText}</button></div>)
            })
            return (<div  className="chat-bot-message">
            <div className="message"><p>{prevText.message}</p></div>
            <div>{choices}</div>
        </div>)

        })
    }

    useEffect(()=>{
        prevChatBotText();
    }, [previousSteps])

    return (
        <>
        <h2>ChatBot</h2>
        {!usingChatBot && (<div><button className="start-chat-button" onClick={()=>setUsingChatBot(true)}>Click to speak to Bob!</button></div>)}
        {usingChatBot && (<div className="convo-box">
           {previousSteps && (<p>{prevChatBotText()}</p>)}
            <div> {!response &&<p>
        {chatBotText()}</p>}</div>
        <div>{response && (<h2>Bob:</h2>)}
        <p>{response}</p> </div></div>)}
        
        </>
    )
}
export default ChatBot;