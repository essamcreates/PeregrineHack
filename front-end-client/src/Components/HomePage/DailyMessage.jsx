import { useState, useEffect } from "react";

const DailyMessage = () => {
  const [message, setMessage] = useState();

  const fetchMessage = async () => {
    const response = await fetch(
      "http://localhost:8080/motivationMessage/random"
    );
    const data = await response.json();
    setMessage(data);
    console.log(data);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  // need to keep a track so keeps the same daily messsage on each day

  return (
    // <div class=" h-full rounded-lg shadow-xl bg-white text-black">
    <div>
      {/* <h2 class="text-xl pt-3">Pick Me Up </h2> */}
      <div class="text-center">
        {message && (
          <p class="font-bold text-4xl opacity-50 text-left ml-5 pt-2">
            {message.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default DailyMessage;
