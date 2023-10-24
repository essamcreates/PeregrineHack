import { useEffect, useState } from "react";

const BigFiveDisplay = ({ currentUser }) => {
  const [userScore, setUserScore] = useState([]);
  const fetchUserScore = async () => {
    const response = await fetch("http://localhost:8080/personalityScores/user/" + currentUser.id);
    const data = await response.json();
    setUserScore(data);
  };

  useEffect(() => {
    fetchUserScore();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold">Big Five Information</h2>
      <div className="mt-4">
        <p>
          <strong>Openness:</strong> {Math.round(userScore.openness)}
        </p>
        <p>
          <strong>Conscientiousness:</strong> {Math.round(userScore.conscientiousness)}
        </p>
        <p>
          <strong>Extraversion:</strong> {Math.round(userScore.extraversion)}
        </p>
        <p>
          <strong>Agreeableness:</strong> {Math.round(userScore.agreeableness)}
        </p>
        <p>
          <strong>Neuroticism:</strong> {Math.round(userScore.neuroticism)}
        </p>
      </div>
    </>
  );
};
export default BigFiveDisplay;
