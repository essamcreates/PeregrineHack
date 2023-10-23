import { Link } from "react-router-dom";
import BigFiveDisplay from "./BigFiveDisplay.jsx";
import UserInfo from "./UserInfo.jsx";

const ProfilePage = ({ imageName, currentUser }) => {
  console.log(imageName);

  return (
    <div>
      <div className="m-2">
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
        <img
          src={`http://localhost:8080/${currentUser.profilePictureURL}`}
          alt="User Profile Picture"
          width="200px"
          height="200px"
        />
        {/*<img src={`http://localhost:8080/profilePhoto/${imageName}`} alt="User Profile Picture" />*/}

        {currentUser && <p>Hello {currentUser.name}</p>}
      </div>

      <div>
        <UserInfo user={currentUser} />
      </div>

      <div>
        <Link to="/UploadProfilePhoto">upload Profile Photo</Link>
      </div>
    </div>
  );
};
export default ProfilePage;
