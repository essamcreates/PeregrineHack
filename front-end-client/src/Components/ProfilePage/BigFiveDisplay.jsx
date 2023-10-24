import { useEffect, useState } from "react";

const BigFiveDisplay = ({ currentUser }) => {
  const [userScore, setUserScore] = useState(null);
  const fetchUserScore = async () => {
    try {
      const response = await fetch('http://localhost:8080/personalityScores/user/' + currentUser.id);
      const data = await response.json();
      setUserScore(data);
    } catch (error) {
      console.error("Error fetching user score:", error);
    }
  }

  useEffect(() => {
    fetchUserScore();
  }, []);


  return (
    <>
      <h2 className="text-2xl font-semibold">Big Five Information</h2>
      <div className="mt-4">
        <p>Your Big Five:</p>
        {userScore ? (
            <div>
              <p>Openness: {userScore.openness}</p>
              <p>Conscientiousness: {userScore.conscientiousness}</p>
              <p>Extraversion: {userScore.extraversion}</p>
              <p>Agreeableness: {userScore.agreeableness}</p>
              <p>Neuroticism: {userScore.neuroticism}</p>
            </div>
        ) : (
            <p>Please complete your personality test.</p>
        )}
      </div>
    </>
  );
};
export default BigFiveDisplay;
