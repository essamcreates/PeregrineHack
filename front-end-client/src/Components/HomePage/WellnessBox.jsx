import { useState, useEffect } from "react";

const WellnessBox = ({currentUser}) => {

    // const [userWellnessResources, setUserWellnessResources] = useState()
    const [userWellnessResources, setUserWellnessResources] = useState(() => {
        const storedWellnessResources = localStorage.getItem('userWellnessResources');
        return storedWellnessResources ? JSON.parse(storedWellnessResources) : null;
      });
    
    const [requestedResources, setRequestedResources] = useState(false)

    const updateUserWellnessResources = (newResources) => {
        setUserWellnessResources(newResources);
        localStorage.setItem('userWellnessResources', JSON.stringify(newResources));
      };

    useEffect(() => {
        if (!userWellnessResources) {
            setTimeout(function() {
                wellnessResourcesRequest()
            }, 300);
        }
    }, []);

    const wellnessResourcesRequest = async()=>{
        try {
            const request = "give me 3 resources with a short description and link that can help me improve my wellness, "
            // map through accessNeeds and mental health conditions
            // format an comma between 
            // add at end but not all resources should be focused on this
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: request,
            });
            // put into request, give them in a format of an object with an array link [description, link] for js. Here is my info you may want to take in my needs like ADHD and ocd, but not all resources should be focused on this
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.text();
        
            updateUserWellnessResources(data);
            console.log(data)
            // setUserWellnessResources(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
       
    }

    const resources = () => {
        const lines = userWellnessResources.split('\n');
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
        <div class="border-2 border-slate-700  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-yellow-400 via-amber-300 to-green-100 h-full rounded-lg p-1 shadow-xl">
            <h2 class="text-2xl pt-3">Wellness Resources</h2>
            {!userWellnessResources &&(<p class="border-1 border-slate-300 bg-slate-300 h-1/2 w-full text-center">Loading you tailored wellness resources <span class="animate-pulse">....</span> </p>)}
            <div>
            {userWellnessResources &&  (<>
            
            <p class="font-serif p-3 text-md mb-5 mt-3 text-center">Please click on these links to view your personalised resources, which have been tailored to suit your needs.......</p>
                <div class="flex items-center justify-center h-full">
                    <ul class="flex flex-col items-center w-full h-full ">
                    {resources()}
                    </ul>
                </div>
            </>)}
        </div>
        </div>
        </>
    )
}
export default WellnessBox;