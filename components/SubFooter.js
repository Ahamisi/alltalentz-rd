"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Btn from './Btn';

const SubFooter = ({ brochure, meetWithUs }) => {
  const { ref, inView } = useInView();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      className="bg-[#131313] py-[100px]"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side (Image) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/at-wman.png" alt="All Talents Footer" className="hover:rotate-6 transition duration-200 cursor-pointer" />
          </div>

          {/* Right side (Text and CTAs) */}
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-white text-3xl lg:text-[40px] xl:text-[65px] lg:leading-[50px] xl:leading-[80px] font-semibold mb-4">Need customised solutions to meet your peculiar Talent needs?</h3>
            <p className="text-white mb-6">
              Kindly take a moment to schedule meeting with us via Teams or download our company brochure.
            </p>
            <div className="flex items-center flex-col md:flex-row">
              <Btn text="Meet with us" otherCSS="w-full text-center" link={`${meetWithUs ? meetWithUs : 'https://calendly.com/akwaowowillie'}`}/>&nbsp;&nbsp;
              <Btn text="Download Brochure" otherCSS="w-full text-center" link={`${brochure ? brochure : '/AllTalentzBrochure.pdf'}`}/>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubFooter;
