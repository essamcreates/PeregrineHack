import { useState } from "react";

const ProfileBox = () => {

    const [enteredJobRole, setEnteredJobRole] = useState ("")
    const [enteredCareerGoals, setEnteredCareerGoals] = useState ("")
    const [enteredDOB, setEnteredDOB] = useState ("")
    const [ enteredGender, setEnteredGender] = useState ("")
    const [ enteredAccessNeeds, setEnteredAccessNeeds] = useState ("")

    const handleSignupClick = async(event) => {
        event.preventDefault();
        if (!enteredJobRole, !enteredCareerGoals, !enteredDOB, !enteredGender, !enteredAccessNeeds) {
            alert("Please enter all fields")
            // highlight fields that are left empty
        } else {
            let temp = {
                DOB: enteredDOB,
                Gender: enteredGender
                // do we only need the above two as they will be the ones that need to be added to the database?
            }
        }

    }

    return (
        <div>
            <form className="profileCreation" onSubmit={(event)=> {handleSignupClick(event)}}>
            <label> Job Role/Title:</label>
                <input className="input-box" type="text" value={enteredJobRole} onChange={(e)=>{setEnteredJobRole(e.target.value)}}/>
                <br>
                </br>
                <label> Career Goals:</label>
                <input className="input-box" type="text" value={enteredCareerGoals} onChange={(e)=>{setEnteredCareerGoals(e.target.value)}}/>
                <br/>
                <br/>
                <label> Date of Birth:</label>
                <input className="input-box" type="text" value={enteredDOB} onChange={(e)=>{setEnteredDOB(e.target.value)}}/>
                <br>
                </br>
                <label> Gender:</label>
                <input className="input-box" type="text" value={enteredGender} onChange={(e)=>{setEnteredGender(e.target.value)}}/>
                <input type="submit" value="Add"/>

            </form>

        </div>
    )
}
export default ProfileBox;