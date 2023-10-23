import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ authenticateUser, currentUser, setCurrentUser }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault();
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
            className="border border-gray-300 rounded p-2 w-full mb-4"
            type="text"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          {/* <label class="text-gray-700 p-4">Password: </label> */}
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <a href="#" className="underline w-full flex justify-end">
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
          <button class="bg-amber-200 text-slate-400 py-2 px-4 rounded text-2xl" onClick={() => setCurrentUser(null)}>
            Signout
          </button>
        </div>)}
      </div>
    )
}
export default LoginForm;
// =======
//           </div>
//         </form>
//       )}
//       {failedLogin && (
//         <p className="text-red-500">Warning: incorrect email or password. Please try again</p>
//       )}
//       {currentUser && (
//         <button
//           className="bg-red-500 text-white py-2 px-4 rounded"
//           onClick={() => setCurrentUser(null)}
//         >
//           Signout
//         </button>
//       )}
//     </div>
//   );
// };
// export default LoginForm;
// >>>>>>> develop
