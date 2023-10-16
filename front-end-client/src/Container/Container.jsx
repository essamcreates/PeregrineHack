import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import LoginPage from "../Components/LoginPage/LoginPage";
import QuizPage from "../Components/QuizPage/QuizPage";
import AccountRegistrationPage from "../Components/AccountRegistrationPage/AccountRegistrationPage";
import ProfileCreationPage from "../Components/ProfileCreationPage/ProfileCreationPage";
import ProfilePage from "../Components/ProfilePage/ProfilePage";
import { useState } from "react";

const Container = () => {

    const[currentUser, setCurrentUser]= useState();

    const authenticateUser = async (loginInfo) => {
        const url = `http://localhost:8080/authenticate`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        })
        const newResponse = await response.json();
        if(response.status === 202) {
            setCurrentUser(newResponse)
            alert("logged in")
        }else{
            alert("not found")
        }
    } 

    return (
        <div>
            <BrowserRouter>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/LoginPage" element={<LoginPage authenticateUser={authenticateUser}/>}></Route>
                        <Route path="/AccountRegistrationPage" element={<AccountRegistrationPage/>}></Route>
                        <Route path="/ProfileCreationPage" element={<ProfileCreationPage/>}></Route>
                        <Route path="/ProfilePage" element={<ProfilePage/>}></Route>
                        <Route path="/QuizPage" element={<QuizPage/>}></Route>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}
export default Container;
