import {Link} from "react-router-dom";
import BigFiveDisplay from "./BigFiveDisplay.jsx";

const ProfilePage = ({currentUser}) => {

    return (
        <div>
            <div>
                <BigFiveDisplay currentUser={currentUser}/>
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