"use client"
import { useState } from "react";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "All Talentz is a fantastic company! I have truly enjoyed working with Samuel Mbah, he is an itegral member of my team at PuroClean of Bluffdale. I appreciate how eager Samuel is to learn and to take on any task I ask of him. I know I can always depend on him to deliver.Thank you Samuel for being so amazing and helpful",
      name: 'Bru Empey',
      company: 'Puroclean of Bluffdale Utah USA',
      logo: '/clients/puroclean-icon.png'
    },

    {
      text: "I had the opportunity to work with Tobiloba Oyeludw with All Talentz. Couldn't be a happier and a positive person to work together. She follows up promptly with job tasks and assignments",
      name: 'Jane Smith',
      company: 'Puroclean Summerlin',
      logo: '/clients/puroclean-icon.png'
    },

    {
      text: "My estimator, Joshua has been amazing. He is very thorough and his follow up skills are second to none. He is now part of the family and we are glad we have him",
      name: 'Sammy Shrem',
      company: '',
      logo: '/clients/puroclean-icon.png'
    },
    {
      text: "Joel Ozue has been a great asset to the company. He handles all our SEO and Google. He has always been very responsive and willing to help however is needed. We appreciate all the hardwork and dedication he puts into PuroClean of Reston",
      name: "Whitney Young",
      company: "Puroclean of Reston",
      logo: '/clients/puroclean-icon.png'
    },
    {
      text: "Macauley Maduwuba is an outstanding member of our team and works quickly and efficiently whenever we need his assistance. PuroClean Charlotte is grateful for his help.",
      name: "Susan David",
      company: "Puroclean Charlotte",
      logo: '/clients/puroclean-icon.png'
    }
    // Add more testimonials...
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full">
      {/* Testimonial Content */}
      <div className="flex items-start gap-8">
        {/* Company Logo */}
        <div className="w-[80px] h-[80px] rounded-full border border-gray-200 flex-shrink-0 p-4 hidden md:block">
          <img 
            src={testimonials[currentIndex].logo} 
            alt="Company Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Testimonial Text */}
        <div className="flex-grow">
          <p className="text-lg lg:text-[32px] leading-[1.4] mb-8 text-black font-light">
            {testimonials[currentIndex].text}
          </p>
          <div>
            <h4 className="text-2xl font-semibold mb-2 text-black">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-gray-500">
              {testimonials[currentIndex].company}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12 justify-center">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-[#E5B47B] hover:bg-[#E5B47B]/90 flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-[#E5B47B] hover:bg-[#E5B47B]/90 flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
