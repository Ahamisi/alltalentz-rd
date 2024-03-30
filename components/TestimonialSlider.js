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
    <div className="w-full mx-auto">
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
          <div key={index} className="flex items-center justify-center p-8  rounded-xl mb-5">
            <div className="text-center md:text-left">
              <p className="text-lg font-normal md:text-[35px] md:leading-[62px]">{testimonial.text}</p>
              <div className=" rounded-lg text-[#303030] w-full py-4 md:mt-[36px] mx-auto flex flex-col md:flex-row  items-center px-[24px] gap-[12px]">
                <div className="bg-white rounded-full h-[60px] w-[60px]">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-[60px] w-[60px] rounded-full mx-auto"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-normal text-[20px]">{testimonial.name}</h3>
                  <p className="mt-1 font-small text-[12px]">{testimonial.designation}</p>
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
