// src/Timer.jsx
import { useState, useEffect, useRef } from 'react';

function Timer() {
  const
 [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {

    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const formatTime = (time) =>
 {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <input type="number" value={time} onChange={(e)=>{setTime(e.target.value)}} />
      <div>{formatTime(seconds)}</div>
      <div>
        {!isActive && (
          <button onClick={handleStart}>Start</button>
        )}
        {isActive && (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
