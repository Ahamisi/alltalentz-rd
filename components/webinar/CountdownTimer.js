// components/CountdownTimer.js
import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 / 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const renderFlipUnit = (unit, label) => (
    <div className="flip-unit-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">{unit}</div>
          <div className="flip-card-back">{unit}</div>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  );

  return (
    <div className="countdown-timer">
      {renderFlipUnit(timeLeft.days, 'Days')}
      {renderFlipUnit(timeLeft.hours, 'Hours')}
      {renderFlipUnit(timeLeft.minutes, 'Minutes')}
      {renderFlipUnit(timeLeft.seconds, 'Seconds')}
    </div>
  );
};

export default CountdownTimer;
