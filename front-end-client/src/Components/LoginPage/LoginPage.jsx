import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import "./LoginPage.css";

const LoginPage = ({ authenticateUser, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
      <div class="grid grid-cols-2 content-center">
        {/* column one */}
        <div>
          <h1 class="flex font-bold text-6xl pt-10 opacity-40 line-through text-left">Log In</h1>
          <h1 class="flex font-bold text-6xl pt-5 opacity-50 text-left">Clock In.</h1>

          <div class="min-h-screen flex items-center justify-center">
            <div class="bg-white shadow-lg rounded-lg box-content w-96 h-96x p-20 ml-10 mb-20">
              {!currentUser && (
                <>
                  {/* <h1>User Login</h1> */}
                  <h2 class="text-2x1 mb-10 white text-center text-2xl font-medium pb-10">
                    Welcome back
                  </h2>
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
              <div class="w-full flex justify-center">
                {!currentUser && (
                  <button
                    class="mb--3"
                    onClick={() => {
                      navigate("/AccountRegistrationPage");
                    }}
                  >
                    Don't have an account? <span class="underline">Sign Up</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* column two */}
        <div class="flex justify-center items-center pr-20">
          {/* <div class="absolute top-10 bottom-5 right-7"> */}
          <h1 class="flex-items-center text-6xl font-medium text-neutral-400">Dive Into</h1>
          <span class="relative ml-3 h-[1em] w-36  text-6xl overflow-hidden">
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white ">
              <p>Ideas</p>
            </span>
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white [animation-delay:0.8s]">
              <p>Tech</p>
            </span>
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white  [animation-delay:1.6s]">
              <p>Art</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
