import { useState } from "react";

const LoginForm = ({authenticateUser}) => {

    const[currentEmail, setCurrentEmail]= useState("");
    const[currentPassword, setCurrentPassword]= useState("");

    const handleLoginClick = async() => {
        let temp = {
                    email: currentEmail,
                    password: currentPassword
            }
        authenticateUser(temp)

        console.log(currentEmail);
    }

    // const postLogInCustomer = async (tempEmail, tempPassword) => {
    //     let temp = {
    //         email: tempEmail,
    //         password: tempPassword
    //     }

    //     console.log(temp);
    //     const newResponse = await fetch(`http://localhost:8080/customers/authenticate`,{
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body:JSON.stringify(temp)
    //     })
    //     const newC = await newResponse.json();
    //     setCurrentCustomer(newC);
    // }

    // const handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     postLogInCustomer(tempEmail, tempPassword);
    // }

    return (
        <div>
            <form >
                <label> Email:</label>
                <input type="text" onChange={(e)=>{setCurrentEmail(e.target.value)}}/>
                <br/>
                <label> Password:</label>
                <input type="text" onChange={(e)=>{setCurrentPassword(e.target.value)}}/>
                <input type="submit" value="Login" onClick={()=>{handleLoginClick()}}/>
            </form>
        </div>
    )
}
export default LoginForm;

{/* <div>
<form action="/action_page.php">
  <label for="rname">Restaurant name:</label><br/>
  <input type="text" id="rname"/>
  {/* <input type="submit" value="Enter"/> */}
//   <br/>
//   <label for="fborough">Borough name:</label><br/>
//   <input type="text" id="fborough" />
//   {/* <input type="submit" value="Enter"/> */}
//   <br/>
//   <label htmlFor="fprice">Price range:</label><br />
//   <select id="fprice">
//     {priceRangeOptions.map((option, index) => (
//       <option key={index} value={option}>
//         {option}
//       </option>
//     ))}
//   </select><br />

//   <label for="frating">Rating:</label><br/>
//   <input type="number" id="frating" />
//   <input type="submit" value="Enter"/><br/>
// </form>
// <br/>
// <button onClick={handleClose}>Close</button>
// </div> 