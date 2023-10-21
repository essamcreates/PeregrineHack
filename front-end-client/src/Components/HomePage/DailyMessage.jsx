import { useState, useEffect } from "react";

const DailyMessage = () => {

    const [message, setMessage] = useState();


    const fetchMessage = async() => {
        const response = await fetch("http://localhost:8080/motivationMessage/random");
        const data = await response.json();
        setMessage(data);
        console.log(data)
    }

    useEffect (()=>{
        fetchMessage();
    },[])

    // need to keep a track so keeps the same daily messsage on each day 

    return (
        <div>
        <h2>Pick Me Up </h2>
        {message && (<p className="message">{message.message}</p>)}
        </div>
    )
}
export default DailyMessage;