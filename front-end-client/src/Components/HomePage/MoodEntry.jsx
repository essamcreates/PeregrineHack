import { useEffect, useState } from "react";
import Entry from "./Entry";

const MoodEntry = ({currentUser}) => {

    const [moodEntryInProgress, setMoodEntryInProgress] = useState(true);
    const [emojiEntered, setEmojiEntered] = useState(false);
    const [enteredMoodEmoji, setEnteredMoodEmoji] = useState();
    const [enteredMoodNote, setEnteredMoodNote] = useState();
    const [placeholder, setPlaceholder] = useState("");
    const [usersMoodEntries, setUsersMoodEntries] = useState();
    const moodChoices = {"😁" : "Ecstatic", "🙂" : "Happy", "😌":"Ok", "🤯":"Frazzled","🥺":"Sad", "😡":"Frustrated"}

    // need to format the users previous entries {useStates will be when moodEntryInProgress==false }
    // format day and time
    // note check that it allows for the new date to be fetched
    // check unicode is converted correctly

    const fetchUserMoodEntries = async() =>{
        console.log("here")
        //  change below to currentuser Id
        const response = await fetch(`http://localhost:8080/moodEntries/user/` + 1 );
        const data = await response.json();
        setUsersMoodEntries(data);
        console.log(data)
    }

    // useEffect(()=>{
    //     if(currentUser.id && currentUser){
    //        fetchUserMoodEntries(); 
    //     }
    // },[currentUser])

    const postMoodEntry= async(userMoodEntry)=>{
        const url = `http://localhost:8080/moodEntries/` + currentUser.id;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userMoodEntry),
        })
        fetchUserMoodEntries()
    }

    const handleMoodEntry = async () => {
        setMoodEntryInProgress(false)
        setEmojiEntered(false)
        const now = new Date();
        let template= {
            "mood": enteredMoodNote,
            "dateTime": now.toISOString(),
            "emojiUnicode" : enteredMoodEmoji.codePointAt(0).toString(16)
        }
        await postMoodEntry(template)
        setEnteredMoodEmoji()
        setEnteredMoodNote()
    }

    const handleEmojiEntry = (emoji) => {
        setPlaceholder(`Why Do You Feel ${moodChoices[emoji]} ...`);
        setEmojiEntered(true)
        setEnteredMoodEmoji(emoji)
    }

    const mappedMoodChoices = Object.entries(moodChoices).map(([emoji, description],index)=>{
            return (<div key={index}>
                <button value={emoji} class="text-center bg-transparent transition-transform transform-gpu hover:scale-105 text-6xl mt-2" onClick={(e)=>handleEmojiEntry(e.target.value)}>
                    {emoji}
                </button>
                <p>{description}</p>
            </div>)
        })

    // may need to date sort moodentries
    
    const mappedMoodEntries = ()=>{
        const entries=[]
        usersMoodEntries.map((entry, index)=>{
            entries.push(<div key={index}>
                <Entry moodChoices={moodChoices} entry={entry}/>
            </div>)
        })
        return entries;
    }

    return (
    <div class="border-2 border-slate-700 bg-amber-100 h-full rounded-lg shadow-xl">
        {!moodEntryInProgress &&(<>
            <div class="flex justify-center items-center p-3 mt-3">
                <button class="w-1/3 h-full border-2 border-yellow-900 bg-yellow-200 text-center rounded-md transition-transform transform hover:bg-yellow-300" onClick={()=>{setMoodEntryInProgress(true)}}>Create Mood Entry</button>
            </div>
            <p class="text-center">Mood Entry Log</p>
            <div class="flex items-center justify-center h-full">
            <div class="w-11/12 h-full overflow-scroll ">
                {usersMoodEntries ? (
                <>
                {mappedMoodEntries()}
                </>
                )
                : 
                <p>No Mood Entries Found</p>}
            </div></div>
            </>)}
        {moodEntryInProgress && !enteredMoodEmoji && (<>
            <div class= "flex justify-center items-center p-3">
                <p class="text-2xl mt-6">How Are You Feeling?</p></div>
            <div class= "flex justify-center items-center p-3"><div class="grid grid-cols-6 text-center gap-3">{mappedMoodChoices}</div>
            </div>
            <div class="flex justify-center items-center p-3 mt-3"><button class="w-2/5 h-full border-2 border-yellow-900 bg-yellow-200 text-center rounded-md transition-transform transform hover:bg-yellow-300" onClick={()=>{if(!usersMoodEntries){fetchUserMoodEntries()};setMoodEntryInProgress(false)}}>Skip To See Mood Log</button></div>
        </>)}
        {moodEntryInProgress && enteredMoodEmoji && emojiEntered && (<>
            <div class= "flex justify-center items-center p-2 mt-12">
                <p class="text-xl">Feel Free to Add A Note</p></div>
            <div class= "flex justify-center items-center "><textarea class="border-2 border-amber-800 bg-yellow-50 w-5/6 h-20 mt-3 p-1 rounded-lg" placeholder={placeholder} type="text" maxlength="150" value={enteredMoodNote} onChange={(e)=>setEnteredMoodNote(e.target.value)}/>
            </div>
            <div class="flex justify-center items-center p-3 mt-3"><button class="w-1/5 h-full border-2 border-yellow-900 bg-yellow-200 text-center rounded-md transition-transform transform hover:bg-yellow-300" onClick={()=>{handleMoodEntry()}}>Enter</button></div>
        </>)}
    </div>)
}
export default MoodEntry;