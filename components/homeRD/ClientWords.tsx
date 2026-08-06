"use client";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import QuoteIcon from "./QuoteIcon";

interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  location?: string;
  companyLogo?: string;
  image?: string;
  thankYou?: string;
}

const ClientWords = ({
  title = "What Our Clients Say",
  description = "Hear directly from our clients about their experiences with us",
  testimonials = [] as Testimonial[],
  theme = "light" as "light" | "dark",
}: {
  title?: ReactNode;
  description?: string;
  testimonials?: Testimonial[];
  theme?: "light" | "dark";
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 9;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  // Theme-based styles
  const themeStyles = {
    light: {
      background: "bg-white",
      cardBg: "bg-white border border-[#EDEDED]",
      text: "text-[#5B5B5B]",
      heading: "text-[#1E1E1E]",
      quoteIcon: "text-[#F99621]/50",
      avatar: "border border-gray-200 bg-white",
    },
    dark: {
      background: "bg-[#131313]",
      cardBg: "bg-[#1E1E1E] border border-[#2A2A2A]",
      text: "text-gray-300",
      heading: "text-white",
      quoteIcon: "text-[#FFB300]",
      avatar: "border border-[#2A2A2A] bg-[#252525]",
    },
  };

  const styles = themeStyles[theme];

  // Shared orange hover treatment (applies to both themes)
  const hoverCard =
    "hover:bg-[#EC9A3C] hover:border-transparent hover:shadow-xl hover:-translate-y-1";

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lg:text-[50px] lg:leading-[67.25px] text-[#121212] font-medium">{title}</h2>
          {/* <p className="text-[#4C4C4C] text-lg md:text-xl">{description}</p> */}
        </motion.div>

        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            700: 1,
          }}
          className="flex -ml-8 w-auto"
          columnClassName="pl-8 bg-clip-padding"
        >
          {testimonials
            .slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)
            .map((testimonial, index) => (
              <div
                key={index}
                className={`group ${styles.cardBg} rounded-[16px] p-8 transition-all duration-300 mb-8 ${hoverCard}`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <QuoteIcon
                    className={`w-8 h-auto transition-colors duration-300 ${styles.quoteIcon} group-hover:text-white`}
                  />
                </div>

                {/* Testimonial Quote */}
                <p
                  className={`text-sm md:text-base leading-[150%] font-normal mb-8 transition-colors duration-300 ${styles.text} group-hover:text-white`}
                >
                  {testimonial.quote}
                </p>

                {/* Thank you text if exists */}
                {/* {testimonial.thankYou && (
                  <p
                    className={`text-lg mb-8 transition-colors duration-300 ${styles.text} group-hover:text-white`}
                  >
                    {testimonial.thankYou}
                  </p>
                )} */}

                {/* Bottom section with logo and details */}
                <div className="flex items-center gap-4">
                  {(testimonial.companyLogo || testimonial.image) && (
                    <div
                      className={`w-[48px] h-[48px] shrink-0 relative rounded-full overflow-hidden transition-colors duration-300 ${styles.avatar} group-hover:bg-white group-hover:border-transparent`}
                    >
                      <Image
                        src={(testimonial.companyLogo || testimonial.image) as string}
                        alt={testimonial.company || ""}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4
                      className={`font-medium text-base leading-[100%] tracking-[0%] lg:text-[18px] transition-colors duration-300 ${styles.heading} group-hover:text-white`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`transition-colors font-normal mt-1 text-sm duration-300 text-[#777777] group-hover:text-white/90`}
                    >
                      {[testimonial.company, testimonial.location].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Masonry>

        {/* Navigation Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={previousSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Slide Navigation Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-[#EC9A3C]"
                    : "w-3 bg-[#F3D9B5] hover:bg-[#EAC48A]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientWords;
