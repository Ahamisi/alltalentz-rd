// components/TestimonialCard.js
import React from "react";
import Image from "next/image";

const TestimonialCard = ({
  testimonial,
  testifyer,
}: {
  testimonial: string;
  testifyer: { avatar: string; name: string; title?: string; rating?: string | number };
}) => {
  return (
    <div className="bg-white text-black rounded-lg p-6">
      <p className="text-lg mb-6">{testimonial}</p>
      <div className="flex items-center">
        <Image
          src={testifyer.avatar}
          alt={testifyer.name}
          width={48}
          height={48}
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
