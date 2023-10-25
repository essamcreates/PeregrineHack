import React, { useEffect, useState } from "react";
import DailyInteraction from "./Dailyinteraction";
import DailyMessage from "./DailyMessage";
import WellnessBox from "./WellnessBox";
import ResourcesBox from "./ResourcesBox";
import ChatBot from "./ChatBot";
import MoodEntry from "./MoodEntry";
import DigitalClock from "./DigitalClock";
import NoteTaking from "./NoteTaking";
import "./NoteTaking.css"; // Import the CSS file for NoteTaking component

const HomePage = ({ currentUser }) => {
  const [currentDate, setCurrentDate] = useState("");

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

  return (
    <div className="flex bg-neutral-800">
      <div className="flex-grow">
        <section className="header fixed top-0 w-full z-25 block h-32 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
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
                    <p className="text-lg">{currentDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="mt-32 z-1 pt-5 bg-neutral-800">
          <section className="home-page grid grid-cols-12 gap-3 mx-3">
            <div className="col-span-2 rounded-md text-white bg-neutral-600 p-4 text-xl">
              <NoteTaking />
            </div>
            <section className="dashboard col-span-7 flex flex-col gap-3">
              <div className="daily-interaction-box text-white">
                <DailyInteraction currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-64 bg-purple-300">
                <img
                  src="images/HomePageImages/imagesix.jpg"
                  alt="Aura image"
                  className="bg-cover max-h-64 w-full h-full object-cover"
                />
              </div>
              <div className="mood-entry-box">
                <MoodEntry currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                <img
                  src="images/HomePageImages/imagesix.jpg"
                  alt="Aura image"
                  className="bg-cover max-h-64 w-full h-full object-cover"
                />
              </div>
              <div className="wellness-box">
                <WellnessBox currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                <img
                  src="images/HomePageImages/imagesix.jpg"
                  alt="Aura image"
                  className="bg-cover max-h-64 w-full h-full object-cover"
                />
              </div>
              <div className="resource-box">
                <ResourcesBox currentUser={currentUser} />
              </div>
              <div className="text-center flex justify-center items-center h-32 bg-purple-300">
                <img
                  src="images/HomePageImages/imagesix.jpg"
                  alt="Aura image"
                  className="bg-cover max-h-64 w-full h-full object-cover"
                />
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
