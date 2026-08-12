"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import QuoteIcon from "./QuoteIcon";
import { REVEAL_VIEWPORT } from "@/lib/motion";

interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  location?: string;
  companyLogo?: string;
  image?: string;
  thankYou?: string;
}

type Theme = "light" | "dark";

const THEME_STYLES = {
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

type Styles = (typeof THEME_STYLES)[Theme];

// Shared orange hover treatment (applies to both themes)
const HOVER_CARD =
  "hover:bg-[#EC9A3C] hover:border-transparent hover:shadow-xl hover:-translate-y-1";

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

// Deliberately has no opinion about its own height — the grid wants cards to
// size to their quote, the carousel wants them all the same height.
const TestimonialCard = ({
  testimonial,
  styles,
  className = "",
}: {
  testimonial: Testimonial;
  styles: Styles;
  className?: string;
}) => (
  <div
    className={`group ${styles.cardBg} rounded-[16px] p-8 transition-all duration-300 ${HOVER_CARD} ${className}`}
  >
    <div className="mb-6">
      <QuoteIcon
        className={`w-8 h-auto transition-colors duration-300 ${styles.quoteIcon} group-hover:text-white`}
      />
    </div>

    <p
      className={`text-sm md:text-base leading-[150%] font-normal mb-8 transition-colors duration-300 ${styles.text} group-hover:text-white`}
    >
      {testimonial.quote}
    </p>

    {/* mt-auto only bites when a parent makes this a column flex item, i.e. in
        the carousel, where it pins the attribution to the bottom of the card. */}
    <div className="mt-auto flex items-center gap-4">
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
);

/* -------------------------------------------------------------------------- */
/*                            Desktop — masonry grid                          */
/* -------------------------------------------------------------------------- */

const ITEMS_PER_SLIDE = 9;

const TestimonialGrid = ({
  testimonials,
  styles,
}: {
  testimonials: Testimonial[];
  styles: Styles;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const previousSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <>
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
        }}
        className="flex -ml-8 w-auto"
        columnClassName="pl-8 bg-clip-padding"
      >
        {testimonials
          .slice(currentSlide * ITEMS_PER_SLIDE, (currentSlide + 1) * ITEMS_PER_SLIDE)
          .map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              styles={styles}
              className="mb-8"
            />
          ))}
      </Masonry>

      {totalSlides > 1 && (
        <>
          {/* Navigation Buttons */}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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

          {/* Slide Navigation Dots */}
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
        </>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                         Mobile — autoplaying carousel                      */
/* -------------------------------------------------------------------------- */

const TestimonialCarousel = ({
  testimonials,
  styles,
}: {
  testimonials: Testimonial[];
  styles: Styles;
}) => {
  // Autoplay stops for good on any deliberate swipe or dot tap, so the carousel
  // never pulls a card away mid-read.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: true }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      emblaApi.plugins().autoplay?.stop();
    }

    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <>
      <div className="-mx-4 overflow-hidden px-4" ref={emblaRef}>
        <ul className="flex items-stretch gap-4">
          {testimonials.map((testimonial, index) => (
            <li key={index} className="min-w-0 shrink-0 grow-0 basis-[84%]">
              <TestimonialCard
                testimonial={testimonial}
                styles={styles}
                className="flex h-full flex-col"
              />
            </li>
          ))}
        </ul>
      </div>

      {testimonials.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selected ? "w-6 bg-[#EC9A3C]" : "w-2.5 bg-[#F3D9B5]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Section                                   */
/* -------------------------------------------------------------------------- */

const ClientWords = ({
  title = "What Our Clients Say",
  description = "Hear directly from our clients about their experiences with us",
  testimonials = [] as Testimonial[],
  theme = "light" as Theme,
}: {
  title?: ReactNode;
  description?: string;
  testimonials?: Testimonial[];
  theme?: Theme;
}) => {
  // Phones get the carousel; the masonry grid would otherwise collapse into one
  // very long stack of cards.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const styles = THEME_STYLES[theme];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lg:text-[50px] lg:leading-[67.25px] text-[#121212] font-medium">
            {title}
          </h2>
          {/* <p className="text-[#4C4C4C] text-lg md:text-xl">{description}</p> */}
        </motion.div>

        {isMobile ? (
          <TestimonialCarousel testimonials={testimonials} styles={styles} />
        ) : (
          <TestimonialGrid testimonials={testimonials} styles={styles} />
        )}
      </div>
    </section>
  );
};

export default ClientWords;
