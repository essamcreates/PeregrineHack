import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountRegistrationForm = ({signupUser}) => {

    const [enteredEmail, setEnteredEmail] = useState ("")
    const [enteredPassword, setEnteredPassword] = useState ("")
    const [enteredName, setEnteredName] = useState ("")
    const [enteredConfirmedPassword, setConfirmedPassword] = useState ("")
    const [inputError, setInputError] = useState(false)
    const [inputErrorMessage, setInputErrorMessage] = useState("")
    const navigate = useNavigate()
    
    const handleSignupClick = async(event) => {
        event.preventDefault();
        if (enteredPassword !== enteredConfirmedPassword) {
            setInputErrorMessage("Password doesn't match")
            setInputError(true)
            setEnteredPassword("")
            setConfirmedPassword("")
        } else if(!enteredEmail || !enteredPassword || !enteredName) {
            setInputErrorMessage("Please enter all fields")
            setInputError(true)
            // Look to higlight fields that are left empty
        } else {
        let temp = {
                    name: enteredName,
                    email: enteredEmail,
                    password: enteredPassword
            }
        let signupAccepted = await signupUser(temp)
        if (signupAccepted) {
            navigate("/HomePage")
        } else {
            setInputErrorMessage("email already in use")
            setInputError(true)
            setEnteredPassword("")
            setConfirmedPassword("")
            setEnteredName("")
            setEnteredEmail("")
        }
        }
        }
    
    return (
        <div className="w-90">
             <form className="signup-form" onSubmit={(event)=>{handleSignupClick(event)}}>
             <label> First Name:</label>
                <input class="border border-gray-300 rounded p-2 w-full mb-4" type="text" value={enteredName} onChange={(e)=>{setEnteredName(e.target.value)}} placeholder="First Name"/>
                <br/>
                <label> Email:</label>
                <input class="border border-gray-300 rounded p-2 w-full mb-4" type="text" value={enteredEmail} onChange={(e)=>{setEnteredEmail(e.target.value)}} placeholder="Email"/>
                <br/>
                <label> Password:</label>
                <input class="border border-gray-300 rounded p-2 w-full mb-4" type="password" value={enteredPassword} onChange={(e)=>{setEnteredPassword(e.target.value)}} placeholder="Password"/>
                <br/>
                <label> Confirm Password:</label>
                <input class="border border-gray-300 rounded p-2 w-full mb-4" type="password" value={enteredConfirmedPassword} onChange={(e)=>{setConfirmedPassword(e.target.value)}} placeholder="Confirm Password"/>
                {inputError && (<div>
                <p class="text-red-500" > {inputErrorMessage}</p>
                </div>)}
                <div class="w-full flex justify-center">
                <input class="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800" type="submit" value="Sign up"/>
                </div>
            </form>

            
            <div class="w-full flex justify-center">
            <button  onClick={()=>{navigate("/LoginPage")}}>Already have an account,  <span class="underline">Login</span></button>
            </div>
        </div>
    )
}
export default AccountRegistrationForm;