import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import "./LoginPage.css";

const LoginPage = ({ authenticateUser, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
      <div class="grid grid-cols-2">
        {/* Column one */}
        <div class="flex flex-col justify-center p-20 ml-10">
          <div class="min-h-screen flex items-center justify-center">
            <div class="bg-white shadow-lg rounded-lg w-[550px] h-96x p-0 ml-10 mb-20">
              <h1 class="font-bold text-6xl opacity-40 line-through text-left ml-5 pt-5">Log In</h1>
              <h1 class="font-bold text-6xl opacity-50 text-left ml-5 pt-2">Clock In.</h1>
              {!currentUser && (
                <div class="p-10">
                  <h2 class="text-2x1 mb-10 white text-center text-2xl font-medium pb-10 pt-2">
                    Welcome back
                  </h2>
                  <LoginForm
                    authenticateUser={authenticateUser}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </div>
              )}
              {currentUser && (
                <div class="p-10">
                  <LoginForm
                    authenticateUser={authenticateUser}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </div>
              )}
              <div class="w-full flex justify-center">
                {!currentUser && (
                  <button
                    class="mb-7"
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
        {/* Column two */}
        <div class="flex justify-center items-center pr-20">
          <h1 class="flex-items-center text-6xl font-medium text-neutral-400">Dive Into</h1>
          <span class="relative ml-3 h-[1em] w-36 text-6xl overflow-hidden">
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white">
              <p>Ideas</p>
            </span>
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white [animation-delay:0.8s]">
              <p>Calm</p>
            </span>
            <span class="absolute h-full w-full -translate-y-full animate-slide leading-none text-white [animation-delay:1.6s]">
              <p>Goals</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
