import { useEffect, useState } from "react";

export const useTimer = () => {
  const [eventDate, setEventDate] = useState<undefined | string | null>(
    localStorage.getItem("exercise_timer"),
  );
  const [timeRemaining, setTimeRemaining] = useState<undefined | number>();

  useEffect(() => {
    if (eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          resetCountdown();
          clearInterval(countdownInterval);
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setTimeRemaining(undefined);
    }
  }, [eventDate, timeRemaining]);

  const startCountDown = (secs: number) => {
    const now = new Date().getTime();
    const newEventDate = new Date(now + secs * 1000);
    setEventDate(newEventDate.toISOString());
    if (newEventDate) {
      localStorage.setItem("exercise_timer", newEventDate.toISOString());
    }
  };

  const resetCountdown = () => {
    setEventDate(undefined);
    setTimeRemaining(undefined);
    localStorage.removeItem("exercise_timer");
  };

  return { timeRemaining, startCountDown, resetCountdown };
};
