import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import "./ProfileCreationPage.css";

const ProfileCreationPage = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <>
      {currentUser && (
        <div>
          <div>
            {/* <h1>Welcome {currentUser.name}!</h1> */}
            <h2>
              I am Bob, your personal development coach. Please give me some information about
              yourself so I can get to know you!
            </h2>
            {/* Profile creation bar */}
            <ProfileForm currentUser={currentUser} />
          </div>
          <div>
            <Link to="/QuizPage">Click to take personality quiz</Link>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-full bg-white rounded-lg shadow md:mt-2 sm:max-w-md xl:p-0 mg-center flex flex-col items-center justify-center">
            <h1 className="text-center my-2">No user logged in. Please login here</h1>
            <div className="login-div my-2">
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
      )}
    </>
  );
};
export default ProfileCreationPage;
