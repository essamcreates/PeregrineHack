import { useState } from "react";
import ProfileBox from "./ProfileBox";

const ProfileCreationPage = () => {

    return (
        <div>
            <h1>Welcome [user]!</h1>
            <h2>I am Bob, your personal development coach. Please give me some information about yourself so I can get to know you!</h2>
            {/* Profile creation bar */}
            <ProfileBox />
        </div>
    )
}
export default ProfileCreationPage;