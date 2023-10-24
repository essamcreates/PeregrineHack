import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import LoginPage from "../Components/LoginPage/LoginPage";
import QuizPage from "../Components/QuizPage/QuizPage";
import AccountRegistrationPage from "../Components/AccountRegistrationPage/AccountRegistrationPage";
import EditProfilePage from "../Components/EditProfilePage/EditProfilePage";
import ProfilePage from "../Components/ProfilePage/ProfilePage";
import { useState } from "react";
import NavDock from "../Components/NavDock/NavDock";
import UploadProfilePhoto from "../Components/ProfilePage/UploadProfilePhoto.jsx";

const Container = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateCurrentUser = (newUser) => {
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const [imageName, setImageName] = useState("");

  const authenticateUser = async (loginInfo) => {
    const url = `http://localhost:8080/users/authenticate`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo)
    });
    if (response.status === 202) {
      const newResponse = await response.json();
      updateCurrentUser(newResponse);
      return true;
    } else {
      return false;
    }
  };

  const signupUser = async (userInfo) => {
    const url = `http://localhost:8080/users/addUser`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    });
    console.log(response);
    if (response.status === 201) {
      const newUser = await response.json();
      setCurrentUser(newUser);
      return true;
    } else {
      return false;
    }
  };

  return (
    <BrowserRouter>
      <NavDock currentUser={currentUser} />
      <Routes>
        <Route path="/HomePage" element={<HomePage currentUser={currentUser} />}></Route>
        <Route
          path="/LoginPage"
          element={
            <LoginPage
              authenticateUser={authenticateUser}
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
        <Route
          path="/AccountRegistrationPage"
          element={<AccountRegistrationPage signupUser={signupUser} />}
        ></Route>
        <Route path="/EditProfile" element={<EditProfilePage currentUser={currentUser} />}></Route>
        <Route
          path="/ProfilePage"
          element={<ProfilePage imageName={imageName} currentUser={currentUser} />}
        ></Route>
        <Route path="/QuizPage" element={<QuizPage />}></Route>
        <Route
          path="/UploadProfilePhoto"
          element={
            <UploadProfilePhoto
              setImageName={setImageName}
              imageName={imageName}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Container;
