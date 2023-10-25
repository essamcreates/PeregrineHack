import { useEffect, useState } from "react";

const ChatBot = ({ currentUser }) => {
  const [usingChatBot, setUsingChatBot] = useState(false);
  const [requestString, setRequestString] = useState(""); // message that will be sent to openapi
  const [currentStep, setCurrentStep] = useState(1);
  const [response, setResponse] = useState("");
  const [previousSteps, setPreviousSteps] = useState([]);
  const [userInput, setUserInput] = useState();
  const [sent, setSent] = useState(false);
  const [prevChoices, setPrevChoices] = useState([]);

  // will have a conversation (with directed points) , these directed points/ options will be sent to api
  // chat bot will display the question & options and the user will click the button (choosing thier desired option) then the next question will come up
  // need to display users question.

  const chatBotRequest = async (input) => {
    try {
      const url = `http://localhost:8080/openAI`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: input + "(response in less than 70 words)"
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();

      // Set the response data in the component's state
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // next : 0 , 0 indicates send
  const conversationFlow = [
    {
      id: 1,
      message: "Would you like to chat about...",
      options: [
        {
          displayText: "Wellness",
          sendText: "Question : Regarding my wellness at work ",
          next: 2
        },
        {
          displayText: "Career",
          sendText: "Question : In terms of my career ",
          next: 6
        },
        {
          displayText: "Or Ask Farai a Question?",
          sendText: "Question",
          next: 100
        } // 100 means user wants to input
      ]
    },
    {
      id: 2,
      message: null,
      options: [
        {
          displayText: "Looking for advice",
          sendText: "I am looking for advice on ",
          next: 4
        },
        {
          displayText: "Want to de-stress",
          sendText: "how should I de-stress in ",
          next: 5
        }
      ]
    },
    {
      id: 4,
      message: "Please choose a topic",
      options: [
        {
          displayText: "Imposter Syndrome",
          sendText: "Having imposter syndrome ",
          next: 0
        }, // possible switch 0 to word send
        {
          displayText: "Personal Life",
          sendText: "Dealing with personal problems ",
          next: 0
        },
        {
          displayText: "Over Stressed",
          sendText: "Being over stressed ",
          next: 0
        },
        {
          displayText: "Can't Focus",
          sendText: "Can't focus at work ",
          next: 0
        }
      ]
    },
    {
      id: 5,
      message: "When are you planning on trying to de-stress?",
      options: [
        {
          displayText: "Short Break",
          sendText: "(Short break) est 15 minutes ",
          next: 0
        },
        {
          displayText: "Take Lunch ",
          sendText: "(Lunch) est 60 mins or so ",
          next: 0
        },
        { displayText: "After Work ", sendText: "Evening ", next: 0 },
        {
          displayText: "At the Weekend",
          sendText: "The weekend / days off ",
          next: 0
        }
      ]
    },
    {
      id: 6,
      message: "Please choose a skill you would like to improve",
      options: [
        {
          displayText: "Leadership",
          sendText: "how should I improve leadership skills",
          next: 0
        },
        {
          displayText: "Teamwork",
          sendText: "how should I improve teamwork skills",
          next: 0
        },
        {
          displayText: "Time Management",
          sendText: "how should I improve time management skills",
          next: 0
        },
        {
          displayText: "Presentation",
          sendText: "how should I improve presentation skills",
          next: 0
        }
      ]
    }
  ];

  const handleOptionClick = async (choice, text, nextStep) => {
    setPrevChoices((prevChoices) => [...prevChoices, choice]);
    setRequestString(requestString + text);

    if (nextStep !== 0) {
      setPreviousSteps((prevSteps) => [...prevSteps, currentStep]);
      setCurrentStep(nextStep);
      chatBotText();
    } else {
      await chatBotRequest(requestString + text);
      setSent(true);
      console.log(previousSteps);
      setPreviousSteps((prevSteps) => [...prevSteps, currentStep]);
    }
  };

  const chatBotText = () => {
    if (currentStep === 0) {
      return;
    }
    if (currentStep === 100) {
      // meaning user wants to input a question
      return (
        <div>
          {!sent && (
            <>
              <div class="h-full flex justify-end">
                <textarea
                  class="border-2 outline-non border-black bg-inherit w-3/4 h-20 mt-3 p-1 rounded-lg"
                  placeholder="Ask Farai about career goals, skills, wellness..."
                  type="text"
                  maxlength="150"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
              <div class="h-full flex justify-end">
                <button
                  class="w-1/4 h-full mt-1 shadow-lg bg-teal-500 text-white p-1 text-center rounded-md transition-transform transform text-sm hover:bg-slate-500 hover:text-white"
                  onClick={() => {
                    chatBotRequest(userInput);
                    setPrevChoices((prevChoices) => [...prevChoices, userInput]);
                    setSent(true);
                  }}
                >
                  Ask Farai
                </button>
              </div>
            </>
          )}
        </div>
      );
    }
    const currentLevel = conversationFlow.find((step) => step.id === currentStep);
    const choices = [];
    currentLevel.options.map((option, index) => {
      if (index === currentLevel.options.length - 1 && index % 2 === 0) {
        choices.push(
          <div class="col-span-2 flex items-center justify-center m-1" key={index}>
            <button
              class="w-11/12 h-full mt-3 m-2 border-2 bg-white border-teal-500 p1 text-center rounded-md transition-transform transform hover:bg-teal-300"
              onClick={() => {
                handleOptionClick(option.displayText, option.sendText, option.next);
              }}
            >
              {option.displayText}
            </button>
          </div>
        );
      } else {
        choices.push(
          <div class=" flex items-center justify-center m-1" key={index}>
            <button
              class="w-10/12 h-full m-2 mt-2 border-2 border-teal-500 bg-white p-1 text-center rounded-md transition-transform transform hover:bg-teal-200"
              onClick={() => {
                handleOptionClick(option.displayText, option.sendText, option.next);
              }}
            >
              {option.displayText}
            </button>
          </div>
        );
      }
    });
    return (
      <div class="place-items-start">
        <p class="text-sm ml-2 mb-0">Farai</p>
        {currentLevel.message && (
          <div>
            <p class="rounded-lg bg-teal-400 text-white py-4 px-5 mt-4 mb-6 w-5/6">
              {currentLevel.message}
            </p>
          </div>
        )}
        <div class="grid grid-cols-2 w-3/4 m-1">{choices}</div>
      </div>
    );
  };

  const prevChatBotText = () => {
    const prev = previousSteps.map((stepId, index) => {
      const prevText = conversationFlow.find((step) => step.id === stepId);
      const choices = [];
      prevText.options.map((option, index) => {
        if (index === prevText.options.length - 1 && index % 2 === 0) {
          choices.push(
            <div class="col-span-2 flex items-center justify-center m-1" key={index}>
              <button class="bg-slate-200 text-black py-2 px-5 rounded mb-2 shadow-lg" disabled>
                {option.displayText}
              </button>
            </div>
          );
        } else {
          choices.push(
            <div class=" flex items-center justify-center m-1" key={index}>
              <button class="bg-slate-200 text-black py-2 px-5 rounded mb-2 shadow-lg" disabled>
                {option.displayText}
              </button>
            </div>
          );
        }
      });
      return (
        <div>
          <p class="text-sm ml-1 mb-0 font-semibold">Farai</p>
          {prevText.message && (
            <div>
              <p class="bg-slate-200 text-black py-2 px-5 rounded mb-2 shadow-lg w-5/6">
                {prevText.message}
              </p>
            </div>
          )}
          <div class="grid grid-cols-2 w-3/4 m-1">{choices}</div>
          <div class="flex justify-end">
            <p class="text-sm mr-1 mb-0 font-semibold">You</p>
          </div>
          <div class="flex justify-end">
            <p class="bg-teal-500 text-white py-2 px-5 rounded mb-2 shadow-lg">
              {prevChoices[index]}
            </p>
          </div>
        </div>
      );
    });
    if (currentStep === 100 && sent) {
      return (
        <>
          {prev}
          <div class="flex justify-end">
            <p class="mr-1 mt-2 w-4/5 border-2 bg-teal-100 p-1 text-center rounded-md">
              {userInput}
            </p>
          </div>
        </>
      );
    } else {
      return <>{prev}</>;
    }
  };

  useEffect(() => {
    prevChatBotText();
  }, [previousSteps]);

  const handleExit = () => {
    setUsingChatBot(false);
    setCurrentStep(1);
    setRequestString("");
    setResponse("");
    setPreviousSteps([]);
    setUserInput();
    setSent(false);
    setPrevChoices([]);
  };

  return (
    <div class="h-full rounded-lg p-1 shadow-xl bg-neutral-600 text-white">
      <h3 class="text-xl p-5">
        Hi {currentUser.name}, I’m Farai, your dedicated work coach. I’ve considered your unique
        needs to offer advice that’s tailored to you. What can I help you with?{" "}
      </h3>
      <div class="grid grid-cols-2">
        {usingChatBot && (
          <div class="flex justify-end m-2 mt-3">
            <button
              onClick={() => {
                handleExit();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {!usingChatBot && (
        <div>
          <div class=" flex items-center justify-center">
            <button
              class="rounded-lg bg-teal-400 text-white py-2 px-5 mt-4 mb-6 hover:bg-teal-500"
              onClick={() => setUsingChatBot(true)}
            >
              Click to speak to Farai!
            </button>
          </div>
        </div>
      )}
      {usingChatBot && (
        <div class=" flex items-center justify-center h-full">
          <div class="w-11/12 h-5/6 overflow-scroll">
            {previousSteps && <p>{prevChatBotText()}</p>}
            <div>{!response && !sent && <p>{chatBotText()}</p>}</div>

            {sent && (
              <div>
                {response && <p class="text-sm ml-1 mb-0">Farai</p>}
                {response ? (
                  <p class="ml-1 border-2 border-blue-900 bg-blue-100 w-11/12 p-2 text-center rounded-md">
                    {response}
                  </p>
                ) : (
                  <p class="ml-1 border-2 border-blue-900 bg-blue-100 w-2/12 p-2 text-center rounded-md">
                    <span class="animate-ping">...</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatBot;
