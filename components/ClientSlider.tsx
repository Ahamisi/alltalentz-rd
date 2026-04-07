"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import Image from "next/image";

const ClientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index: number) => {
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
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-puroclean.jpg"
              alt="Puro Clean"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-servicemaster.jpg"
              alt="Service Master"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-crdn.jpg"
              alt="CRDN"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-rs.jpg"
              alt="RS"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-servpro.jpg"
              alt="Serve Pro"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <div className="relative h-[400px]">
            <Image
              src="/clients/client-cleanslate.jpg"
              alt="Clean Slate"
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </div>
        {/* Add more carousel items as needed */}
      </Carousel>
    </div>
  );
};

export default ClientCarousel;
