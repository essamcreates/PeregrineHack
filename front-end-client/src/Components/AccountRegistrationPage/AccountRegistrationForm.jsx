import { useState } from "react"

const AccountRegistrationForm = ({signupUser}) => {

    const [enteredEmail, setEnteredEmail] = useState ("")
    const [enteredPassword, setEnteredPassword] = useState ("")
    const [enteredName, setEnteredName] = useState ("")
    const [enteredConfirmedPassword, setConfirmedPassword] = useState ("")
    
    const handleSignupClick = async(event) => {
        event.preventDefault();
        if (enteredPassword !== enteredConfirmedPassword) {
            alert("Password doesn't match")
            setEnteredPassword("")
            setConfirmedPassword("")
        } else if(!enteredEmail || !enteredPassword || !enteredName) {
            alert("Please enter all fields")
            // Look to higlight fields that are left empty
        } else {
        let temp = {
                    name: enteredName,
                    email: enteredEmail,
                    password: enteredPassword
            }
        let signupAccepted = await signupUser(temp)
        if (signupAccepted) {
            alert("signup worked")
        } else {
            alert("email already in use")
            setEnteredPassword("")
            setConfirmedPassword("")
            setEnteredName("")
            setEnteredEmail("")
        }
        }
        }
    
    return (
        <div>
             <form className="signup-form" onSubmit={(event)=>{handleSignupClick(event)}}>
             <label> First Name:</label>
                <input className="input-box" type="text" value={enteredName} onChange={(e)=>{setEnteredName(e.target.value)}}/>
                <br>
                </br>
                <label> Email:</label>
                <input className="input-box" type="text" value={enteredEmail} onChange={(e)=>{setEnteredEmail(e.target.value)}}/>
                <br/>
                <br/>
                <label> Password:</label>
                <input className="input-box" type="text" value={enteredPassword} onChange={(e)=>{setEnteredPassword(e.target.value)}}/>
                <br>
                </br>
                <label> Confirm Password:</label>
                <input className="input-box" type="text" value={enteredConfirmedPassword} onChange={(e)=>{setConfirmedPassword(e.target.value)}}/>
                <input type="submit" value="Sign up"/>
            </form>
        </div>
    )
}
export default AccountRegistrationForm;