import { Link } from "react-router-dom";

const HomePage = ({currentUser}) => {

    return (
        <>
        <p>hello</p>
        <Link to="/LoginPage">Click to see Login Page</Link>
        {currentUser && (<p>Hello {currentUser.name}</p>)}

        <Link to="/ProfileCreationPage">Click to see profile create Page</Link>

        <Link to="/ProfilePage">Click to see Profile Page</Link>
        </>
    )
}
export default HomePage;