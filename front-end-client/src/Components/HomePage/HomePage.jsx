import { Link } from "react-router-dom";
import "./HomePage.css";
import DailyInteraction from "./DailyInteraction";
import DailyMessage from "./DailyMessage";
import WellnessBox from "./WellnessBox";
import ResourcesBox from "./ResourcesBox";
import ChatBot from "./ChatBot";
import { useEffect, useState } from "react";
import MoodEntry from "./MoodEntry";
import DigitalClock from "./DigitalClock";

const HomePage = ({ currentUser }) => {
  const [currentDate, setCurrentDate] = useState("");

  const formatDate = (date) => {
    const day = date.getDate(); // .getDate returns the day of the month
    // to get suffix of day
    let suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    const monthFormat = { month: "long" };
    const month = date.toLocaleDateString(undefined, monthFormat);
    const weekdayFormat = { weekday: "long" };
    const weekday = date.toLocaleDateString(undefined, weekdayFormat);
    return `${weekday}, ${day}${suffix} ${month}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div>
      <div>
        <section className="relative block h-[40vh] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-300 via-fuchsia-200 to-emerald-200">
          <div className="relative top-0 w-full h-full flex justify-between items-center">
            <div className="daily-message-box ml-12">
              <DailyMessage />
            </div>
            <div>
              <div className="flex flex-col items-centre mr-6">
                <div className="mr-6">
                  <DigitalClock />
                </div>
                {currentDate && (
                  <div className="date-time whitespace-nowrap opacity-50">
                    <p>{currentDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="welcome-home-page"></div>
      <div className="dashboard">
        <div className="daily-interaction-box">
          <DailyInteraction currentUser={currentUser} />
        </div>
        <div className="mood-entry-box">
          <MoodEntry currentUser={currentUser} />
        </div>
        <div className="chatbot-box">
          <ChatBot currentUser={currentUser} />
        </div>
        <div className="wellness-box">
          <WellnessBox currentUser={currentUser} />
        </div>
        <div className="resource-box">
          <ResourcesBox currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
