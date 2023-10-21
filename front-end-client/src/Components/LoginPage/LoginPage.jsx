import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import "./LoginPage.css";

const LoginPage = ({ authenticateUser, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
      <h1 className="flex justify-center font-bold text-6xl pt-10">
        Rise and shine, it's time to grind!
      </h1>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg h-90 p-10">
          {!currentUser && (
            <>
              {/* <h1>User Login</h1> */}
              <h2 className="text-2x1 mb-10 white text-center text-lg font-medium">Welcome back</h2>
              <LoginForm
                authenticateUser={authenticateUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </>
          )}
          {currentUser && (
            <>
              <h3>Sign Out</h3>
              <LoginForm
                authenticateUser={authenticateUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </>
          )}

          <div className="w-full flex justify-center">
            {!currentUser && (
              <button
                className="mb--3"
                onClick={() => {
                  navigate("/AccountRegistrationPage");
                }}
              >
                Don't have an account? Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
