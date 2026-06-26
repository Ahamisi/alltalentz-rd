"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

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
        width={180}
        height={60}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-contain cursor-pointer w-full h-auto"
      />
    </motion.div>
  );
};

const OurClients = () => {
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

  return (
    <section className="bg-black py-12 md:py-[116px] px-[40px] md:px-0">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          Trusted by growing businesses across the U.S.
        </h2>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Logos */}
          {logos.map((logo, index) => (
            <ClientLogo key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
