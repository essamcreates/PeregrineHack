import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return (
    <div className="font-bold text-6xl opacity-50 text-left ml-5 pt-2">
      {`${hours}:${minutes}`}
    </div>
  );
};

export default DigitalClock;
