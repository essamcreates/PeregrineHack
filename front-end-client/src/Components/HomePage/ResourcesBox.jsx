import { useState, useEffect } from "react";

const ResourcesBox = ({currentUser}) => {

    const [userResources, setUserResources] = useState(() => {
        const userResources = localStorage.getItem('userResources');
        return userResources ? JSON.parse(userResources) : null;
      });
    const [requestedCareerResources , setRequestedCareerResources] = useState(false);

     const updateUserResources = (newResources) => {
        setUserResources(newResources);
        localStorage.setItem('userResources', JSON.stringify(newResources));
    };

    // set wellness resources to null in local storage useState when 
    useEffect(() => {
        if(!userResources) {
            setTimeout(function() {
                resourcesRequest()
            }, 1500);
        }
    }, []);

    const resourcesRequest = async()=>{
        try {
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: "give me 3 resources with a short description and link that can help me improve at work. Here is my info career goals: leadership and you may want to take in my needs like ADHD, but not all resources should be focused on this ",
            });
            
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.text();
        
            // Set the response data in the component's state
            // setUserResources(data);
            updateUserResources(data)
            console.log(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
       
    }


    const careerResources = () => {
        const lines = userResources.split('\n');
        const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude 
        const resourceList=[]

        linesExcluded.map((line, index) => {
          const parts = line.split(': ');
          if (parts.length === 2) {
            const description = parts[0].trim();
            const link = parts[1].trim();
            // is the link and the box it is in , taget and rel allow for the link to open in a new tab
            resourceList.push(<li class="font-serif w-3/4 m-3 text-center border-2 border-teal-200 bg-neutral-50 text-black hover:bg-slate-300 p-4 rounded-lg shadow-lg" key={index} >
                    <a  href={link}  target="_blank" rel="noopener noreferrer">
                        {description}
                    </a>
                </li>
                );
          }
        });
        return resourceList;
      };

    return (
        <>
        <div class="border-2 border-slate-700 bg-blue-50 h-full rounded-lg p-1 shadow-xl">
            <h2 class="text-2xl pt-3">Career Resources</h2>
            {!userResources && (<div class="flex items-center justiy-center mt-6"><p class="border-1 border-grey-200 bg-teal-100 h-1/2 w-full m-3 text-center text-2xl rounded-lg">Loading your tailored resources  <span class="animate-pulse">....</span>  </p></div>)}
            <div>
                {userResources && (<>
                    <p class="font-serif p-3 text-md mb-5 mt-3 text-center">Please click on these links to view your personalised resources, which have been tailored to suit your needs.......</p>
                    <div class="flex items-center justify-center h-full">
                        <ul class="flex flex-col items-center w-full h-full ">
                        {careerResources()}
                        </ul>
                    </div>
                </>)}
            </div>
        </div>
        </>
    )
}
export default ResourcesBox;