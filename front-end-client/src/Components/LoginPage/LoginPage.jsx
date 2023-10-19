import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import './LoginPage.css';


const LoginPage = ({authenticateUser, currentUser, setCurrentUser}) => {

    const navigate = useNavigate();

    return (
        <div class="min-h-screen flex items-center justify-center bg-stone-100">
  <div class="bg-white shadow-lg rounded-lg h-80 p-10">
    {!currentUser && (
      <>
        {/* <h1>User Login</h1> */}
        <h1 class="text-2x1 mb-10">Welcome to your personal development coach</h1>
        <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </>
    )}
    {currentUser && (
      <>
        <h1>Sign Out</h1>
        <LoginForm authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </>
    )}

    <div class="w-full flex justify-end">
    {!currentUser && (
      <button onClick={() => {navigate("/AccountRegistrationPage")}}>New user? Create an account</button>
    )}
    </div>
  </div>
</div>

    )
}
export default LoginPage;