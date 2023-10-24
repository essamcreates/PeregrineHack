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
        if (!currentUser) {
          setUserWellnessResources(null);
          console.log("resoources set to null")
        }
      }, [currentUser]);

    const wellnessResourcesRequest = async()=>{
        try {
            const request = "give me 3 resources with links that can help me improve my wellness, "
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

    // need to add time delay as two requests to open ai at one time
    useEffect(()=>{
        if(requestedResources && !userWellnessResources){
        wellnessResourcesRequest()}
    },[requestedResources,userWellnessResources])

    const resources = () => {
        const lines = userWellnessResources.split('\n');
        const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude 
        const resourceList=[]

        linesExcluded.map((line, index) => {
          const parts = line.split(': ');
          if (parts.length === 2) {
            const description = parts[0].trim();
            const link = parts[1].trim();
            resourceList.push(<><a key={index} href={link}>
                {description}
            </a><br/></>);
          }
        });
        return resourceList;
      };

    return (
        <>
        <div class="border-2 border-slate-700  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-yellow-400 via-amber-300 to-green-100 h-full rounded-lg p-1 shadow-xl">
            <h2 class="text-2xl pt-3">Wellness Resources</h2>
            {!userWellnessResources || !requestedResources &&(<button class="border-1 border-slate-300 " onClick={()=>{setRequestedResources(true)}}>Click to see wellness resources</button>)}
            {userWellnessResources && requestedResources && (
               <div>
               {resources()}
             </div>
            )}
        </div>
        </>
    )
}
export default WellnessBox;