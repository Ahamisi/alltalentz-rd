"use client"
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Section = ({ imageSrc, altText, title, description, buttonLabel, reverse = false }) => {
  const { ref, inView } = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, x: reverse ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const contentAlignClass = reverse ? "md:items-start" : "md:items-end";

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-[180px]"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {!reverse && (
        <div className="relative flex justify-center md:justify-end">
          <div className="w-[350px] h-[460px] mx-auto rounded-[24px]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}></div>
          <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
            <img src={imageSrc} alt={altText} className="mx-auto rounded-lg w-[380px]" />
          </div>
        </div>
      )}
      <div className={`flex flex-col justify-center ${contentAlignClass} md:w-[80%] ${reverse && "md:ml-auto"}`}>
        <h2 className="text-3xl md:text-[55px] md:leading-[65px] font-semibold mb-4 text-black text-center md:text-left">{title}</h2>
        <p className="text-lg text-gray-700 mb-6 text-center md:text-left">{description}</p>
        {buttonLabel && <button className="bg-[#F99621] text-white px-8 py-3 hover:bg-[#121212] transition duration-300">{buttonLabel}</button>}
      </div>
      {reverse && (
        <div className="relative flex justify-center md:justify-end">
          <div className="w-[350px] h-[460px] mx-auto rounded-[24px]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}></div>
          <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
            <img src={imageSrc} alt={altText} className="mx-auto rounded-lg w-[380px]" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const TheAgency = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[40px] md:px-0" style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
      <div className="container mx-auto py-[200px]">
        <Section
          imageSrc="/home-img/outsourcing-agency.png"
          altText="Outsourcing Agency alltalentz"
          title="All Talentz Outsourcing Agency."
          description="All Talentz is more than just a recruitment company; We connect you with the best remote talent in Africa. Whether you need skilled, experienced, or reliable talent, we have the perfect match for you. And the best part is, you get amazing value for your money!"
          buttonLabel="Get Started"
        />
        <Section
          imageSrc="/home-img/quality-talents.png"
          altText="Quality Talents"
          title="Quality Talents at bargain."
          description="Flexible labor that scales with your company. We employ the talent, therefore there are no payroll costs, benefit costs, or high overhead costs that accrue to you."
          reverse
        />
        <Section
          imageSrc="/home-img/top-tier-talents.png"
          altText="Top-Tier Talents"
          title="Top-Tier Talents from Day one."
          description="Our talents are on the money, and we're determined to meet your company's demands and keep them in line with best practices. If you are not satisfied with our Talent after 30 days, we'll replace them."
        />
      </div>
    </section>
  );
};

export default TheAgency;
