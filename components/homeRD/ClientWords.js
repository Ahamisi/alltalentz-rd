"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

const ClientWords = ({ 
  title = "What Our Clients Say",
  description = "Hear directly from our clients about their experiences with us",
  testimonials = [],
  theme = 'light' // 'light' or 'dark'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 9;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  // Theme-based styles
  const themeStyles = {
    light: {
      background: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-[#4C4C4C]',
      heading: 'text-black',
      quoteIcon: 'text-[#FFB84D]',
      card: 'shadow-lg hover:shadow-xl'
    },
    dark: {
      background: 'bg-[#131313]',
      cardBg: 'bg-[#1E1E1E]',
      text: 'text-gray-300',
      heading: 'text-white',
      quoteIcon: 'text-[#FFB300]',
      card: 'shadow-none hover:bg-[#252525]'
    }
  };

  const styles = themeStyles[theme];

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">
            {title}
          </h2>
          <p className="text-[#4C4C4C] text-lg md:text-xl">
            {description}
          </p>
        </motion.div>

        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            700: 1
          }}
          className="flex -ml-8 w-auto"
          columnClassName="pl-8 bg-clip-padding"
        >
          {testimonials
            .slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)
            .map((testimonial, index) => (
              <div 
                key={index}
                className={`${styles.cardBg} rounded-lg p-8 transition-all duration-300 mb-8 ${styles.card}`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className={`w-12 h-12 ${styles.quoteIcon}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Quote */}
                <p className={`text-lg mb-8 ${styles.text}`}>
                  {testimonial.quote}
                </p>

                {/* Thank you text if exists */}
                {testimonial.thankYou && (
                  <p className={`text-lg mb-8 ${styles.text}`}>
                    {testimonial.thankYou}
                  </p>
                )}

                {/* Bottom section with logo and details */}
                <div className="flex items-center gap-4">
                  {(testimonial.companyLogo || testimonial.image) && (
                    <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={testimonial.companyLogo || testimonial.image}
                        alt={testimonial.company}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className={`font-bold text-lg ${styles.heading}`}>
                      {testimonial.name}
                    </h4>
                    <p className={styles.text}>
                      {testimonial.company}
                      {testimonial.location && `, ${testimonial.location}`}
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Slide Navigation Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#FFB300]' 
                    : 'bg-gray-300 hover:bg-gray-400'
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
