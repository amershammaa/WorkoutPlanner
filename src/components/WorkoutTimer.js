import React, { useState, useEffect } from 'react';

function WorkoutTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className="workout-timer">
      <h3>Workout Timer</h3>
      <div>{formatTime(time)}</div>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

export default WorkoutTimer;