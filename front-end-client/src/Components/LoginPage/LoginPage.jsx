import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import './LoginPage.css';


const LoginPage = ({authenticateUser, currentUser, setCurrentUser}) => {

    const navigate = useNavigate();

    return (
        <div class="min-h-screen flex items-center justify-center bg-red-300">
            <div class="bg-white shadow-lg rounded-lg p-6">
                {!currentUser && ( 
                <>
                <h1>User Login</h1>
                <h2>Welcome to your personal development coach</h2>
                <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </>
                )}
                {currentUser && (
                <>
                <h1>Sign Out</h1>
                <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </>
                )}
                {!currentUser && (
                <button onClick={() => {navigate("/AccountRegistrationPage")}}>Don't have an account, sign up</button>
            )}
            </div>
        </div>
    )
}
export default LoginPage;