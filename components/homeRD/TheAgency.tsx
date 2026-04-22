"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";

const Section = ({
  imageSrc,
  altText,
  title,
  description,
  buttonLabel = undefined,
  reverse = false,
}: {
  imageSrc: string;
  altText: string;
  title: string[];
  description: string;
  buttonLabel?: string;
  reverse?: boolean;
}) => {
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
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    },
  };

  const contentAlignClass = reverse ? "md:items-start" : "md:items-start";

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-[100px] md:my-[180px]"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {!reverse && (
        <div className="relative flex justify-center md:justify-end">
          <div
            className="w-[350px] h-[460px] mx-auto rounded-[24px]"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
          ></div>
          <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
            <Image
              src={imageSrc}
              alt={altText}
              width={380}
              height={460}
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      )}
      <div
        className={`flex flex-col justify-center ${contentAlignClass} md:w-[80%] ${reverse && "md:ml-auto"}`}
      >
        <h2 className="text-3xl md:text-[55px] md:leading-[65px] font-bold mb-4 text-black text-center md:text-left">
          {title[0]} <span className="text-[#F99621]">{title[1]}</span> {title[2]}
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center md:text-left">{description}</p>
        {buttonLabel && (
          <a
            href="/outsource-with-agency"
            className="bg-[#F99621] text-white text-center px-8 py-3 hover:bg-[#121212] transition duration-300"
          >
            {buttonLabel}
          </a>
        )}
      </div>
      {reverse && (
        <div className="relative flex justify-center md:justify-end">
          <div
            className="w-[350px] h-[460px] mx-auto rounded-[24px]"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
          ></div>
          <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
            <Image
              src={imageSrc}
              alt={altText}
              width={380}
              height={460}
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const TheAgency = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[10px] md:py-[70px] bg-white px-[40px] md:px-0"
      style={{ backgroundImage: "url('/our-values-bg.svg')" }}
    >
      <div className="container mx-auto md:py-[0px]">
        <Section
          imageSrc="/home-img/outsourcing-agency.png"
          altText="Outsourcing Agency alltalentz"
          title={["Built for Your Industry."]}
          description="All Talentz places professionals who understand your workflows, speak your industry's language, and integrate into your operation within days — not months."
          buttonLabel="Get Started"
        />
        <Section
          imageSrc="/home-img/quality-talents.png"
          altText="Quality Talents"
          title={["Premium Talent. Predictable Costs."]}
          description="Our remote professionals deliver the same quality output, backed by ISO 27001 and SOC-2 Type 2 certifications, for up to 75% less than an equivalent local hire."
          reverse
        />
        <Section
          imageSrc="/home-img/top-tier-talents.png"
          altText="Top-Tier Talents"
          title={["Deployed in 7 Days. Performing From Day One."]}
          description="Our talents are pre-vetted, role-trained, and ready. We match your operational requirements, align on workflow, and have your new team member ready for productivity.  "
        />
      </div>
    </section>
  );
};

export default TheAgency;
