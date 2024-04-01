"use client"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const NicheItem = ({ imageSrc, altText, title }) => {
  const { ref, inView } = useInView();

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8, // Adjust duration here for slower animation
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="rounded-[38px] hover:bg-[#F99621] bg-[#121212] transition-colors duration-300 cursor-pointer py-[16px] px-[24px] flex items-center space-x-[10px] md:space-x-[38px]"
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <img src={imageSrc} alt={altText} className="rounded-full h-[78px] w-[78px]" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </motion.div>
  );
};

const NicheSection = () => {
  return (
    <section>
      <div className="container mx-auto py-12 md:py-[140px] px-[40px] md:px-0">
        {/* Section Header */}
        <h2 className="text-3xl text-center mb-8">Our range of vetted remote employees cut <br/>across varied business needs and niches.</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-[90%] md:mx-auto">
          {/* First Column */}
          <div className="flex flex-col space-y-8">
            <NicheItem imageSrc="/home-img/niche/estimators.png" altText="Estimators Alltalentz Service Offerings" title="Estimators" />
            <NicheItem imageSrc="/home-img/niche/virtual-assistants.png" altText="Virtual Assistants Alltalentz Service Offerings" title="Virtual Assistants" />
            <NicheItem imageSrc="/home-img/niche/digital-marketers.png" altText="Digital Marketers Alltalentz Service Offerings" title="Digital Marketers" />
            <NicheItem imageSrc="/home-img/niche/account-receivables.png" altText="Account Receivables Alltalentz Service Offerings" title="Account Receivables" />
          </div>

          {/* Second Column */}
          <div className="flex flex-col space-y-8">
            <NicheItem imageSrc="/home-img/niche/administrative-assistants.png" altText="Administrative Assistants Alltalentz Service Offerings" title="Administrative Assistants" />
            <NicheItem imageSrc="/home-img/niche/account-receivables.png" altText="Telemarketing Assistants Alltalentz Service Offerings" title="Telemarketing Assistants" />
            <NicheItem imageSrc="/home-img/niche/designers-sds.png" altText="Designers/Software Developers Alltalentz Service Offerings" title="Designers/Software Developers" />
            <NicheItem imageSrc="/home-img/niche/quickbook-specials.png" altText="Quickbooks Specialists Alltalentz Service Offerings" title="Quickbooks Specialists" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NicheSection;
