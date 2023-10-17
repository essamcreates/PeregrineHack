import { useState } from "react"

const AccountRegistrationForm = () => {

    const [enteredEmail, setEnteredEmail] = useState ("")
    const [enteredPassword, setEnteredPassword] = useState ("")
    const [enteredName, setEnteredName] = useState ("")
    const [enteredConfirmedPassword, setConfirmedPassword] = useState ("")
    
    return (
        <div>
             <form className="signup-form" onSubmit={(event)=>{handlesignupClick(event)}}>
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