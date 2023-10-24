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
          <strong>Openness:</strong> {userScore.openness}
        </p>
        <p>
          <strong>Conscientiousness:</strong> {userScore.conscientiousness}
        </p>
        <p>
          <strong>Extraversion:</strong> {userScore.extraversion}
        </p>
        <p>
          <strong>Agreeableness:</strong> {userScore.agreeableness}
        </p>
        <p>
          <strong>Neuroticism:</strong> {userScore.neuroticism}
        </p>
      </div>
    </>
  );
};
export default BigFiveDisplay;
