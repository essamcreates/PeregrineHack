import {Link} from "react-router-dom";

const ProfilePage = ({currentUser}) => {

    const [userScore, setUserScore] = useState();
    const fetchUserScore = async () =>{
        const response = await fetch('https://localhost:8080/personalityScores/'+currentUser.id);
        const data = await response.json();
        setUserScore(data);
    }

    return (
        <div>
            <div>
                <p>Your Big Five:</p>

                userScore && (<p>Openness: {userScore.openness}</p>)
                userScore && (<p>Conscientiousness: {userScore.conscientiousness}</p>)
                userScore && (<p>Extraversion: {userScore.extraversion}</p>)
                userScore && (<p>Agreeableness: {userScore.agreeableness}</p>)
                userScore && (<p>Neuroticism: {userScore.neuroticism}</p>)

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