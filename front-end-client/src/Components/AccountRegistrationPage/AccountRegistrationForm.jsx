import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountRegistrationForm = ({ signupUser }) => {
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
    <div className="w-full bg-white rounded-lg shadow md:mt-2 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form
          className="signup-form space-y-4 md:space-y-6"
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
              className="input-box bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
              className="input-box bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
              type="text"
              name="password"
              id="password"
              className="input-box bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
              type="text"
              name="confirm-password"
              id="confirm-password"
              className="input-box bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              value={enteredConfirmedPassword}
              onChange={(e) => {
                setConfirmedPassword(e.target.value);
              }}
              required
            />
          </fieldset>
          <button
            type="submit"
            className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>

        {inputError && (
          <div>
            <p> {inputErrorMessage}</p>
          </div>
        )}

        <div className="login-div">
          <span>Already have an account? </span>
          <button
            className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              navigate("/LoginPage");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountRegistrationForm;
