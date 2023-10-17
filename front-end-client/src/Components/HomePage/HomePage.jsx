import { Link } from "react-router-dom";

const HomePage = ({currentUser}) => {

    return (
        <>
        <p>hello</p>
        <Link to="/LoginPage">Click to see Login Page</Link>
        {currentUser && (<p>Hello {currentUser.name}</p>)}
        </>
    )
}
export default HomePage;