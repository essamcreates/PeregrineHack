import {Link} from "react-router-dom";
import ProfileBox from "./ProfileBox";
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
                    <div class="bg-white shadow-lg rounded-lg p-20" >
                        <h1 class="text-4xl text-blue-400" >{currentUser.name}! We'd Love To Know More About you</h1>
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