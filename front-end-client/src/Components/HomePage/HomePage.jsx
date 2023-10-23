import { Link } from "react-router-dom";
import "./HomePage.css";
import DailyInteraction from "./DailyInteraction";
import DailyMessage from "./DailyMessage"
import WellnessBox from "./WellnessBox"
import ResourcesBox from "./ResourcesBox"
import ChatBot from "./ChatBot"
import { useEffect, useState } from "react";
import MoodEntry from "./MoodEntry";

const HomePage = ({currentUser}) => {

    const [currentDate, setCurrentDate] = useState("");

    const formatDate= (date)=>{
        const day = date.getDate(); // .getDate returns the day of the month
        // to get suffix of day
        let suffix = (day === 1 || day===21 || day === 31) ? "st" : (day === 2 || day===22)? "nd" : (day === 3 || day===23)? "rd" : "th";
        const monthFormat = { month: 'long' };
        const month = date.toLocaleDateString(undefined, monthFormat);
        const weekdayFormat = { weekday: 'long' };
        const weekday = date.toLocaleDateString(undefined, weekdayFormat);
        return `${weekday}, ${day}${suffix} ${month}`;
      }
      
    useEffect (()=>{
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        setCurrentDate(formattedDate)
    },[])

    return (
        <div class="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
        <div className="welcome-home-page">
            {currentUser && (<div className="welcome-name"> <h2>Hi, {currentUser.name}!</h2></div>)}
            {currentDate && (<div className="date-time"> <h3>{currentDate} </h3></div>)}

        </div>
        <div className="dashboard">
        <div className="daily-message-box"><DailyMessage/></div>
        <div className="daily-interaction-box"><DailyInteraction currentUser={currentUser}/></div>
        <div className="mood-entry-box"><MoodEntry currentUser={currentUser}/></div>
        <div className="chatbot-box"><ChatBot/></div>
        <div className="wellness-box"><WellnessBox/></div>
        <div className="resource-box"><ResourcesBox/></div>
        </div>
        </div>
    )
}
export default HomePage;