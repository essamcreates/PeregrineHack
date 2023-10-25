import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateOfBirthListbox from "./DateOfBirthListbox";

const ProfileForm = ({ currentUser, isNewUser }) => {
  // Add in validation when no current user that they need to login first

  // const [enteredJobRole, setEnteredJobRole] = useState ("")
  const [enteredCareerGoals, setEnteredCareerGoals] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "DD",
    month: "MM",
    year: "YYYY"
  });
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredAccessNeeds, setEnteredAccessNeeds] = useState([]);
  const [enteredMentalHealthConditions, setEnteredMentalHealthConditions] = useState([]);
  const [careerGoals, setCareerGoals] = useState();
  const [mentalHealthConditions, setMentalHealthConditions] = useState();
  const [accessNeeds, setAccessNeeds] = useState();
  const [enteredJobTitle, setEnteredJobTitle] = useState();
  const navigate = useNavigate();

  // need to fetch data; data, accessneeds and mental health conditions
  // have the user be able to choose multiple needs and conditions if they so wish
  // have the user rank their top three career goals

  const fetchCareerGoals = async () => {
    const response = await fetch("http://localhost:8080/careerGoals");
    const data = await response.json();

    const formattedData = data.map((item) => {
      if (item.goal.includes("_")) {
        const formattedAccessNeed = item.goal
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
        return {
          ...item,
          goal: formattedAccessNeed
        };
      } else {
        const formattedAccessNeed =
          item.goal.charAt(0).toUpperCase() + item.goal.slice(1).toLowerCase();
        return {
          ...item,
          goal: formattedAccessNeed
        };
      }
    });

    setCareerGoals(formattedData);
    console.log(data);
  };
  useEffect(() => {
    fetchCareerGoals();
    fetchAccessNeeds();
    fetchMentalHealthConditions();
  }, []);

  const fetchMentalHealthConditions = async () => {
    const response = await fetch("http://localhost:8080/mentalHealthConditions");
    const data = await response.json();

    const formattedData = data.map((item) => {
      if (item.mentalHealthCondition.includes("_")) {
        const formattedAccessNeed = item.mentalHealthCondition
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
        return {
          ...item,
          mentalHealthCondition: formattedAccessNeed
        };
      } else {
        const formattedAccessNeed =
          item.mentalHealthCondition.charAt(0).toUpperCase() +
          item.mentalHealthCondition.slice(1).toLowerCase();
        return {
          ...item,
          mentalHealthCondition: formattedAccessNeed
        };
      }
    });

    setMentalHealthConditions(formattedData);
    console.log(data);
  };

  const fetchAccessNeeds = async () => {
    const response = await fetch("http://localhost:8080/accessNeeds");
    const data = await response.json();

    const formattedData = data.map((item) => {
      if (!(item.accessNeedENUM === "ADHD" || item.accessNeedENUM === "ASD")) {
        if (item.accessNeedENUM.includes("_")) {
          const formattedAccessNeed = item.accessNeedENUM
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
          return {
            ...item,
            accessNeedENUM: formattedAccessNeed
          };
        } else {
          const formattedAccessNeed =
            item.accessNeedENUM.charAt(0).toUpperCase() +
            item.accessNeedENUM.slice(1).toLowerCase();
          return {
            ...item,
            accessNeedENUM: formattedAccessNeed
          };
        }
      } else {
        return {
          ...item,
          accessNeedENUM: item.accessNeedENUM
        };
      }
    });

    setAccessNeeds(formattedData);

    console.log(data);
  };

  const handleCreationClick = async (event) => {
    event.preventDefault();
    if (
      !enteredJobTitle ||
      !enteredGender ||
      dateOfBirth.day === "DD" ||
      dateOfBirth.month === "MM" ||
      dateOfBirth.year === "YYYY"
    ) {
      alert("Please enter all fields");
      // highlight fields that are left empty
    } else {
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
      addUserInfo({
        dateOfBirth: dateOfBirth.year + "-" + dateOfBirth.month + "-" + dateOfBirth.day,
        gender: enteredGender,
        jobTitle: enteredJobTitle
      });
      addUserData(tempGoals, "careerGoals");
      addUserData(tempNeeds, "accessNeeds");
      addUserData(tempConditions, "mentalHealthConditions");
      if (!isNewUser) {
        navigate("/ProfilePage");
      } else {
        navigate("/QuizPage");
      }
    }
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
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    });
    console.log(response.json());
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
        id="career-goal"
        key={careerGoal.id}
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
      ${enteredCareerGoals.includes(`${careerGoal.id}`) ? "bg-teal-500 text-white" : "bg-gray-200"}
  hover:bg-teal-600 hover:text-white
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
        id="access-need"
        key={accessNeed.id}
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
    ${enteredAccessNeeds.includes(`${accessNeed.id}`) ? "bg-teal-500 text-white" : "bg-gray-200"}
hover:bg-teal-600 hover:text-white
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
        // "block bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
        className={`relative inline-block rounded-lg border p-2 m-2 cursor-pointer
    ${
      enteredMentalHealthConditions.includes(`${mentalHealthCondition.id}`)
        ? "bg-teal-500 text-white"
        : "bg-gray-200"
    }
    hover:bg-teal-600 hover:text-white
  `}
      >
        <input
          id="mental-health-condition"
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

  useEffect(() => {
    if (!isNewUser) {
      const dateOfBirthArray = currentUser.dateOfBirth.split("-");

      setEnteredCareerGoals(
        currentUser.careerGoals.map((goal) => {
          return `${goal.id}`;
        })
      );
      setEnteredAccessNeeds(
        currentUser.accessNeeds.map((accessNeed) => {
          return `${accessNeed.id}`;
        })
      );
      setEnteredMentalHealthConditions(
        currentUser.mentalHealthConditions.map((condition) => {
          return `${condition.id}`;
        })
      );
      setDateOfBirth({
        day: `${dateOfBirthArray[2]}`,
        month: `${dateOfBirthArray[1]}`,
        year: `${dateOfBirthArray[0]}`
      });
      setEnteredGender(currentUser.gender);
      setEnteredJobTitle(currentUser.jobTitle);
    }
  }, []);

  return (
    <div>
      {currentUser && (
        <>
          <form
            className="profileCreation"
            onSubmit={(event) => {
              handleCreationClick(event);
            }}
          >
            {/* <label> Job Role/Title:</label>
                <input className="input-box" type="text" value={enteredJobRole} onChange={(e)=>{setEnteredJobRole(e.target.value)}}/>
                <br> */}
            <div className="my-4">
              <label htmlFor="career-goals" className="block font-bold">
                Career Goals
              </label>
              {careerGoals && <>{loopCareerGoals()}</>}
            </div>
            <div className="my-4">
              <label htmlFor="access-needs" className="block font-bold">
                Access Needs
              </label>
              {accessNeeds && <>{loopAccessNeeds()}</>}
            </div>
            <div className="my-4">
              <label htmlFor="mental-health-conditions" className="block font-bold">
                Mental Health Conditions
              </label>
              {mentalHealthConditions && <>{loopMentalHealthConditions()}</>}
            </div>
            <div className="my-4">
              <span className="block font-bold">Date Of Birth</span>
              <DateOfBirthListbox dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
            </div>
            <div className="my-4">
              <label htmlFor="gender" className="block font-bold">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                className="border block border-gray-300 rounded p-2 w-1/4 mb-5"
                placeholder="Add Gender Here"
                value={enteredGender}
                onChange={(e) => {
                  setEnteredGender(e.target.value);
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="job-title" className="block font-bold">
                Job Title
              </label>
              <input
                type="text"
                id="job-title"
                className="border block border-gray-300 rounded p-2 w-1/4 mb-5"
                placeholder="Add Job Title Here"
                value={enteredJobTitle}
                onChange={(e) => {
                  setEnteredJobTitle(e.target.value);
                }}
              />
            </div>
            <button
              className="block bg-teal-500 text-white py-2 px-5 rounded mt-4 mb-6 hover:bg-teal-800"
              type="submit"
              name="submit-button"
            >
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
};
export default ProfileForm;
