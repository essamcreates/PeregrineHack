import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ authenticateUser, currentUser, updateCurrentUser, setCurrentUser }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault();
    console.log(currentUser)
    let temp = {
      email: currentEmail,
      password: currentPassword
    };
    let correctUser = await authenticateUser(temp);
    console.log(correctUser);
    if (!correctUser) {
      setCurrentEmail("");
      setCurrentPassword("");
      setFailedLogin(true);
    } else {
      setFailedLogin(false);
      navigate("/HomePage");
    }
  };

  return (
    <div>
      {!currentUser && (
        <form onSubmit={(event) => handleLoginClick(event)}>
          {/* <label class="text-gray-700 p-4">Email: </label> */}
          <input
            class="border border-gray-300 rounded p-2 w-full mb-5"
            type="text"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          {/* <label class="text-gray-700 p-4">Password: </label> */}
          <input
            class="border border-gray-300 rounded p-2 w-full mb-5"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <a
            href="#"
            class="underline w-full flex justify-end font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-400 to-yellow-200"
          >
            Forgotten Password?
          </a>
          <div class="w-full flex justify-end">
            <button
              className="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
              type="submit"
            >
              Login
            </button>

            </div>
          </form>
        )}
        {failedLogin && (
          <p class="text-red-500">Warning: incorrect email or password. Please try again</p>
        )}
        {currentUser && (<div class="flex items-center justify-center">
          <button class="bg-teal-500 text-white py-2 px-5 rounded text-xl hover:bg-teal-800" onClick={() => {setCurrentUser();updateCurrentUser(null); localStorage.clear();}}>
            Signout
          </button>
        </div>
      )}
    </div>
  );
};
export default LoginForm;

