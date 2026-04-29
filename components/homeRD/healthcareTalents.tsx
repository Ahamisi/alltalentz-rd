"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HealthcareTalents = () => {
  const Talents = [
    {
      id: 1,
      title: "Medical Billing Specialists",
      description:
        "Our medical billing specialists handle accurate coding, timely submissions, and revenue cycle management, so your cash flow stays healthy, and your compliance stays intact.",
      image: "/redesign-25/healthcare-talents/medical-billing-specialists.png",
      bgColor: "bg-[#70440F]",
      textColor: "text-white",
    },
    {
      id: 2,
      title: "Data Annotators",
      description:
        "Our medical data annotators label imaging, genomic data, and clinical notes with the precision that healthcare AI and research workflows demand.",
      image: "/redesign-25/healthcare-talents/data-annotator.png",
      bgColor: "bg-[#FFF4C8]",
    },
    {
      id: 3,
      title: "Virtual Assistants & Admin Support",
      description:
        "From patient scheduling and records coordination to provider communication, our healthcare virtual assistants handle the administrative layer of your practice with the discretion and accuracy this environment requires.",
      image: "/redesign-25/healthcare-talents/virtual-healthcare-assit.png",
      bgColor: "bg-[#CFF8D6]",
    },
    {
      id: 4,
      title: "Call Center Support",
      description:
        "Every patient interaction shapes trust. Our trained healthcare call center agents handle appointment reminders, patient outreach, and front-line triage support — with the empathy and professionalism your patients deserve.",
      image: "/redesign-25/healthcare-talents/call-center-support.png",
      bgColor: "bg-[#E1DEFF]",
    },
    {
      id: 5,
      title: "Software Developers",
      description:
        "Our healthcare software developers build and maintain HIPAA-aware patient portals, internal systems, and clinical platforms built for the regulatory demands of the sector.",
      image: "/redesign-25/healthcare-talents/healthcare-developers.png",
      bgColor: "bg-[#FFD8D4]",
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
      <section className="py-24 px-4 bg-white">
        <div className="flex flex-col space-y-8 items-center">
          <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
            Administrative overload is one of the biggest threats to quality patient care. All Talentz provides trained, compliance-aware healthcare professionals from medical billing specialists to virtual admin support so your clinical team can focus on patients, not paperwork.
          </p>
          <Link
            href="/request-talent"
            className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
          >
            Explore Our Healthcare Roles
          </Link>
        </div>

        <div className="flex flex-col space-y-8 items-center text-black mt-24">
          <h2 className="text-4xl md:text-5xl font-semibold  text-center w-full mb-12">
            The Healthcare Roles We Place
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-20 mt-12 max-w-7xl mx-auto w-full lg:px-4">
            {Talents.map((talent) => (
              <div
                key={talent.id}
                className={`flex flex-col ${talent.bgColor} ${talent.textColor} text-black p-6 rounded-lg hover:shadow-lg transition duration-300`}
              >
                <h3 className="text-3xl md:text-4xl font-semibold max-w-3xl">{talent.title}</h3>
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
            className="bg-[#F99621] text-black font-semibold text-center px-8 py-4 md:px-16 md:py-6 hover:bg-[#e88710] transition duration-300 inline-block"
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
              src="/redesign-25/healthcare-talents/healthcare-trust.png"
              alt="Healthcare Trust"
              width={460}
              height={600}
              className="relative rounded-[24px] w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black text-center md:text-left">
            We Understand What's at Stake in Healthcare 
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center md:text-left max-w-xl">
            Every professional we place is trained in compliance awareness, medical terminology, and the confidentiality standards this sector demands. They understand that the data they handle belongs to real patients — and they treat it accordingly. Our talent doesn't just fill a seat. They integrate into your team as a secure, reliable extension of your operations. 
          </p>

          <Link
            href="/request-talent"
            className="bg-[#F99621] text-white text-center text-sm md:text-base px-8 py-3 hover:bg-[#121212] transition duration-300 rounded-md"
          >
            Hire Healthcare Talents
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

export default HealthcareTalents;
