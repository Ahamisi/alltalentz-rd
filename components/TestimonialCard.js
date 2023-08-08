// components/TestimonialCard.js
import React from 'react';

const TestimonialCard = ({ testimonial, testifyer }) => {
  return (
    <div className="bg-white text-black rounded-lg p-6">
      <p className="text-lg mb-6">{testimonial}</p>
      <div className="flex items-center">
        <img
          src={testifyer.avatar}
          alt={testifyer.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{testifyer.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">★</span>
            <span>{testifyer.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
