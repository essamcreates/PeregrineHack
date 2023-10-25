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
      setTimeout(function () {
        wellnessResourcesRequest();
      }, 300);
    }
  }, []);

  const wellnessResourcesRequest = async () => {
    try {
      const request =
        "(note im in uk) give me 3 resources with a title and link (that works) that can help me improve my wellness,example -. use mindtools to help improve your mental health : www.mindtools.com ";
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

  const resources = () => {
    const lines = userWellnessResources.split("\n");
    const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude
    const resourceList = [];

    linesExcluded.map((line, index) => {
      const parts = line.split(": ");
      if (parts.length === 2) {
        const description = parts[0].trim();
        let link = parts[1].trim();
        if (!link.startsWith("http")) {
          link = "https://" + link;
        }
        // is the link and the box it is in , taget and rel allow for the link to open in a new tab
        resourceList.push(
          <li
            class="font-serif w-3/4 m-3 text-center bg-yellow-100 text-black hover:bg-green-100 p-4 rounded-lg shadow-inner shadow-md"
            key={index}
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              {description}
            </a>
          </li>
        );
      }
    });
    console.log(resourceList[1]);
    return resourceList;
  };

  return (
    <>
      <div class="bg-white border-2 border-gray-50  h-full rounded-lg p-1 shadow-xl">
        <h2 class="text-2xl pt-3 mt-3">My Wellness Resources</h2>
        {!userWellnessResources && (
          <div class="flex items-center justiy-center mt-6">
            <p class="border-1 border-slate-300 h-1/2 w-full bg-yellow-100 m-3 text-center text-2xl rounded-lg">
              Loading you tailored wellness resources <span class="animate-pulse">....</span>{" "}
            </p>
          </div>
        )}
        <div>
          {userWellnessResources && (
            <>
              <div class="flex items-center justify-center h-full mt-3">
                <ul class="flex flex-col items-center w-full h-full ">{resources()}</ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default WellnessBox;
