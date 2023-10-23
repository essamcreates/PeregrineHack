import { useEffect, useState } from "react";

const ProfileCreationBar = ({currentUser}) => {

    // to calculate progress bar: loop through user,check if they have a personality score (fetch) 
    // and whether they have filled in career goals and gender and date of birth (equal to 50% 25% 12.5% 12.5% respectively)
    // TODO: display progress bar

    const [progress, setProgress] = useState(0)

    const calculateProfileProgress=()=>{
        let count = 0;
        if(fetchPersonalityScore()){count += 50}
        if(currentUser.careerGoals){count+=25}
        if(currentUser.gender){ count+=12.5 }
        if(currentUser.dateOfBirth){ count+= 12.5 }
        setProgress(count)
       
    }

    useEffect(()=>{
    calculateProfileProgress()},[])

    const fetchPersonalityScore = async() =>{
        const response = await fetch('http://localhost:8080/personalityScores/user/'+ currentUser.id);
        if(response.status === 200){ 
            return true 
        }else{
            return false
        }
    }

    return (
        <div class="" >
          <progress class="bg-pink" max="100" value={progress}>{progress}</progress>
        </div>
    )
}
export default ProfileCreationBar;