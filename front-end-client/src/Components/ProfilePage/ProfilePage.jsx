import { Link } from "react-router-dom";
import BigFiveDisplay from "./BigFiveDisplay.jsx";
import UserInfo from "./UserInfo.jsx";

const ProfilePage = ({ imageName, currentUser }) => {
  console.log(imageName);

  return (
    <>
      <section className="relative block h-40 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100">
        <div className="absolute top-0 w-full h-full bg-black opacity-30">
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon class="text-blue-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="profile-section relative py-16 bg-indigo-50 mt-40">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="flex justify-center">
                      <img
                        src={`http://localhost:8080/${currentUser.profilePictureURL}`}
                        alt="User Profile Picture"
                        className="shadow-xl rounded-full h-75-px w-75-px align-middle border-none relative -m-16 -ml-20 lg:-ml-16"
                      />
                      {/*class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img> */}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Link
                  to="/EditProfile"
                  className="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
                >
                  Manage Account
                </Link>
              </div>
              <div>
                <BigFiveDisplay currentUser={currentUser} />
              </div>

              <div>
                {/*<img src={`http://localhost:8080/profilePhoto/${imageName}`} alt="User Profile Picture" />*/}

                {currentUser && <p>Hello {currentUser.name}</p>}
              </div>
              {/* 
          <div>
            <UserInfo user={currentUser} />
          </div> */}

              <div>
                <Link to="/UploadProfilePhoto">upload Profile Photo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProfilePage;
