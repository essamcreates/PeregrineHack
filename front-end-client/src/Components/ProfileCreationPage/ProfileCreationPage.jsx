import { useState } from "react";
import ProfileBox from "./ProfileBox";
import './ProfileCreationPage.css'

const ProfileCreationPage = ({ currentUser}) => {

    return (
        <div>
            {/* <h1>Welcome {currentUser.name}!</h1> */}
            <h2>I am Bob, your personal development coach. Please give me some information about yourself so I can get to know you!</h2>
            {/* Profile creation bar */}
            <ProfileBox currentUser={currentUser} />
        </div>
    )
}
export default ProfileCreationPage;