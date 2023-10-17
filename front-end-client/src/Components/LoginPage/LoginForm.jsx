import { useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({authenticateUser, currentUser, setCurrentUser}) => {


    const[currentEmail, setCurrentEmail]= useState("");
    const[currentPassword, setCurrentPassword]= useState("");
    const[failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = async(event) => {
        event.preventDefault();
        let temp = {
                    email: currentEmail,
                    password: currentPassword
            }
        console.log(temp)
        let correctUser = await authenticateUser(temp)
        console.log(correctUser)
        if(!correctUser){
            setCurrentEmail("");
            setCurrentPassword("");
            setFailedLogin(true);
        }else{
            setFailedLogin(false)
            navigate("/");
        }
        console.log(currentEmail);
    }

    return (
        <div>
            {!currentUser && (<form onSubmit={(event)=>{handleLoginClick(event)}}>
                <label> Email:</label>
                <input type="text" value={currentEmail} onChange={(e)=>{setCurrentEmail(e.target.value)}}/>
                <br/>
                <br/>
                <label> Password:</label>
                <input type="text" value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}/>
                <input type="submit" value="Login"/>
            </form>)}
            {failedLogin && (<><p>Warning: incorrect email or password. Please try again</p></>)}
            {/* sign out */}
            {currentUser && (<button onClick={()=>{setCurrentUser(null)}}>signout</button>)}
        </div>
    )
}
export default LoginForm;