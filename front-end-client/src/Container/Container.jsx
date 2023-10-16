import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import LoginPage from "../Components/LoginPage/LoginPage";
import QuizPage from "../Components/QuizPage/QuizPage";
import AccountRegistrationPage from "../Components/AccountRegistrationPage/AccountRegistrationPage";
import ProfileCreationPage from "../Components/ProfileCreationPage/ProfileCreationPage";
import ProfilePage from "../Components/ProfilePage/ProfilePage";

const Container = () => {

    return (
        <div>
        <BrowserRouter>
        <main>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/LoginPage" element={<LoginPage/>}></Route>
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
