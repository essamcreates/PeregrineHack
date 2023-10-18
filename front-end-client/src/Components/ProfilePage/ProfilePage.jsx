import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const ProfilePage = ({currentUser}) => {

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
            <div>
                <p>Your Big Five:</p>

                {userScore && (<p>Openness: {userScore.openness}</p>)}
                {userScore && (<p>Conscientiousness: {userScore.conscientiousness}</p>)}
                {userScore && (<p>Extraversion: {userScore.extraversion}</p>)}
                {userScore && (<p>Agreeableness: {userScore.agreeableness}</p>)}
                {userScore && (<p>Neuroticism: {userScore.neuroticism}</p>)}

            </div>
            <div>
                {currentUser && (<p>Hello {currentUser.name}</p>)}
            </div>
            <div>
                <Link to="/ProfileCreationPage">Manage Account</Link>
            </div>
        </div>
    )
}
export default ProfilePage;