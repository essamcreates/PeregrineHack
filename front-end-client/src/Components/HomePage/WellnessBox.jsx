import { useState, useEffect } from "react";

const WellnessBox = ({ currentUser }) => {
  // const [userWellnessResources, setUserWellnessResources] = useState()
  const [userWellnessResources, setUserWellnessResources] = useState(() => {
    const storedWellnessResources = localStorage.getItem("userWellnessResources");
    return storedWellnessResources ? JSON.parse(storedWellnessResources) : null;
  });

  const updateUserWellnessResources = (newResources) => {
    setUserWellnessResources(newResources);
    localStorage.setItem("userWellnessResources", JSON.stringify(newResources));
  };

  useEffect(() => {
    if (!userWellnessResources) {
      // setTimeout(function () {
      wellnessResourcesRequest();
      // }, 300);
    }
  }, []);

  const formatUserInfo = () => {
    if (!currentUser.mentalHealthConditions) {
      return null;
    } else {
      let conditions = " you may want to take account their mental health conditions ";
      currentUser.mentalHealthConditions.forEach((condition) => {
        conditions += condition.mentalHealthCondition + ",";
      });
      return conditions + " but not all resources should focus on this";
    }
  };

  const wellnessResourcesRequest = async () => {
    try {
      const additionalUserInfo = formatUserInfo();
      const request =
        "You are acting as a help coach for an employee at work, give a 3 pieces of advice / tips or one book recommendation that can help me improve their wellness," +
        additionalUserInfo +
        " seperate by line ensure format like 'title | description' and number each (response max 50 words)";
      // const request =
      //   "(note im in uk) give me 3 resources with a title and link (that works) that can help me improve my wellness,example -. use mindtools to help improve your mental health : www.mindtools.com ";
      const url = `http://localhost:8080/openAI`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: request
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();

      updateUserWellnessResources(data);
      console.log(data);
      // setUserWellnessResources(data)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // const resources = () => {
  //   const lines = userWellnessResources.split("\n");
  //   const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude
  //   const resourceList = [];

  //   linesExcluded.map((line, index) => {
  //     const parts = line.split(": ");
  //     if (parts.length === 2) {
  //       const description = parts[0].trim();
  //       let link = parts[1].trim();
  //       if (!link.startsWith("http")) {
  //         link = "https://" + link;
  //       }
  //       // is the link and the box it is in , taget and rel allow for the link to open in a new tab
  //       resourceList.push(
  //         <li
  //           class="font-serif w-3/4 m-3 text-center bg-yellow-100 text-black hover:bg-green-100 p-4 rounded-lg shadow-inner shadow-md"
  //           key={index}
  //         >
  //           <a href={link} target="_blank" rel="noopener noreferrer">
  //             {description}
  //           </a>
  //         </li>
  //       );
  //     }
  //   });
  //   console.log(resourceList[1]);
  //   return resourceList;
  // };

  const resources = () => {
    const lines = userWellnessResources.split("\n");
    const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude
    const resourceList = [];

    linesExcluded.map((line) => {
      const parts = line.split("| ");
      if (parts.length === 2) {
        const title = parts[0].trim().substring(2);
        let description = parts[1].trim();

        resourceList.push(
          <li class="m-3 ml-5 text-left rounded-lg">
            <span class="text-xl">{title}</span>
            <br />
            {description}
          </li>
        );
      }
    });
    console.log(resourceList[1]);
    return resourceList;
  };

  return (
    <>
      <div class="h-full rounded-lg p-1 shadow-xl text-white">
        <h2 class="text-2xl pt-1 mt-2 text-center"><b>My Wellness Resources</b></h2>
        {!userWellnessResources && (
          <div class="flex items-center justiy-center mt-6">
            <p class="border-1 border-slate-300 h-1/2 w-full bg-gray-500 m-3 text-center text-2xl rounded-lg">
              Loading your tailored wellness resources <span class="animate-pulse">....</span>{" "}
            </p>
          </div>
        )}
        <div>
          {userWellnessResources && (
            <>
              <div class="flex items-center justify-center h-full mt-3 pb-5">
                <ul class="flex flex-col items-left w-5/6 h-full bg-teal-700 rounded mb-3">{resources()}</ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default WellnessBox;
