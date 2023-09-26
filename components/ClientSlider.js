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
        autoPlay={true}
      >
        <div>
          <img src="/clients/client-puroclean.jpg" alt="Puro Clean " />
        </div>
        <div>
            <img src="/clients/client-servicemaster.jpg" alt="Service Master " />
        </div>
        <div>
            <img src="/clients/client-crdn.jpg" alt="CRDN " />
        </div>
        <div>
            <img src="/clients/client-rs.jpg" alt="RS " />
        </div>
        <div>
            <img src="/clients/client-servpro.jpg" alt="Serve Pro " />
        </div>
        <div>
            <img src="/clients/client-cleanslate.jpg" alt="Clean Slate " />
        </div>
        {/* Add more carousel items as needed */}
      </Carousel>
    </div>
  );
};

export default ClientCarousel;
