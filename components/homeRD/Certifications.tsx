"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const certs = [
  { src: "/v26-images/certs/iso.png", alt: "ISO 27001 Certified by AssurancePoint", width: 1500, height: 1500 },
  { src: "/v26-images/certs/aicpa.png", alt: "AICPA SOC for Service Organizations", width: 1496, height: 1486 },
  { src: "/v26-images/certs/great-place.png", alt: "Great Place To Work Certified", width: 2480, height: 3508 },
  { src: "/v26-images/certs/atra.png", alt: "ATRA - restoring homes, rebuilding lives", width: 667, height: 235 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const Certifications = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-30 md:py-40 px-[40px] md:px-0">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.src}
              className="relative flex h-24 items-center justify-center"
              variants={itemVariants}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.width}
                height={cert.height}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="max-h-full w-auto object-contain grayscale opacity-70 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
