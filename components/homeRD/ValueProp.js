"use client"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {useEffect, React} from "react"
import Image from "next/image";


const ValueProp = () => {
  const { ref, inView } = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (

    <section ref={ref} className="relative bg-white py-20 bg-[url('/redesign-25/backgrounds/frame-pattern-1.svg')] bg-center bg-contain bg-no-repeat px-4 md:px-0">
    {/* <section 
       ref={ref} 
       className="relative py-20 bg-[url('/redesign-25/backgrounds/value-prop-bg.svg')] bg-center bg-cover bg-no-repeat"
     >
       {/* Optional overlay if needed */}
      {/* <div className="absolute inset-0 bg-white/90"></div> */ }
     
      
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Updated Header */}
        <motion.h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-black" variants={itemVariants}>
          Our Value <span className="text-[#FFB300]">Proposition</span>
        </motion.h2>

        {/* Updated Grid Layout */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" variants={itemVariants}>
          {/* Card 1: Highly-Skilled Employees */}
          <motion.div className="bg-white p-8 rounded-lg shadow-sm border" variants={itemVariants}>
            <div className="mb-6">
              <Image src="/redesign-25/icons/skill.svg" alt="Highly-Skilled Employees" width={48} height={48} />
              {/* Insert new icon SVG here */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Highly-Skilled Employees</h3>
            <p className="text-gray-600">All Talentz boasts a pool of highly skilled, highly trained and well experienced professionals, carefully selected to meet your specific needs.</p>
          </motion.div>

          {/* Card 2: Affordable Cost */}
          <motion.div className="bg-white p-8 rounded-lg shadow-sm border" variants={itemVariants}>
            <div className="mb-6">
              <Image src="/redesign-25/icons/affordable.svg" alt="Affordable Cost" width={48} height={48} />
              {/* Insert new icon SVG here */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Affordable Cost</h3>
            <p className="text-gray-600">Enjoy cost-effective hiring solutions without compromising quality. At All Talentz, you save up to 70% on staffing costs while still maintaining maximum efficiency.</p>
          </motion.div>

          {/* Card 3: Vetted & Reliable Employees */}
          <motion.div className="bg-white p-8 rounded-lg shadow-sm border" variants={itemVariants}>
            <div className="mb-6">
              <Image src="/redesign-25/icons/reliable.svg" alt="Vetted & Reliable Employees" width={48} height={48} />
              {/* Insert new icon SVG here */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Vetted & Reliable Employees</h3>
            <p className="text-gray-600">Our rigorous screening process ensures that you get reliable, efficient hard working and trustworthy employees.</p>
          </motion.div>

          {/* Card 4: Contribute to Success */}
          <motion.div className="bg-white p-8 rounded-lg shadow-sm border" variants={itemVariants}>
            <div className="mb-6">
              <Image src="/redesign-25/icons/success.svg" alt="Contribute to Success" width={48} height={48} />
              {/* Insert new icon SVG here */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Contribute to Success</h3>
            <p className="text-gray-600">Our talented workforce is dedicated to understanding your business goals and working with you to deliver exceptional results and helping your business thrive!</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ValueProp;
