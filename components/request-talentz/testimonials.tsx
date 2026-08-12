"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import QuoteIcon from "@/components/homeRD/QuoteIcon";
import type { Testimonial } from "@/lib/homepage-testimonials";
import { homepageTestimonials } from "@/lib/homepage-testimonials";
import { REVEAL_VIEWPORT } from "@/lib/motion";

const defaultTestimonials: Testimonial[] = [
  homepageTestimonials[1],
  homepageTestimonials[4],
  homepageTestimonials[2],
];

const RequestTalentTestimonials = ({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white border border-[#EDEDED] rounded-[16px] p-8 transition-all duration-300 hover:bg-[#EC9A3C] hover:border-transparent hover:shadow-xl hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <QuoteIcon className="w-8 h-auto transition-colors duration-300 text-[#F99621]/50 group-hover:text-white" />
              </div>

              {/* Testimonial Quote */}
              <p className="text-sm md:text-base leading-[150%] font-normal mb-8 transition-colors duration-300 text-[#5B5B5B] group-hover:text-white">
                {testimonial.quote}
                {testimonial.thankYou && (
                  <>
                    <br />
                    {testimonial.thankYou}
                  </>
                )}
              </p>

              {/* Bottom section with logo and details */}
              <div className="flex items-center gap-4">
                {(testimonial.companyLogo || testimonial.image) && (
                  <div className="w-[48px] h-[48px] shrink-0 relative rounded-full overflow-hidden transition-colors duration-300 border border-gray-200 bg-white group-hover:bg-white group-hover:border-transparent">
                    <Image
                      src={(testimonial.companyLogo || testimonial.image) as string}
                      alt={testimonial.company || ""}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-medium text-base leading-[100%] tracking-[0%] lg:text-[18px] transition-colors duration-300 text-[#1E1E1E] group-hover:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="transition-colors font-normal mt-1 text-sm duration-300 text-[#777777] group-hover:text-white/90">
                    {[testimonial.company, testimonial.location].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RequestTalentTestimonials;
