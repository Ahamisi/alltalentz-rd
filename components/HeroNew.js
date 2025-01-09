"use client"
import Link from "next/link";
import Header from "./HeaderHome";

import Btn from "@/components/Btn";
import HeaderText from "@/components/HeaderText";
import styles from './css/animations.module.css';
import { motion, AnimatePresence } from "framer-motion";


const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const images = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1
      },
      delay: 200
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 1 } }
  };
  


const HeroNew = () => {
  return (
    <AnimatePresence>
        <motion.div
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            exist={{opacity: 0, y: 15}}
            transition={{delay: 0.25}}
        >
            <section
            className="relative bg-cover bg-top bg-no-repeat px-[20px] md:px-0  h-screen overflow-hidden"
            style={{ backgroundImage: "url('/alltalentz-homebg.jpg')" }}
            >
                {/* <div className="md:h-[20px]"></div> */}
                <Header/>


            {/* bg-gradient-to-b from-transparent to-black */}

            <div className="absolute inset-0 
            " style={{
                backgroundColor: 'rgba(0, 0, 0, 0.80)'
            }}></div>
            <br/>
            <div className="relative py-[30px] md:h-screen flex flex-col px-2 md:px-0 items-center justify-center text-white  md:py-10">
            
            
            <div className="flex lg:mx-[80px]">
            {/* Left Grid */}
              {/* Left Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-0 md:p-12 flex flex-col justify-center space-y-[33px] lg:w-[60%]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-[50px] md:font-[700] md:leading-[65px] font-bold"
            >
              Scale up your <span className="text-[#F99621]"><br />business operations</span> <br />with the right <br /> remote talents.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-[20px] text-[#FEF5E9]"
            >
              Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex"
            >
              <a href="/request-talent" className="bg-[#F99621] hover:bg-white text-[#121212] px-[63px] py-[23px] transition duration-300">
                Find Talent
              </a>
            </motion.div>
          </motion.div>

            {/* Right Grid */}
            <div className="hidden md:flex lg:w-[40%] items-center">
                <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2">
                    <motion.div variants={imageVariant} className="flex">
                        <motion.img src="/home-img/remote-guy-alltalent.svg" alt="Remote Alltalentz" className="rounded-lg animate-spin-slow w-[95%]"
                            variants={images}
                        />
                    </motion.div>
                    <motion.div variants={imageVariant} className="flex">
                        <motion.img src="/home-img/remote-woman-at.svg" alt="Remote Staff Alltalentz" className="rounded-lg animate-spin-slow" variants={images}/>
                    </motion.div>
                    <motion.div variants={imageVariant} className="flex">
                        <motion.img src="/home-img/remote-woman-3.svg" alt="Remote Software Developer Alltalentz" className="rounded-lg animate-spin-slow w-[95%]" variants={images} />
                    </motion.div>
                    <motion.div variants={imageVariant} className="flex">
                        <motion.img src="/home-img/remote-woman-4.svg" alt="Remote Estimator Alltalentz" className="rounded-lg animate-spin-slow" variants={images}/>
                    </motion.div>
                </motion.div>
            </div>
        </div>




                
            </div>
            </section>
        </motion.div>
    </AnimatePresence>
  );
};

export default HeroNew;
