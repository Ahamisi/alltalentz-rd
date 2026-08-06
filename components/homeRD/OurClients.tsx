"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import StarTrail from "./StarTrail";

const OurClients = () => {
  const logos = [
    { src: "/v26-images/clients/purpclean-logo.png", alt: "PurpClean logo" },
    { src: "/v26-images/clients/alacrity-logo.png", alt: "Alacrity logo" },
    { src: "/v26-images/clients/servpro-logo.png", alt: "ServPro logo" },
    { src: "/v26-images/clients/cleanslate-logo.png", alt: "CleanSlate logo" },
    { src: "/v26-images/clients/wonder-logo.png", alt: "Wonder logo" },
    { src: "/v26-images/clients/restoration-specialist-logo.png", alt: "Restoration Specialist logo" },
    { src: "/v26-images/clients/signal-logo.png", alt: "Signal logo" },
    { src: "/v26-images/clients/onsite-logo.png", alt: "OnSite logo" },
    { src: "/v26-images/clients/property-doctors-logo.png", alt: "Property Doctors logo" },
  ];

  return (
    <section className="bg-white py-16 md:py-[116px] md:px-0 overflow-hidden">
      <div className="max-w-[1119.94px] mx-auto">
        {/* Section Title with star trails */}
        <div className="relative flex items-center justify-center mb-12 md:mb-20">
          {/* <StarTrail
            side="left"
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[140px] lg:w-[181.9px] h-auto pointer-events-none select-none"
          /> */}

          <h2 className="text-3xl md:text-5xl xl:text-[48px] font-medium text-center text-black leading-[67.25px] tracking-[-5%] max-w-[532px] text-[#121212]">
            Trusted by businesses across the United States
          </h2>

          {/* <StarTrail
            side="right"
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[140px] lg:w-[181.9px] h-auto pointer-events-none select-none"
          /> */}
        </div>
      </div>

      {/* Logos marquee */}
      <Marquee autoFill pauseOnHover speed={40} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="group flex justify-center items-center mx-8 md:mx-12">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={60}
              className="object-contain w-[140px] md:w-[180px] h-auto grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        ))}
      </Marquee>

      <Image
        src="/v26-images/home/special-divder.png"
        alt=""
        width={1440}
        height={100}
        className="w-full h-auto mt-16 md:mt-20 pointer-events-none select-none"
      />
    </section>
  );
};

export default OurClients;
