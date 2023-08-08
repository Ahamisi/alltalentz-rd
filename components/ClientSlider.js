"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

const ClientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-[15px] md:px-0">
      <Carousel
        showStatus={false}
        selectedItem={currentIndex}
        onChange={handleSlideChange}
      >
        <div>
          <img src="/clients/puro-clean.png" alt="Puro Clean " />
        </div>
        <div>
          <img src="/logo.svg" alt="Client 2" />
        </div>
        <div>
            <img src="/clients/puro-clean.png" alt="Puro Clean " />
        </div>
        {/* Add more carousel items as needed */}
      </Carousel>
    </div>
  );
};

export default ClientCarousel;
