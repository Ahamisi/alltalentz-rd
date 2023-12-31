"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

const TestimonialSlider = ({ }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

    // Sample testimonial data (replace this with your actual data)
    const testimonials = [
      {
        text: 'All Talentz is a fantastic company! I have truly enjoyed working with Samuel Mbah, he is an itegral member of my team at PuroClean of Bluffdale. I appreciate how eager Samuel is to learn and to take on any task I ask of him. I know I can always depend on him to deliver.Thank you Samuel for being so amazing and helpful',
          name: 'Bre Empey',
          avatar: '/clients/puroclean-icon.png',
          rating: 4.5,
          designation: "Puroclean of Bluffdale Utah USA"
      },
      {
        text: "I had the opportunity to work with Tobiloba Oyeludw with All Talentz. Couldn't be a happier and a positive person to work together. She follows up promptly with job tasks and assignments",
          name: 'Jane Smith',
          avatar: '/clients/puroclean-icon.png',
          rating: 5.0,
          designation: "Puroclean Summerlin"

      },
      {
        text: 'My estimator, Joshua has been amazing. He is very thorough and his follow up skills are second to none. He is now part of the family and we are glad we have him',
          name: 'Sammy Shrem',
          avatar: '/clients/puroclean-icon.png',
          rating: 4.5,
          designation: ""

      },
      {
          text: 'Joel Ozue has been a great asset to the company. He handles all our SEO and Google. He has always been very responsive and willing to help however is needed. We appreciate all the hardwork and dedication he puts into PuroClean of Reston',
          name: 'Whitney Young',
          avatar: '/clients/puroclean-icon.png',
          rating: 5.0,
          designation: "Puroclean of Reston"

      },
      {
        text: 'Macauley Maduwuba is an outstanding member of our team and works quickly and efficiently whenever we need his assistance. PuroClean Charlotte is grateful for his help.',
        name: 'Susan David',
        avatar: '/clients/puroclean-icon.png',
        rating: 5.0,
        designation: "Puroclean of Charlotte"

    },
      // Add more testimonial items here...
    ];

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel
        showThumbs={false}
        showStatus={false}
        selectedItem={currentIndex}
        onChange={handleSlideChange}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button onClick={onClickHandler} className="arrow prev">
              <span className="text-lg"></span> {/* Left arrow */}
            </button>
          )
        }


        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button onClick={onClickHandler} className="arrow next">
              <span className="text-lg"></span> {/* Right arrow */}
            </button>
          )
        }
      
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-center justify-center p-8 bg-white rounded-xl mb-5">
            <div className="text-center">
              <p className="text-lg font-normal">{testimonial.text}</p>
              <div className=" rounded-lg mt-6 bg-secondary text-[#303030] w-full py-4 md:w-[80%] mx-auto flex flex-col md:flex-row  items-center px-[24px] gap-[12px]">
                <div className="bg-white rounded-full h-[60px] w-[60px]">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-[60px] w-[60px] rounded-full mx-auto"
                  />
                </div>
                <div>
                  <h3 className="font-normal text-[20px]">{testimonial.name}</h3>
                  <p className="mt-1 font-small text-[12px]">{testimonial.designation}</p>
                </div>
                <div className="stars">
                <svg width="73" height="16" viewBox="0 0 73 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.38432 0.8396L9.01721 5.86512L14.3014 5.86512L10.0264 8.97106L11.6593 13.9966L7.38432 10.8906L3.10936 13.9966L4.74225 8.97106L0.467294 5.86512L5.75143 5.86512L7.38432 0.8396Z" fill="#373435"/>
                  <path d="M21.9302 0.8396L23.5631 5.86512L28.8473 5.86512L24.5723 8.97106L26.2052 13.9966L21.9302 10.8906L17.6553 13.9966L19.2882 8.97106L15.0132 5.86512L20.2973 5.86512L21.9302 0.8396Z" fill="#373435"/>
                  <path d="M36.4761 0.8396L38.109 5.86512L43.3931 5.86512L39.1182 8.97106L40.7511 13.9966L36.4761 10.8906L32.2012 13.9966L33.834 8.97106L29.5591 5.86512L34.8432 5.86512L36.4761 0.8396Z" fill="#373435"/>
                  <path d="M51.0225 0.8396L52.6554 5.86512L57.9395 5.86512L53.6646 8.97106L55.2975 13.9966L51.0225 10.8906L46.7475 13.9966L48.3804 8.97106L44.1055 5.86512L49.3896 5.86512L51.0225 0.8396Z" fill="#373435"/>
                  <path d="M65.5684 0.8396L67.2013 5.86512L72.4854 5.86512L68.2105 8.97106L69.8434 13.9966L65.5684 10.8906L61.2934 13.9966L62.9263 8.97106L58.6514 5.86512L63.9355 5.86512L65.5684 0.8396Z" fill="#373435"/>
                </svg>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialSlider;
