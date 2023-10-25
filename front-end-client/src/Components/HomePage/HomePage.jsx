import React, { useEffect, useState } from "react";
import DailyInteraction from "./DailyInteraction";
import DailyMessage from "./DailyMessage";
import WellnessBox from "./WellnessBox";
import ResourcesBox from "./ResourcesBox";
import ChatBot from "./ChatBot";
import MoodEntry from "./MoodEntry";
import DigitalClock from "./DigitalClock";
import NoteTaking from "./NoteTaking";
import NoteTaking2 from "./NoteTaking2";
import "./NoteTaking.css"; // Import the CSS file for NoteTaking component

const HomePage = ({ currentUser }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formatDate = (date) => {
    const day = date.getDate();
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div className="w-1/4 h-screen bg-white overflow-y-auto border-l">
          {/* <NoteTaking /> */}
          <NoteTaking2 />
        </div>
      )}
      <div className="flex-grow">
        <button
          onClick={toggleSidebar}
          className="fixed top-0 left-0 m-4 z-20 bg-slate-700 text-white px-2 py-1 rounded"
        >
          {isSidebarOpen ? "Close Notes" : "Open Notes"}
        </button>
        <section className="header fixed top-0 w-full z-25 block h-1/6 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-400 via-red-200 to-pink-400">
          <div className="relative top-0 w-full h-full flex justify-between items-center">
            <div className="daily-message-box ml-12">
              <DailyMessage />
            </div>
            <div>
              <div className="flex flex-col items-center mr-6">
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
        <div className="mt-[194px]">
          <section className="home-page grid grid-cols-12">
            <div className="col-span-2">NOTES</div>
            <section className="dashboard col-span-7">
              <div className="daily-interaction-box">
                <DailyInteraction currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-64 bg-purple-300">
                <img
                  src="https://images.unsplash.com/photo-1651424810057-af80e351456d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Scenic Landscape"
                  className="bg-cover max-h-64"
                />
                IMAGE
              </div>
              <div className="mood-entry-box">
                <MoodEntry currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                IMAGE
              </div>
              <div className="wellness-box">
                <WellnessBox currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                IMAGE
              </div>
              <div className="resource-box">
                <ResourcesBox currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                IMAGE
              </div>
            </section>
            <div className="chatbot-box col-span-3 right-0">
              <ChatBot currentUser={currentUser} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
