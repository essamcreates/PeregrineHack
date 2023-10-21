import {Link} from "react-router-dom";
import ProfileBox from "./ProfileBox";
import './ProfileCreationPage.css'
import ProfileCreationBar from "./ProfileCreationBar";

const ProfileCreationPage = ({ currentUser}) => {

    return (
        <div class="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900 via-teal-300 to-fuchsia-200 flex items-center justify-center">
            <div class="grid grid-rows-1fr 2fr 1fr" >
                <div>
                    <label>Progress Bar</label>
                    <ProfileCreationBar currentUser={currentUser} />
                </div>
                <div>
                    <div class="bg-white shadow-lg rounded-lg box-content h-400 p-8 sm:w-7/8 sm:p-20  md:w-1/3  lg:w-1/3" >
                        <h1 class="text-2xl text-blue-400" >{currentUser.name}! We'd Love To Know More About you</h1>
                        <ProfileBox currentUser={currentUser} />
                    </div>
                </div>
                <div class="" >
                <Link to="/QuizPage">Click to take personality quiz</Link>
                </div>
            </div>
            
            
        </div>
    )
}
export default ProfileCreationPage;