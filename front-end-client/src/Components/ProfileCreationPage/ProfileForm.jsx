import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({ currentUser }) => {
  // Add in validation when no current user that they need to login first

  // const [enteredJobRole, setEnteredJobRole] = useState ("")
  const [enteredCareerGoals, setEnteredCareerGoals] = useState([]);
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
  const [isChecked, setIsChecked] = useState(false);

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
    if ((!enteredGender, !enteredDOBDay, !enteredDOBMonth, !enteredDOBYear)) {
      alert("Please enter all fields");
      // highlight fields that are left empty
    } else {
      let tempDoB = {
        dateOfBirth: enteredDOBYear + "-" + enteredDOBMonth + "-" + enteredDOBDay
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

  const loopNumber = (start, end) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      if (i < 10) {
        options.push(
          <option key={i + start} value={"0" + i}>
            {i}
          </option>
        );
      } else {
        options.push(
          <option key={i + start} value={i}>
            {i}
          </option>
        );
      }
    }
    return options;
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (enteredCareerGoals.includes(value)) {
      setEnteredCareerGoals(enteredCareerGoals.filter((item) => item !== value));
      setIsChecked(false);
    } else {
      setEnteredCareerGoals([...enteredCareerGoals, value]);
      setIsChecked(true);
    }
    console.log(event.target.checked);
  };

  const loopCareerGoals = () => {
    return careerGoals.map((careerGoal) => (
      // <option key={careerGoal.id} value={careerGoal.id}>
      //   {careerGoal.goal}
      // </option>
      <label>
        <input
          type="checkbox"
          name="careerGoal"
          key={careerGoal.id}
          value={careerGoal.id}
          onChange={(e) => {
            handleCheckboxChange(e);
          }}
          checked={enteredCareerGoals.includes(careerGoal.id)}
          className={`border p-2 m-2 rounded-lg cursor-pointer
          ${enteredCareerGoals.includes(careerGoal.id) ? "bg-blue-500 text-white" : "bg-gray-200"}
          hover:bg-blue-300 hover:text-white
        `}
        />
        {careerGoal.goal}
      </label>
    ));
  };

  const loopAccessNeeds = () => {
    return accessNeeds.map((accessNeed) => (
      <option key={accessNeed.id} value={accessNeed.id}>
        {accessNeed.accessNeedENUM}
      </option>
    ));
  };

  const loopMentalHealthConditions = () => {
    return mentalHealthConditions.map((mentalHealthCondition) => (
      <option key={mentalHealthCondition.id} value={mentalHealthCondition.id}>
        {mentalHealthCondition.mentalHealthCondition}
      </option>
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
            {/* <input className="input-box" type="text" value={enteredCareerGoals} onChange={(e)=>{setEnteredCareerGoals(e.target.value)}}/> */}
            {careerGoals && (
              <>{loopCareerGoals()}</>
              // <select
              //   className="select-multiple-goals block w-full mt-1 border border-gray-300 rounded-md p-2"
              //   name="goals"
              //   multiple
              //   value={enteredCareerGoals}
              //   onChange={(e) => {
              //     setEnteredCareerGoals(
              //       Array.from(e.target.selectedOptions, (option) => option.value)
              //     );
              //   }}
              // >
              //   {loopCareerGoals()}
              // </select>
            )}
            <br />
            <br />
            <label> AccessNeeds:</label>
            {accessNeeds && (
              <select
                className="select-multiple-needs"
                name="accessNeeds"
                multiple
                size={3}
                value={enteredAccessNeeds}
                onChange={(e) => {
                  setEnteredAccessNeeds(
                    Array.from(e.target.selectedOptions, (option) => option.value)
                  );
                }}
              >
                {loopAccessNeeds()}
              </select>
            )}
            <br />
            <br />
            <label> MentalHealthConditions:</label>
            {mentalHealthConditions && (
              <select
                multiple
                className="select-multiple-conditions"
                name="mentalHealthConditions"
                size={3}
                value={enteredMentalHealthConditions}
                onChange={(e) => {
                  setEnteredMentalHealthConditions(
                    Array.from(e.target.selectedOptions, (option) => option.value)
                  );
                }}
              >
                {loopMentalHealthConditions()}
              </select>
            )}
            <br />
            <br />
            <label> Date of Birth:</label>
            <div className="select-date">
              <select
                id="select-day"
                value={enteredDOBDay}
                onChange={(e) => {
                  setEnteredDOBDay(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  -DD
                </option>
                {loopNumber(1, 31)}
              </select>
              <select
                id="select-month"
                value={enteredDOBMonth}
                onChange={(e) => {
                  setEnteredDOBMonth(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  -MM
                </option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select
                id="select-year"
                value={enteredDOBYear}
                onChange={(e) => {
                  setEnteredDOBYear(e.target.value);
                }}
                placeholder="YYYY"
              >
                <option value="" disabled selected hidden>
                  -YYYY
                </option>
                {loopNumber(1935, 2023)}
              </select>
            </div>
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
