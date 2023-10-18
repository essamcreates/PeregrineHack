// import {Link} from "react-router-dom";

const ProfilePage = ({currentUser}) => {

    return (
        <div>
            <div>
                <p>Your Big Five:</p>
            </div>
            <div>
                {currentUser && (<p>Hello {currentUser.name}</p>)}
            </div>
            <div>
                {/*<Link to="/ManageAccount">Manage Account</Link>*/}
            </div>
        </div>
    )
}
export default ProfilePage;