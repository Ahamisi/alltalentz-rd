"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TechTalents = () => {
  const Talents = [
    {
      id: 1,
      title: "Software Developers",
      description:
        "Whether you're building an MVP or maintaining a live product at scale, our full-stack, front-end, and back-end developers integrate into your existing workflows and contribute to your codebase from day one.",
      image: "/redesign-25/tech-talents/software-development.png",
      bgColor: "bg-[#FEF5E9]",
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      description:
        "From model development to algorithm refinement, our AI/ML engineers help you move from prototype to production faster — without the months-long search for niche talent.",
      image: "/redesign-25/tech-talents/ai-ml.png",
      bgColor: "bg-[#E7E7E7]",
    },
    {
      id: 3,
      title: "Data Annotation",
      description:
        "Clean, labeled, structured training data is the difference between a model that works and one that doesn't. Our data annotators deliver the accuracy your AI initiatives depend on.",
      image: "/redesign-25/tech-talents/data-analytics.png",
      bgColor: "bg-[#ECF8CF]",
    },
    {
      id: 4,
      title: "UI/UX Design",
      description:
        "A great product lives or dies by the experience. Our UI/UX designers bring both aesthetic precision and user research skills to help you build interfaces people actually want to use.",
      image: "/redesign-25/tech-talents/ui-ux-design.png",
      bgColor: "bg-[#DEFBFF]",
    },
    {
      id: 5,
      title: "Virtual Admin & Digital Marketing",
      description:
        "Our virtual admins and digital marketing specialists handle the operational and growth tasks, so your core team stays focused on building.",
      image: "/redesign-25/tech-talents/virtual-admin-digital-marketing.png",
      bgColor: "bg-[#E9D4FF]",
    },
  ];

  const logos = [
    "/redesign-25/client-logos/puro-clean-logo.jpg",
    "/redesign-25/client-logos/alacrity-solutions.jpg",
    "/redesign-25/client-logos/servpro.jpg",
    "/redesign-25/client-logos/clean-slate.jpg",
    "/redesign-25/client-logos/wonder-logo.jpg",
    "/redesign-25/client-logos/365-restoration.jpg",
    "/redesign-25/client-logos/restoration-specialists.jpg",
    "/redesign-25/client-logos/signal-restoration.jpg",
    "/redesign-25/client-logos/on-site.jpg",
    "/redesign-25/client-logos/property-doctors.jpg",
  ];

  const ClientLogo = ({ src, alt }: { src: string; alt: string }) => {
    const { ref, inView } = useInView();

    const logoVariants = {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeInOut" as const,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className="flex justify-center items-center"
        variants={logoVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Image
          src={src}
          alt={alt}
          width={240}
          height={60}
          className="max-w-xs h-[60px] cursor-pointer"
        />
      </motion.div>
    );
  };

  return (
    <div className="bg-white pb-24 px-4">
      <section className="py-24 bg-white">
        <div className="flex flex-col space-y-8 items-center">
          <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
            Your roadmap doesn't wait for a six-week hiring cycle. All Talentz gives you immediate access to pre-vetted software developers, AI/ML engineers, data specialists, and UX designers who are ready to plug into your stack and ship from day one without the overhead of traditional recruitment. 
          </p>
          <Link
            href="/request-talent"
            className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
          >
            Explore Our Tech Tech Roles
          </Link>
        </div>

        <div className="flex flex-col space-y-8 items-center text-black mt-24">
          <h2 className="text-4xl md:text-5xl font-semibold max-w-5xl text-center block w-full mb-12">
            Our Solutions for Technology & Startups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-20 mt-12 max-w-7xl mx-auto w-full px-4">
            {Talents.map((talent) => (
              <div
                key={talent.id}
                className={`flex flex-col ${talent.bgColor} text-black p-6 rounded-lg hover:shadow-lg transition duration-300`}
              >
                <h3 className="text-3xl md:text-4xl font-semibold max-w-4xl">{talent.title}</h3>
                <p className="text-sm py-4">{talent.description}</p>
                <Image
                  src={talent.image}
                  alt={talent.title}
                  width={400}
                  height={300}
                  className="w-full mt-4"
                />
                <Link
                  href="/request-talent"
                  className="mt-4 w-full text-center bg-[#F99621] text-black font-semibold px-6 py-3 hover:bg-[#e88710] transition duration-300 text-sm"
                >
                  Hire Talent
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="pt-24 flex justify-center">
          <Link
            href="/hiring-services"
            className="bg-[#F99621] text-black font-semibold max-auto px-8 py-4 md:px-16 md:py-6 hover:bg-[#e88710] transition duration-300 inline-block"
          >
            Explore Our Industry Solutions
          </Link>
        </div> */}
      </section>

      <section className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-8 lg:px-16 items-center my-16 md:my-24 lg:my-32">
        <div className="relative flex justify-center md:justify-end px-4 md:px-0">
          <div className="relative w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
            <div className="absolute w-[90%] h-[99%] bg-black/20 rounded-[24px] left-1/2 -translate-x-1/2 translate-y-4 md:translate-y-6"></div>

            <Image
              src="/redesign-25/tech-talents/tech-leaders.webp"
              alt="Tech Leaders"
              width={460}
              height={600}
              className="relative rounded-[24px] w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black text-center md:text-left">
            Built for How Tech Teams Work
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center md:text-left max-w-xl">
            Every tech professional we place is vetted for technical proficiency, communication clarity, and the ability to work within agile environments. They understand stand-ups, sprint reviews, and async collaboration because those aren't perks in tech; they're requirements.
          </p>

          <Link
            href="/request-talent"
            className="bg-[#F99621] text-white text-center text-sm md:text-base px-8 py-3 hover:bg-[#121212] transition duration-300"
          >
            Hire Tech Talents
          </Link>
        </div>
      </section>

      <section className="bg-white py-18 md:py-[116px] px-[40px] md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {logos.map((src, index) => (
              <ClientLogo key={index} src={src} alt={`Logo ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechTalents;
