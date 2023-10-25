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
            // setTimeout(function() {
                resourcesRequest()
            // }, 1500);
        }
    }, []);

    const formatUserInfo = () => {
        if(!currentUser.accessNeeds && !currentUser.careerGoals){
          return null;}
        let needs = "and you may want to take account their access needs "
        currentUser.accessNeeds.forEach((need)=>{
            needs += need.accessNeedENUM + ","
          })
        let goals = "their career goals are "
        currentUser.careerGoals.forEach((careerGoal)=>{
            goals += careerGoal.goal + ","
          })
        if(currentUser.careerGoals && currentUser.accessNeeds){
            return goals + needs + " but not all resources shouldn't solely focus on this"
        }

      }

    const resourcesRequest = async()=>{
        try {
            const additionalUserInfo = formatUserInfo();
            const request = "You are acting as a career coach for an employee at work, give a 3 pieces of advice / tips or method or a book recommendation that can help improve their career," + 
                                additionalUserInfo + "separate by line ensure format like 'title | description' and number each (response max 60 words)"
            const url = `http://localhost:8080/openAI`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: request,
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


    // const careerResources = () => {
    //     const lines = userResources.split('\n');
    //     const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude 
    //     const resourceList=[]

    //     linesExcluded.map((line, index) => {
    //       const parts = line.split(': ');
    //       if (parts.length === 2) {
    //         const description = parts[0].trim();
    //         let link = parts[1].trim();
    //         if (!link.startsWith('http')) {
    //             link = 'https://' + link;
    //         }
    //         // is the link and the box it is in , taget and rel allow for the link to open in a new tab
    //         resourceList.push(<li class="font-serif w-3/4 m-3 text-center bg-yellow-100 text-black hover:bg-green-100 p-4 rounded-lg shadow-inner shadow-md" key={index} >
    //                 <a  href={link} target="_blank" rel="noopener noreferrer">
    //                     {description}
    //                 </a>
    //             </li>
    //             );
    //       }
    //     });
    //     return resourceList;
    //   };

    const careerResources = () => {
        const lines = userResources.split('\n');
        const linesExcluded = lines.slice(2); // the ai returns two lines before so will exclude
        const resourceList=[]

        linesExcluded.map((line) => {
          const parts = line.split('| ');
          if (parts.length === 2) {
            const title = parts[0].trim().substring(2);
            let description = parts[1].trim();

          resourceList.push(
            <li class="w-5/6 m-3 text-center rounded-lg shadow-md " >
              <span class="text-xl">
                    {title}
                </span>
              <br/>
              {description}
            </li>
          )}
        });
        return resourceList;
      };

    return (
        <>
        <div class="h-full rounded-lg p-1 shadow-xl text-white">
            <h2 class="text-2xl pt-3 mt-3">My Career Resources</h2>
            {!userResources && (<div class="flex items-center justiy-center mt-6"><p class="border-1 border-grey-200 bg-neutral-50 h-1/2 w-full m-3 text-center text-2xl rounded-lg">Loading your tailored career resources  <span class="animate-pulse">....</span>  </p></div>)}
            <div>
                {userResources && (<>
                    <div class="flex items-center justify-center h-full mt-3">
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