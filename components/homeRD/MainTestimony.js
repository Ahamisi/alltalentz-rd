"use client"
import { motion } from 'framer-motion';
import TestimonialSlider from '../TestimonialSlider';

const MainTestimony = () => {
  return (
      <section className="relative bg-white py-20 bg-[url('/redesign-25/backgrounds/pattern-partners.svg')] bg-center bg-contain bg-no-repeat px-6 md:px-0">

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[48px] font-bold text-center mb-10 text-black"
        >
          What our Partners say
        </motion.h2>

        <div className="w-full max-w-6xl mx-auto">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
};

export default MainTestimony;
