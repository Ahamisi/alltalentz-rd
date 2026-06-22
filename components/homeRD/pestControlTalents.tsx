"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Talents = [
    {
      id: 1,
      title: "Customer Service Representatives",
      description:
        "Our CSRs handle inbound and outbound calls, scheduling, dispatch coordination, and customer inquiries with the responsiveness your customers expect and your technicians depend on.",
      image: "/redesign-25/remediation-talents/estimator.png",
      bgColor: "bg-[#FF89E9]",
    },
    {
      id: 2,
      title: "Accountants",
      description:
        "Pest control runs on recurring revenue, route-based costs, and seasonal cash flow swings. Our accountants manage bookkeeping, financial reporting, and reconciliations — giving you a clear, accurate picture of your business.",
      image: "/redesign-25/remediation-talents/ARS.png",
      bgColor: "bg-[#FFE682]",
    },
    {
      id: 3,
      title: "Billing Specialists",
      description:
        "Our billing specialists handle invoicing, payment processing, and collections for both one-time and contract-based services — keeping your cash flow steady and your customer accounts accurate.",
      image: "/redesign-25/remediation-talents/telemarketing.png",
      bgColor: "bg-[#6EF284]",
    },
    {
      id: 4,
      title: "Inside Sales Representatives",
      description:
        "Our inside sales reps follow up on leads, generate quotes, and manage contract renewals — including upsells for seasonal services like termite, mosquito, and wildlife control.",
      image: "/redesign-25/remediation-talents/remediation-VAA.png",
      bgColor: "bg-[#E19749]",
      textColor: "text-white",
    },
  ];

  const logos = [
    { src: "/redesign-25/client-logos/puro-clean-logo.jpg", alt: "PuroClean logo" },
    { src: "/redesign-25/client-logos/alacrity-solutions.jpg", alt: "Alacrity Solutions logo" },
    { src: "/redesign-25/client-logos/servpro.jpg", alt: "SERVPRO logo" },
    { src: "/redesign-25/client-logos/clean-slate.jpg", alt: "Clean Slate logo" },
    { src: "/redesign-25/client-logos/wonder-logo.jpg", alt: "Wonder logo" },
    { src: "/redesign-25/client-logos/365-restoration.jpg", alt: "365 Restoration logo" },
    { src: "/redesign-25/client-logos/restoration-specialists.jpg", alt: "Restoration Specialists logo" },
    { src: "/redesign-25/client-logos/signal-restoration.jpg", alt: "Signal Restoration logo" },
    { src: "/redesign-25/client-logos/on-site.jpg", alt: "On-Site logo" },
    { src: "/redesign-25/client-logos/property-doctors.jpg", alt: "Property Doctors logo" },
  ];

const PestControlTalents = () => {


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
            Every missed call is a missed job. Every late invoice is a delayed payment. AllTalentz provides trained, vetted professionals who understand the pest control industry, from scheduling and customer service to billing and inside sales.
          </p>
          <Link
            href="/request-talent"
            className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
          >
            Explore Our Roles
          </Link>
        </div>

        <div className="flex flex-col space-y-8 items-center text-black mt-24">
          <h2 className="text-4xl md:text-5xl font-semibold text-center w-full mb-12">
            The Pest Control Roles We Place
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-20 mt-12 max-w-7xl mx-auto w-full px-4">
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

      </section>

      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-8 lg:px-16 items-center my-16 md:my-24 lg:my-32">
        <div className="relative flex justify-center md:justify-end px-4 md:col-span-1">
          <div className="relative w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
            <div className="absolute w-[90%] h-[99%] bg-black/20 rounded-[24px] left-1/2 -translate-x-1/2 translate-y-4 md:translate-y-6"></div>

            <Image
              src="/redesign-25/remediation-talents/remediation-trust.webp"
              alt="Remediation Trust"
              width={460}
              height={600}
              className="relative rounded-[24px] w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start px-4 md:w-[98%] md:col-span-2 false">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black text-center md:text-left">
            We Understand How Pest Control Businesses Actually Run
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center md:text-left max-w-xl">
            Every professional we place is trained to understand that rhythm and familiarized with the platforms the industry runs on. Our talent doesn't need months to get up to speed. They integrate into your existing systems and workflows — answering calls, managing billing, and following up on leads.
          </p>

          <div className="flex flex-col lg:flex-row gap-6">
            <Link
              href="/contact-us"
              className="bg-[#F99621] text-white px-8 py-3 text-center mx-auto hover:bg-[#F99621]/90 transition duration-300"
            >
              Hire Pest Control Talent
            </Link>
            {/* <Link
              href="https://calendly.com/mnwoseh"
              className="bg-[#FEF5E9] text-[#F99621] px-8 py-3 text-center mx-auto hover:bg-[#121212] transition duration-300"
            >
              Schedule a Workflow Consultation
            </Link> */}
          </div>
        </div>
      </section>

      <section className="bg-white py-18 md:py-[116px] px-[40px] md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {logos.map((logo, index) => (
              <ClientLogo key={index} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PestControlTalents;
