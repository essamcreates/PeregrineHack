import {Link} from "react-router-dom";
import BigFiveDisplay from "./BigFiveDisplay.jsx";

const ProfilePage = ({currentUser}) => {



    return (
        <div>
            <div>
                <BigFiveDisplay currentUser={currentUser}/>
            </div>
            <div>
                <img src={`http://localhost:8080${currentUser.profilePictureURL}`} alt="User Profile Picture" />
                {/*<img src={`http://localhost:8080/images/johnpfp.jpeg`} alt="User Profile Picture" />*/}
                {currentUser && (<p>Hello {currentUser.name}</p>)}
            </div>
            <div>
                <Link to="/ProfileCreationPage">Manage Account</Link>
            </div>
        </div>
    )
}
export default ProfilePage;