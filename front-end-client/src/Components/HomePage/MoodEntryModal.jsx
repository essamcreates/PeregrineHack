const MoodEntryModal = ({mappedMoodEntries, setOpenModal}) =>{

    return (
        // makes the modal to z-index (ie to front of everything behind)
        <div class="fixed z-10 inset-0">
        {/* Is declaring where modal contet box is*/}
          <div class="flex items-center justify-center min-h-screen p-4 text-center ">
            <div class="fixed inset-0 transition-opacity-50">
            {/* defines the colour and opacity of blurring cover around rest of screen(excludes modal)*/}
            <div class="absolute inset-0 bg-teal-100 opacity-90"></div>
            </div>
            <div class="inline-block align-bottom bg-teal-50 rounded-lg text-left overflow-scroll h-1/5 shadow-xl w-1/2 z-20 p-2">
              <div><p class="text-3xl underline font-mono text-center text-black z-20 ">Mood Entry Log</p></div>
              <div class="overflow-scroll h-full w-full max-h-[600px]">{mappedMoodEntries()}</div>
              <div class="flex items-center justify-center">
                <button
                    onClick={() => { setOpenModal(false); console.log("openModal"); }}
                    class="w-1/6 text-center p-1 text-xl rounded-md shadow-sm bg-teal-200 font-medium text-white hover:bg-slate-300 relative z-20">
                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MoodEntryModal;