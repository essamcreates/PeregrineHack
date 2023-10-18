import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import './LoginPage.css';


const LoginPage = ({authenticateUser, currentUser, setCurrentUser}) => {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-red-300">
        {!currentUser && 
        (<><h1>User Login</h1>
        <h2> Welcome to your personal development coach</h2>
        <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </>)}
        {/* sign out */}
        {currentUser && (<>
        <h1>SignOut</h1>
        <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </>)}
        {/* will move the below button out of login box down the line when doing css */}
        {!currentUser && (<button onClick={()=>{navigate("/AccountRegistrationPage")}}>Don't have an account, sign up</button>)}
        </div>
    )
}
export default LoginPage;