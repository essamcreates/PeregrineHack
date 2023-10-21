import { useState } from "react";
import AccountRegistrationForm from "./AccountRegistrationForm";

const AccountRegistrationPage = ({ signupUser }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AccountRegistrationForm signupUser={signupUser} />
    </div>
  );
};
export default AccountRegistrationPage;
