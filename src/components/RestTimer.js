import React, { useState, useEffect } from 'react';

function RestTimer() {
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setTime(60);
    setIsActive(false);
  };

  return (
    <div className="rest-timer">
      <h3>Rest Timer</h3>
      <div>{formatTime(time)}</div>
      <button onClick={startTimer} disabled={isActive}>Start Rest</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

export default RestTimer;