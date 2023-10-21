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
    if (!enteredEmail.contains("@")) {
      setInputErrorMessage("Email entered is invalid");
      setInputError(true);
      setEnteredEmail("");
    }
    if (enteredPassword !== enteredConfirmedPassword) {
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
        navigate("/HomePage");
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
    <div>
      <form
        className="signup-form"
        onSubmit={(event) => {
          handleSignupClick(event);
        }}
      >
        <fieldset>
          <legend>User Sign-Up Form</legend>
          <label> First Name:</label>
          <input
            className="input-box"
            type="text"
            value={enteredName}
            onChange={(e) => {
              setEnteredName(e.target.value);
            }}
          />
          <br></br>
          <label> Email:</label>
          <input
            className="input-box"
            type="text"
            value={enteredEmail}
            onChange={(e) => {
              setEnteredEmail(e.target.value);
            }}
          />
          <br />
          <br />
          {/* change the type="text" to ="password" after testing etc*/}
          <label> Password:</label>
          <input
            className="input-box"
            type="text"
            value={enteredPassword}
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
          />
          <br></br>
          <label> Confirm Password:</label>
          <input
            className="input-box"
            type="text"
            value={enteredConfirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
          />
        </fieldset>
        <button type="submit">Sign Up</button>
      </form>

      {inputError && (
        <div>
          <p> {inputErrorMessage}</p>
        </div>
      )}

      <button
        onClick={() => {
          navigate("/LoginPage");
        }}
      >
        Already have an account, Login
      </button>
    </div>
  );
};
export default AccountRegistrationForm;
