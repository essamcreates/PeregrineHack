import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";

const ProfileCreationPage = ({ currentUser, setCurrentUser, isNewUser }) => {
  const navigate = useNavigate();

  return (
    <>
      {currentUser && (
        <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100 bg-opacity-80 flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-20 w-3/4 mx-auto mt-4">
            {isNewUser ? (
              <h2 className="text-4xl text-gray-700">
                Welcome, I'm Farai, your personal development coach. Please share a bit about
                yourself so I can get to know you better, {currentUser.name}!
              </h2>
            ) : (
              <h2 className="text-4xl text-gray-700">Welcome back! Please update your profile.</h2>
            )}

            <ProfileForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isNewUser={isNewUser}
            />
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
