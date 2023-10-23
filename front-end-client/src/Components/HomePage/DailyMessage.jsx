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
        <div class="border-2 border-slate-700 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-orange-400 via-yellow-400 to-yellow-100 h-full rounded-lg shadow-xl">
        <h2 class="text-2xl pt-3">Pick Me Up </h2>
        <div class="text-center">{message && (<p class="text-3xl pl-4">{message.message}</p>)}</div>
        </div>
    )
}
export default DailyMessage;