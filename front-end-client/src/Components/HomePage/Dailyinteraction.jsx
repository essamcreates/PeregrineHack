import { useEffect, useState } from "react";

const DailyInteraction = ({ currentUser }) => {
  const [question, setQuestion] = useState(() => {
    const storedDailyQuestion = localStorage.getItem("question");
    return storedDailyQuestion && currentUser ? JSON.parse(storedDailyQuestion) : null;
  });

  const updateQuestion = (newUser) => {
    setQuestion(newUser);
    localStorage.setItem("question", JSON.stringify(newUser));
  };

  const [questionAnswered, setQuestionAnswered] = useState(
    JSON.parse(localStorage.getItem("questionAnswered")) || false
  );

  useEffect(() => {
    localStorage.setItem("questionAnswered", JSON.stringify(questionAnswered));
  }, [questionAnswered]);

  const [userAnswer, setUserAnswer] = useState(
    JSON.parse(localStorage.getItem("userAnswer")) || ""
  );

  useEffect(() => {
    localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
  }, [userAnswer]);

  useEffect(() => {
    if (!currentUser) {
      setQuestion(null);
    } else {
      fetchQuestion(Math.floor(Math.random() * 2 + 1));
    }
  }, [currentUser]);

  const fetchQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/dailyQuestions/` + id, {
        method: "GET"
      });
      if (response.status === 302) {
        const data = await response.json();
        updateQuestion(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    if (!question) {
      // returns a random number between 1 and 2 (to be increase once data loader is done)
      fetchQuestion(Math.floor(Math.random() * 2 + 1));
    }
  }, []);

  const postQuestionAnswer = async (info) => {
    const url = `http://localhost:8080/answeredQuestions`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    });
  };

  const handleQuestionSubmit = (answer) => {
    setQuestionAnswered(true);
    setUserAnswer(answer);
    let template = {
      chosenOption: answer,
      dailyQuestionId: question.id,
      userId: currentUser.id
    };
    postQuestionAnswer(template);
  };

  const displayOptions = () => {
    const options = ["optionOne", "optionTwo", "optionThree", "optionFour", "optionFive"];
    const choices = [];
  
    options.map((option, index) => {
      const choice = question[option];
  
      if (choice) {
        const button = (
          <button
            class="text-lg text-white bg-teal-500 m-2 p-1 w-full shadow-lg rounded-md transition-colors duration-500 inline
                  hover:bg-yellow-200 hover:shadow-md hover:scale-110"
            value={option}
            onClick={(e) => {
              handleQuestionSubmit(e.target.value);
            }}
          >
            {choice}
          </button>
        );
  
        choices.push(
          <div key={index} class="flex items-center justify-center">
            {button}
          </div>
        );
      }
    });
  
    return (
      <div class="flex flex-wrap">
        {choices}
      </div>
    );
  };

  return (
    <div class="h-full rounded-md p-1 shadow-xl text-black">
      {/* <div> */}
      {/* <h3 class="text-xl ml-2">Question</h3> */}
      {/* </div> */}
      {question && !questionAnswered && (
        <div>
          <div class="text-left text-2xl mt-5 ml-3">{question.question}</div>
          <div class="grid grid-cols-2 mt-4">{displayOptions()}</div>
        </div>
      )}
      {questionAnswered && (
        <div>
          <p class="text-2xl text-center mt-6">{question.question}</p>
          <p class="text-xl text-center m-5">{question[userAnswer]}</p>
        </div>
      )}
    </div>
  );
};
export default DailyInteraction;
