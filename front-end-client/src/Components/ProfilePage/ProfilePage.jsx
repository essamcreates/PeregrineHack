import { Link } from "react-router-dom";
import BigFiveDisplay from "./BigFiveDisplay.jsx";
import CareerGoalsList from "./CareerGoalsList.jsx";
import AccessNeedList from "./AccessNeedList.jsx";
import MentalHealthConditionsList from "./MentalHealthConditionsList.jsx";

const ProfilePage = ({ imageName, currentUser }) => {
  console.log(imageName);

  return (
    <>
      {currentUser && (
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
                <polygon
                  class="text-blue-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="profile-section relative py-16 bg-indigo-50 mt-40">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 sm:w-3/12 flex justify-center">
                      <div className="relative">
                        <div className="flex justify-center">
                          <img
                            src={`http://localhost:8080/${currentUser.profilePictureURL}`}
                            alt="User Profile Picture"
                            className="shadow-xl rounded-full h-48 w-48 max-w-none align-middle border-none relative object-cover -m-16 -ml-20 lg:-ml-16"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <Link
                          to="/EditProfile"
                          className="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
                        >
                          Manage Account
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-0.5 text-neutral-700">
                      Hello {currentUser.name}
                    </h3>
                    <p className="text-sm leading-normal mt-0 mb-2 text-neutral-400 font-bold uppercase">
                      Job Title Goes Here
                    </p>
                  </div>

                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* First Column: Career Goals */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <CareerGoalsList currentUserGoals={currentUser.careerGoals} />
                      </div>

                      {/* Second Column: Big Five Information */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <BigFiveDisplay currentUser={currentUser} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to="/UploadProfilePhoto">upload Profile Photo</Link>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Link
                        to="/EditProfile"
                        className="bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
                      >
                        Manage Account
                      </Link>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-0.5 text-neutral-700">
                      Hello {currentUser.name}
                    </h3>
                    <p className="text-sm leading-normal mt-0 mb-2 text-neutral-400 font-bold uppercase">
                      Job Title Goes Here
                    </p>
                  </div>

                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* First Column: Career Goals */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <CareerGoalsList currentUserGoals={currentUser.careerGoals} />
                      </div>

                      {/* Second Column: Big Five Information */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <BigFiveDisplay currentUser={currentUser} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      {/* Third Column: Mental Health Conditions */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <MentalHealthConditionsList
                          conditions={currentUser.mentalHealthConditions}
                        />
                      </div>
                      {/* Fourth Column: Access Needs */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <AccessNeedList accessNeeds={currentUser.accessNeeds} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to="/UploadProfilePhoto">upload Profile Photo</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default ProfilePage;
