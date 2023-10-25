const MoodEntryModal = ({mappedMoodEntries, setOpenModal}) =>{

    return (
        // makes the modal to z-index (ie to front of everything behind)
        <div class="fixed z-10 inset-0">
        {/* Is declaring where modal contet box is*/}
            <div class="flex items-center justify-center min-h-screen p-4 text-center ">
                <div class="fixed inset-0 transition-opacity-50">
                    {/* defines the colour and opacity of blurring cover around rest of screen(excludes modal)*/}
                    <div class="absolute inset-0 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100 opacity-100"></div>
                </div>

                {/* Is the actual modal box itself*/}
                <div class="inline-block align-bottom bg-neutral-100 rounded-lg text-left overflow-scroll h-1/5  shadow-xl w-1/2 z-20 p-2">

                    {/* Title */}
                    <div>
                        <p class="text-3xl font-mono text-center text-slate-800 opacity-60 z-20 mt-5">Mood Entry Log</p>
                    </div>

                    {/* box for mood entries includes a scroll */}
                    <div class="overflow-scroll h-full w-full max-h-[500px]">
                        {/* style for mood entries is in Entry.jsx */}
                        {mappedMoodEntries()}
                    </div>

                    {/* Close button div centers button and class in button concerns the button itself*/}
                    <div class="flex items-center justify-center">
                        <button onClick={() => { setOpenModal(false); console.log("openModal"); }}
                            class="w-1/6 text-center p-1 text-xl rounded-md shadow-sm bg-emerald-400 font-medium text-white hover:bg-slate-300 relative mt-2 z-20">
                            Close
                        </button>
                    </div>

                </div>

            </div>
        </div>
      );
}

export default MoodEntryModal;