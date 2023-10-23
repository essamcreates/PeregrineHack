import { useState, useEffect } from "react";

const WellnessBox = () => {

    const [userWellnessResources, setUserWellnessResources] = useState();
    const [requestedResources, setRequestedResources] = useState(false)


    const wellnessResourcesRequest = async()=>{
        try {
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: "give me 3 resources with links that can help me improve my wellness, array format js ",
            });
            // put into request, give them in a format of an object with an array link [description, link] for js. Here is my info you may want to take in my needs like ADHD and ocd, but not all resources should be focused on this
            
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.text();
        
            // Set the response data in the component's state
            setUserWellnessResources(data);
            console.log(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
       
    }

    // need to add time delay as two requests to open ai at one time
    useEffect(()=>{
        if(requestedResources){
        wellnessResourcesRequest()}
    },[requestedResources])

    const mappedWellnessResources = () =>{
        const resources=[]
        userWellnessResources.map((resource, link)=>{
            resources.push(
            <div key={index}>
                <a src={resource} />
            </div>
            )
        })
        return resources;
    }

    return (
        <>
        <div class="border-2 border-slate-700  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-yellow-400 via-amber-300 to-green-100 h-full rounded-lg p-1 shadow-xl">
            <h2 class="text-2xl pt-3">Wellness Resources</h2>
            {!userWellnessResources && (<button class="border-1 border-slate-300 " onClick={()=>{setRequestedResources(true)}}>Click to see wellness resources</button>)}
            {userWellnessResources && requestedResources && (
                <div>
                    {userWellnessResources}
                    {/* {mappedWellnessResources()} */}
                </div>
            )}
        </div>
        </>
    )
}
export default WellnessBox;