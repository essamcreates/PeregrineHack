import { useState, useEffect } from "react";

const ResourcesBox = () => {

    const [userResources, setUserResources] = useState();
    const [requestedCareerResources , setRequestedCareerResources] = useState(false);


    const resourcesRequest = async()=>{
        try {
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: "give me 3 resources with links that can help me improve at work , give them in a format of an object with an array link [description, link] for js. Here is my info career goals: leadership and you may want to take in my needs like ADHD, but not all resources should be focused on this",
            });
            
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.text();
        
            // Set the response data in the component's state
            setUserResources(data);
            console.log(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
       
    }

    useEffect(()=>{
        if(requestedCareerResources){
        resourcesRequest()}
    },[requestedCareerResources])

    return (
        <>
        <div class="border-2 border-slate-700 bg-blue-50 h-full rounded-lg p-1 shadow-xl">
            <h2 class="text-2xl pt-3">My Resources</h2>
            {!userResources && (<button class="border-1 border-grey-200" onClick={()=>{setRequestedCareerResources(true)}}>Click to see your resources</button>)}
            {userResources && requestedCareerResources && (
                <div>
                    {userResources}
                </div>
            )}
        </div>
        </>
    )
}
export default ResourcesBox;