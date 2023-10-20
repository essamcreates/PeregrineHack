import {useEffect, useState} from "react";

const BigFiveDisplay = ({currentUser}) => {

    const [userScore, setUserScore] = useState([]);
    const fetchUserScore = async () =>{
        const response = await fetch('http://localhost:8080/personalityScores/user/'+ currentUser.id);
        const data = await response.json();
        setUserScore(data);
    }

    useEffect(()=>{
        fetchUserScore();

    },[]);

    return (
        <div>
            <p>Your Big Five:</p>

            {currentUser && userScore && (<p>Openness: {userScore.openness}</p>)}
            {currentUser && userScore && (<p>Conscientiousness: {userScore.conscientiousness}</p>)}
            {currentUser && userScore && (<p>Extraversion: {userScore.extraversion}</p>)}
            {currentUser && userScore && (<p>Agreeableness: {userScore.agreeableness}</p>)}
            {currentUser && userScore && (<p>Neuroticism: {userScore.neuroticism}</p>)}

        </div>
    )
}
export default BigFiveDisplay;