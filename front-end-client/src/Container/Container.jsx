import { BrowserRouter } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import LoginPage from "../Components/LoginPage/LoginPage";

const Container = () => {

    return (
        <div>
        {/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/LoginPage" element={<LoginPage/>}></Route>
                <Route path="/AccountRegistrationPage" element={<AccountRegistrationPage/>}></Route>
                <Route path="/ProfileCreationPage" element={<ProfileCreationPage/>}></Route>
                <Route path="/ProfilePage" element={<ProfileCreationPage/>}></Route>
                <Route path="/QuizPage" element={<QuizPage/>}></Route>
            </Routes>
        </BrowserRouter> */}
        </div>
    )
}
export default Container;
