import { useEffect, useState } from "react";

/**
 * @file DateTime.js
 * @description * Custom hook to get the real-time date and time.
 * Returns a Date object that updates every second.
 * @author SophiaJustin
 */

const useRealTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentDate;
};

export default useRealTime;
