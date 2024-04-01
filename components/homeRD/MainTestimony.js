"use client"
import { motion } from 'framer-motion';
import TestimonialSlider from '../TestimonialSlider';


const MainTestimony = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat text-[#282828] py-[50px] md:py-[70px] px-[40px] md:px-0" style={{ backgroundImage: "url('/home-img/testimonial.jpg')" }}>
      <div className="relative inset-0 flex flex-col items-center justify-center text-[#282828]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-[45px] md:leading-[62px] font-bold mb-8 text-center"
        >
          What our Partners say
        </motion.h2>
        <div className="w-[100%] md:w-[65%] md:max-8xl mx-auto flex flex-col md:flex-row items-center">
          {/* Add your TestimonialSlider component here */}
          <TestimonialSlider/>
        </div>
      </div>
    </section>
  );
};

export default MainTestimony;
