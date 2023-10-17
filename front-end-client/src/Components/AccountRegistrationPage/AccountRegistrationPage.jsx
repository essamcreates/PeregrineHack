import { useState } from "react";
import AccountRegistrationForm from "./AccountRegistrationForm";

const AccountRegistrationPage = ({signupUser}) => {



            return (
                <div >
                    <h1>Account sign up</h1>
                    <AccountRegistrationForm signupUser={signupUser}/>
                </div>
            )
        
}
export default AccountRegistrationPage;