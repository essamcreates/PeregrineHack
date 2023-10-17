import LoginForm from "./LoginForm";
import './LoginPage.css';

const LoginPage = ({authenticateUser, currentUser, setCurrentUser}) => {

    return (
        <div className="login-box">
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
        </div>
    )
}
export default LoginPage;