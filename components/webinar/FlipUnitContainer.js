// components/FlipUnitContainer.js
import React from 'react';
import './FlipUnitContainer.css';

const FlipUnitContainer = ({ digit, unit }) => {
  return (
    <div className="flip-unit-container">
      <div className="upper-card">{digit}</div>
      <div className="lower-card">{digit}</div>
      <div className="flip-card first-flip">
        <div className="flip-card-inner">
          <div className="flip-card-front">{digit}</div>
          <div className="flip-card-back">{digit}</div>
        </div>
      </div>
      <div className="flip-card second-flip">
        <div className="flip-card-inner">
          <div className="flip-card-front">{digit}</div>
          <div className="flip-card-back">{digit}</div>
        </div>
      </div>
      <span className="label">{unit}</span>
    </div>
  );
};

export default FlipUnitContainer;
