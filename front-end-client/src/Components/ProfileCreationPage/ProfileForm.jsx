import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateOfBirthListbox from "./DateOfBirthListbox";

const ProfileBox = ({ currentUser }) => {
  // Add in validation when no current user that they need to login first

  // const [enteredJobRole, setEnteredJobRole] = useState ("")
  const [enteredCareerGoals, setEnteredCareerGoals] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "DD",
    month: "MM",
    year: "YYYY"
  });
  const [enteredDOBDay, setEnteredDOBDay] = useState();
  const [enteredDOBMonth, setEnteredDOBMonth] = useState();
  const [enteredDOBYear, setEnteredDOBYear] = useState();
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredAccessNeeds, setEnteredAccessNeeds] = useState([]);
  const [enteredMentalHealthConditions, setEnteredMentalHealthConditions] = useState([]);
  const [careerGoals, setCareerGoals] = useState();
  const [mentalHealthConditions, setMentalHealthConditions] = useState();
  const [accessNeeds, setAccessNeeds] = useState();
  const navigate = useNavigate();

  // need to fetch data; data, accessneeds and mental health conditions
  // have the user be able to choose multiple needs and conditions if they so wish
  // have the user rank their top three career goals

  const fetchCareerGoals = async () => {
    const response = await fetch("http://localhost:8080/careerGoals");
    const data = await response.json();
    setCareerGoals(data);
    console.log(data);
  };
  useEffect(() => {
    fetchCareerGoals();
  }, []);

  const fetchMentalHealthConditions = async () => {
    const response = await fetch("http://localhost:8080/mentalHealthConditions");
    const data = await response.json();
    setMentalHealthConditions(data);
    console.log(data);
  };

  useEffect(() => {
    fetchMentalHealthConditions();
  }, []);

  const fetchAccessNeeds = async () => {
    const response = await fetch("http://localhost:8080/accessNeeds");
    const data = await response.json();
    setAccessNeeds(data);
    console.log(data);
  };

  useEffect(() => {
    fetchAccessNeeds();
  }, []);

  const handleCreationClick = async (event) => {
    event.preventDefault();
    if (
      !enteredGender ||
      dateOfBirth.day === "DD" ||
      dateOfBirth.month === "MM" ||
      dateOfBirth.year === "YYYY"
    ) {
      alert("Please enter all fields");
      // highlight fields that are left empty
    } else {
      let tempDoB = {
        dateOfBirth: dateOfBirth.year + "-" + dateOfBirth.month + "-" + dateOfBirth.day
      };
      let tempGender = {
        gender: enteredGender
      };
      let tempGoals = {
        goalIds: enteredCareerGoals
      };
      let tempNeeds = {
        accessNeedIds: enteredAccessNeeds
      };
      let tempConditions = {
        mentalHealthConditionIds: enteredMentalHealthConditions
      };
      // send info on gender and DOB
      addUserInfo(tempDoB);
      addUserInfo(tempGender);
      addUserData(tempGoals, "careerGoals");
      addUserData(tempNeeds, "accessNeeds");
      addUserData(tempConditions, "mentalHealthConditions");
      navigate("/HomePage");
    }
    console.log(enteredDOBDay + "/" + enteredDOBMonth + "/" + enteredDOBYear);
  };

  const addUserInfo = async (userInfo) => {
    const url = `http://localhost:8080/users/` + currentUser.id;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    });
    console.log(response.json());
  };

  const addUserData = async (userInfo, path) => {
    const url = `http://localhost:8080/` + path + `/` + currentUser.id;
    console.log(url);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    });
  };

  const handleCareerCheckboxChange = (event) => {
    const { value } = event.target;
    if (enteredCareerGoals.includes(value)) {
      setEnteredCareerGoals(enteredCareerGoals.filter((item) => item !== value));
    } else {
      setEnteredCareerGoals([...enteredCareerGoals, value]);
    }
  };

  const loopCareerGoals = () => {
    return careerGoals.map((careerGoal) => (
      <label
        key={careerGoal.id}
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
      ${enteredCareerGoals.includes(`${careerGoal.id}`) ? "bg-blue-500 text-white" : "bg-gray-200"}
      hover:bg-blue-300 hover:text-white
    `}
      >
        <input
          type="checkbox"
          name="careerGoal"
          key={careerGoal.id}
          value={careerGoal.id}
          onChange={(e) => {
            handleCareerCheckboxChange(e);
          }}
          checked={enteredCareerGoals.includes(`${careerGoal.id}`)}
          className={"hidden"}
        />
        {careerGoal.goal}
      </label>
    ));
  };

  const handleAccessNeedCheckboxChange = (event) => {
    const { value } = event.target;
    if (enteredAccessNeeds.includes(value)) {
      setEnteredAccessNeeds(enteredAccessNeeds.filter((item) => item !== value));
    } else {
      setEnteredAccessNeeds([...enteredAccessNeeds, value]);
    }
  };

  const loopAccessNeeds = () => {
    return accessNeeds.map((accessNeed) => (
      <label
        key={accessNeed.id}
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
    ${enteredAccessNeeds.includes(`${accessNeed.id}`) ? "bg-blue-500 text-white" : "bg-gray-200"}
    hover:bg-blue-300 hover:text-white
  `}
      >
        <input
          type="checkbox"
          name="accessNeed"
          key={accessNeed.id}
          value={accessNeed.id}
          onChange={(e) => {
            handleAccessNeedCheckboxChange(e);
          }}
          checked={enteredAccessNeeds.includes(`${accessNeed.id}`)}
          className={"hidden"}
        />
        {accessNeed.accessNeedENUM}
      </label>
    ));
  };

  const handleMentalHealthConditionCheckboxChange = (event) => {
    const { value } = event.target;
    if (enteredMentalHealthConditions.includes(value)) {
      setEnteredMentalHealthConditions(
        enteredMentalHealthConditions.filter((item) => item !== value)
      );
    } else {
      setEnteredMentalHealthConditions([...enteredMentalHealthConditions, value]);
    }
  };

  const loopMentalHealthConditions = () => {
    return mentalHealthConditions.map((mentalHealthCondition) => (
      <label
        key={mentalHealthCondition.id}
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
    ${
      enteredMentalHealthConditions.includes(`${mentalHealthCondition.id}`)
        ? "bg-blue-500 text-white"
        : "bg-gray-200"
    }
    hover:bg-blue-300 hover:text-white
  `}
      >
        <input
          type="checkbox"
          name="mentalHealthCondition"
          key={mentalHealthCondition.id}
          value={mentalHealthCondition.id}
          onChange={(e) => {
            handleMentalHealthConditionCheckboxChange(e);
          }}
          checked={enteredMentalHealthConditions.includes(`${mentalHealthCondition.id}`)}
          className={"hidden"}
        />
        {mentalHealthCondition.mentalHealthCondition}
      </label>
    ));
  };

  return (
    <div>
      {currentUser && (
        <>
          {currentUser.name}
          {currentUser.id}
          <form
            className="profileCreation"
            onSubmit={(event) => {
              handleCreationClick(event);
            }}
          >
            {/* <label> Job Role/Title:</label>
                <input className="input-box" type="text" value={enteredJobRole} onChange={(e)=>{setEnteredJobRole(e.target.value)}}/>
                <br> */}
            <label> Career Goals:</label>
            {careerGoals && <>{loopCareerGoals()}</>}
            <br />
            <br />
            <label> AccessNeeds:</label>
            {accessNeeds && <>{loopAccessNeeds()}</>}
            <br />
            <br />
            <label> MentalHealthConditions:</label>
            {mentalHealthConditions && <>{loopMentalHealthConditions()}</>}
            <br />
            <br />
            <DateOfBirthListbox dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
            <br></br>
            <label> Gender:</label>
            <input
              className="input-box"
              type="text"
              value={enteredGender}
              onChange={(e) => {
                setEnteredGender(e.target.value);
              }}
            />
            <input type="submit" value="Add" />
          </form>
        </>
      )}
    </div>
  );
};
export default ProfileBox;
