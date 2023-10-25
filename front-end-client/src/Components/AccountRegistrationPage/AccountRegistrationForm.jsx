import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountRegistrationForm = ({ signupUser, setIsNewUser }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredConfirmedPassword, setConfirmedPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignupClick = async (event) => {
    event.preventDefault();
    if (!enteredEmail.includes("@")) {
      setInputErrorMessage("Email entered is invalid");
      setInputError(true);
      setEnteredEmail("");
    } else if (enteredPassword !== enteredConfirmedPassword) {
      setInputErrorMessage("Passwords don't match");
      setInputError(true);
      setEnteredPassword("");
      setConfirmedPassword("");
    } else if (!enteredEmail || !enteredPassword || !enteredName) {
      setInputErrorMessage("Please enter all fields");
      setInputError(true);
      // Look to higlight fields that are left empty
    } else {
      setIsNewUser(true);
      let temp = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword
      };
      let signupAccepted = await signupUser(temp);
      if (signupAccepted) {
        navigate("/EditProfile");
      } else {
        setInputErrorMessage("Email already in use");
        setInputError(true);
        setEnteredPassword("");
        setConfirmedPassword("");
        setEnteredName("");
        setEnteredEmail("");
      }
    }
  };

  return (
    <div className="w-90">
      <div>
        <form
          name="signup-form"
          onSubmit={(event) => {
            handleSignupClick(event);
          }}
        >
          <fieldset className="flex flex-col">
            <legend>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                User Sign-Up Form
              </h1>
            </legend>
            <label for="First Name" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={enteredName}
              onChange={(e) => {
                setEnteredName(e.target.value);
              }}
              required
            />
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
              }}
              required
            />
            {/* change the type="text" to ="password" after testing etc*/}
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={enteredPassword}
              onChange={(e) => {
                setEnteredPassword(e.target.value);
              }}
              required
            />
            <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={enteredConfirmedPassword}
              onChange={(e) => {
                setConfirmedPassword(e.target.value);
              }}
              required
            />
          </fieldset>
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
          >
            Sign Up
          </button>
        </form>

        {inputError && (
          <div>
            <p> {inputErrorMessage}</p>
          </div>
        )}

        <div class="w-full flex justify-center">
          <button
            onClick={() => {
              navigate("/LoginPage");
            }}
          >
            Already have an account, <span class="underline">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountRegistrationForm;
