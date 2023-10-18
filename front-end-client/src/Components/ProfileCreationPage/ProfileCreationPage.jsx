import { useState } from "react";
import ProfileBox from "./ProfileBox";

const ProfileCreationPage = ({addUserInfo, currentUser}) => {

    return (
        <div>
            <h1>Welcome [currentUser.name]!</h1>
            <h2>I am Bob, your personal development coach. Please give me some information about yourself so I can get to know you!</h2>
            {/* Profile creation bar */}
            <ProfileBox addUserInfo={addUserInfo}/>
        </div>
    )
}
export default ProfileCreationPage;