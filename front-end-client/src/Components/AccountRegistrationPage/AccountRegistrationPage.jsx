import { useState } from "react";
import AccountRegistrationForm from "./AccountRegistrationForm";

const AccountRegistrationPage = ({ signupUser, setIsNewUser }) => {
  return (
    // whole screen | colour gradient background | flex display with all content centered
    <div class="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100 flex items-center justify-center">
      {/* white sign up box | padding 20 for medium screens   */}
      <div class="bg-white shadow-lg rounded-lg box-content p-8 sm:w-7/8 sm:p-20  md:w-1/3 lg:w-1/3">
        {/* colour slate (#334155) | font thickness medium | padding bottom 10 */}
        <h1 class="text-slate-700 text-center text-3xl font-medium pb-10">Account Sign Up</h1>
        <AccountRegistrationForm signupUser={signupUser} setIsNewUser={setIsNewUser} />
      </div>
    </div>
  );
};
export default AccountRegistrationPage;
