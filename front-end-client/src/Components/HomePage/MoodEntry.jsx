import { useState } from "react";
import Entry from "./Entry";
import ZoomOutMapTwoToneIcon from "@mui/icons-material/ZoomOutMapTwoTone";
import MoodEntryModal from "./MoodEntryModal";

const MoodEntry = ({ currentUser }) => {
  const [moodEntryInProgress, setMoodEntryInProgress] = useState(true);
  const [emojiEntered, setEmojiEntered] = useState(false);
  const [enteredMoodEmoji, setEnteredMoodEmoji] = useState();
  const [enteredMoodNote, setEnteredMoodNote] = useState();
  const [placeholder, setPlaceholder] = useState("");
  const [usersMoodEntries, setUsersMoodEntries] = useState();
  const [openModal, setOpenModal] = useState(false);
  const moodChoices = {
    "😁": "Ecstatic",
    "🙂": "Happy",
    "😌": "Ok",
    "🤯": "Frazzled",
    "🥺": "Sad",
    "😡": "Frustrated"
  };

  // fetches all of users mood entries to be displayed in the mood entry log
  const fetchUserMoodEntries = async () => {
    const response = await fetch(`http://localhost:8080/moodEntries/user/` + currentUser.id);
    const data = await response.json();
    setUsersMoodEntries(data);
    console.log(data);
  };

  const postMoodEntry = async (userMoodEntry) => {
    const url = `http://localhost:8080/moodEntries/` + currentUser.id;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMoodEntry)
    });
    fetchUserMoodEntries();
  };

  const handleMoodEntry = async () => {
    setMoodEntryInProgress(false);
    setEmojiEntered(false);
    const now = new Date();
    let template = {
      mood: enteredMoodNote,
      dateTime: now.toISOString(),
      emojiUnicode: enteredMoodEmoji.codePointAt(0).toString(16)
    };
    // note that the emoji is saved as unicodeHex
    await postMoodEntry(template);
    setEnteredMoodEmoji();
    setEnteredMoodNote();
  };

  const handleEmojiEntry = (emoji) => {
    //set placeholder for text area when entering a note for the mood entry
    setPlaceholder(`Why Do You Feel ${moodChoices[emoji]} ...`);
    setEmojiEntered(true);
    setEnteredMoodEmoji(emoji);
  };

  const mappedMoodChoices = Object.entries(moodChoices).map(([emoji, description], index) => {
    return (
      <div key={index}>
        <button
          value={emoji}
          class="text-center bg-transparent transition-transform hover:scale-105 text-6xl mt-2"
          onClick={(e) => handleEmojiEntry(e.target.value)}
        >
          {emoji}
        </button>
        <p>{description}</p>
      </div>
    );
  });

  const mappedMoodEntries = () => {
    const entries = [];
    usersMoodEntries.map((entry, index) => {
      entries.push(
        <div key={index}>
          <Entry entry={entry} />
        </div>
      );
    });
    return entries.reverse();
  };

  return (
    <div class="h-full rounded-lg shadow-xl text-white">
      {/* mood entry log */}
      {!moodEntryInProgress && (
        <>
          <div class="grid grid-cols-5">
            <div><div class="flex justify-center items-center p-3 mt-1">
                <button
                  class="rounded-md p-2 flex justify-start bg-teal-500 hover:scale-110"
                  onClick={() => {
                    setMoodEntryInProgress(true);
                  }}
                >
                  Create Mood Entry
                </button>
              </div></div>
            <div class="col-span-3">
              <p class="text-center font-mono text-xl underline pb-3 text-black">Mood Entry Log</p>
              <div class="flex items-center justify-center h-2/3">
              <div class="overflow-scroll h-full w-11/12 max-h-[500px]">
                {usersMoodEntries ? <>{mappedMoodEntries()}</> : <p>No Mood Entries Found</p>}
              </div>
            </div>
            </div>
            <div class="text-end m-3">
              {usersMoodEntries && (
                <ZoomOutMapTwoToneIcon
                  style={{ fontSize: "35px", color:"black" }}onClick={() => {
                    setOpenModal(true);
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}

      {moodEntryInProgress && !enteredMoodEmoji && (
        <>
         <p class="text-2xl mt-5 justify-start ml-4 text-black">How Are You Feeling?</p>
         <div class="flex justify-end p-3">
  <div class="w-2/3">
  
    <div class="grid grid-cols-6 text-center gap-3">{mappedMoodChoices}</div>
  </div>
  <button
    class="w-1/6 h-full text-md text-white py-0.25 bg-teal-500 text-center p-2 rounded transition-colors duration-500 inline
    hover:bg-yellow-200
    hover:shadow-md
    hover:scale-110 mt-[-3rem]"
    onClick={() => {
      if (!usersMoodEntries) {
        fetchUserMoodEntries();
      }
      setMoodEntryInProgress(false);
    }}
  >
              Skip To Mood Log
            </button>
          </div>
        </>
      )}
      {moodEntryInProgress && enteredMoodEmoji && emojiEntered && (
        <>
          <div class="flex justify-center items-center">
            <p class="text-xl p-2 mt-12">Feel Free to Add A Note</p>
          </div>
          <div class="flex justify-center items-center ">
            <textarea
              class="border-2 border-teal-800 text-slate-800 bg-white w-5/6 h-20 mt-3 p-1 rounded-lg"
              placeholder={placeholder}
              type="text"
              maxlength="150"
              value={enteredMoodNote}
              onChange={(e) => setEnteredMoodNote(e.target.value)}
            />
          </div>
          <div class="flex justify-center items-center p-3 mt-3">
            <button
              class="w-1/5 h-full bg-teal-600 text-center rounded-md transition-transform transform hover:bg-teal-800"
              onClick={() => {
                handleMoodEntry();
              }}
            >
              Enter
            </button>
          </div>
        </>
      )}
      {openModal && (
        <div>
          <MoodEntryModal mappedMoodEntries={mappedMoodEntries} setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
};
export default MoodEntry;
