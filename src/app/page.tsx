"use client";
import { useEffect, useState, useRef } from "react";

interface Timer {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const isTimerOn = useRef(false);
  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const TIMER = useRef<NodeJS.Timeout>(null);

  const startTimer = () => {
    if(!isTimerOn.current){
      TIMER.current = setInterval(() => {
      setTimer((prev) => {
        let { seconds, minutes, hours } = prev;
        seconds += 1;
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes >= 60) {
          hours += 1;
        }
        return { seconds, minutes, hours };
      });
      }, 1000);
      isTimerOn.current = true
    }
  };
  const pauseTimer = () => {
    clearInterval(TIMER.current!);
    isTimerOn.current = false;
  };

  const resetTimer = () => {
    clearInterval(TIMER.current!);
    isTimerOn.current = false;
    setTimer({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    return () => {
      clearInterval(TIMER.current!);
      isTimerOn.current = false;
    }
  }, []);

  return (
    <div className="m-auto w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          {timer.hours.toString().padStart(2, "0")} :{" "}
          {timer.minutes.toString().padStart(2, "0")} :{" "}
          {timer.seconds.toString().padStart(2, "0")}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="px-5 border rounded cursor-pointer hover:bg-green-500 hover:text-white"
            onClick={startTimer}
          >
            Start
          </button>
          <button
            className="px-5 border rounded cursor-pointer hover:bg-yellow-500 hover:text-white"
            onClick={pauseTimer}
          >
            Pause
          </button>
          <button
            className="px-5 border rounded cursor-pointer hover:bg-red-500 hover:text-white"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
