import {Link} from "react-router-dom";
import { useState } from "react";
import ProfileBox from "./ProfileBox";
import './ProfileCreationPage.css'

const ProfileCreationPage = ({ currentUser}) => {

    return (
        <div>
            <div>
                {/* <h1>Welcome {currentUser.name}!</h1> */}
                <h2>I am Bob, your personal development coach. Please give me some information about yourself so I can get to know you!</h2>
                {/* Profile creation bar */}
                <ProfileBox currentUser={currentUser} />
            </div>
            <div>
                <Link to="/QuizPage">Click to take personality quiz</Link>
            </div>

        </div>
    )
}
export default ProfileCreationPage;