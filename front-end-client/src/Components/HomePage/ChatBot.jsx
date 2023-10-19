import { useState } from "react";

const ChatBot = () => {

    const [usingChatBot, setUsingChatBot] = useState(false);
    const [requestString, setRequestString] = useState("");
    const [currentStep, setCurrentStep] = useState();


    const conversationFlow = [
        {
            id: 1,
            message: "Would you like to chat about..",
            options: [
                { displayText: "Wellness", sendText: "Regarding wellness at work", next: 2 },
                { displayText: "Career", sendText: "In terms of my career", next: 6 },
            ],
        },
        {
            id: 2,
            message: null,
            options: [
                { displayText: "Looking for advice", sendText: "I am looking for advice on", next: 4 },
                { displayText: "Want to de-stress", sendText: "I am looking to take some time to de-stress", next: 5 },
            ],
        },
        {
            id: 4,
            message: "Please choose a topic",
            options: [
                { displayText: "Imposter Syndrome", sendText: "Having imposter syndrome", next: 0 }, // possible switch 0 to word send
                { displayText: "Personal Life", sendText: "Dealing with personal problems", next: 0 },
                { displayText: "Over Stressed", sendText: "Being over stressed", next: 0 },
                { displayText: "Can't Focus", sendText: "Can't focus at work", next: 0 },
            ],
        },
        {
            id: 5,
            message: "When are you planning on trying to de-stress?",
            options: [
                { displayText: "Short Break (e.g., 15 minutes)", sendText: "(Short break) est 15 minutes", next: 0 },
                { displayText: "Take Lunch (about 60 minutes)", sendText: "(Lunch) est 60 mins or so", next: 0 },
                { displayText: "After Work (Evening)", sendText: "Evening", next: 0 },
                { displayText: "At the Weekend/Days Off", sendText: "The weekend / days off", next: 0 },
            ],
        },
        {
            id: 6,
            message: "Please choose a skill you would like to improve",
            options: [
                { displayText: "Leadership", sendText: "Like to improve leadership skills", next: 0 },
                { displayText: "Teamwork", sendText: "Like to improve teamwork skills", next: 0 },
                { displayText: "Time Management", sendText: "Like to improve time management skills", next: 0 },
                { displayText: "Presentation", sendText: "Like to improve presentation skills", next: 0 },
            ],
        },
    ];

    return (
        <>
        <h2>ChatBot</h2>
        {!usingChatBot && (<div><button className="start-chat-button" onClick={()=>setUsingChatBot(true)}>Click to speak to Bob!</button></div>)}
        {usingChatBot && (<div><p>you have requested to speak to Bob</p></div>)}
        </>
    )
}
export default ChatBot;