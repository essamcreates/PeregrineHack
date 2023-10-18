import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import LoginPage from "../Components/LoginPage/LoginPage";
import QuizPage from "../Components/QuizPage/QuizPage";
import AccountRegistrationPage from "../Components/AccountRegistrationPage/AccountRegistrationPage";
import ProfileCreationPage from "../Components/ProfileCreationPage/ProfileCreationPage";
import ProfilePage from "../Components/ProfilePage/ProfilePage";
import { useState } from "react";
import NavDock from "../Components/NavDock/NavDock";

const Container = () => {

    const[currentUser, setCurrentUser]= useState();

    const authenticateUser = async (loginInfo) => {
        const url = `http://localhost:8080/users/authenticate`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        })
        if(response.status === 202) {
            const newResponse = await response.json();
            setCurrentUser(newResponse)
            return true
        }else{
            return false
        }
    } 

    const signupUser = async (userInfo) => {
        const url = `http://localhost:8080/users/addUser`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        })
        console.log(response);
        if (response.status === 201) {
            const newUser = await response.json();
            setCurrentUser(newUser)
            return true
        } else {
            return false
        }
    }


    const addUserInfo = async (userInfo) => {
        const url = `http://localhost:8080/users/` + currentUser.id;
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        }) 
        setCurrentUser(response);
        console.log("fetch");
    }


    return (
        <div>
            <BrowserRouter>
                    <NavDock currentUser={currentUser}/>
                    <Routes>
                        <Route path="/HomePage" element={<HomePage currentUser={currentUser}/>}></Route>
                        <Route path="/LoginPage" element={<LoginPage authenticateUser={authenticateUser} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
                        <Route path="/AccountRegistrationPage" element={<AccountRegistrationPage signupUser={signupUser}/>}></Route>
                        <Route path="/ProfileCreationPage" element={<ProfileCreationPage addUserInfo={addUserInfo} currentUser={currentUser}/>}></Route>
                        <Route path="/ProfilePage" element={<ProfilePage currentUser={currentUser}/>}></Route>
                        <Route path="/QuizPage" element={<QuizPage/>}></Route>
                    </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Container;
