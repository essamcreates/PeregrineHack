import LoginForm from "./LoginForm";

const LoginPage = ({authenticateUser}) => {

    return (
        <>
        <h1>User Login</h1>
        <h2> Welcome to your personal development coach</h2>
        <LoginForm authenticateUser={authenticateUser} />
        </>
    )
}
export default LoginPage;