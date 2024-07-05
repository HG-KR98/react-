import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <h1>현재 시간: {time.toLocaleTimeString()}</h1>
    </div>
  );
}
