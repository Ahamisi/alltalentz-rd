"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// All source files are 3600x3600 squares, but the artwork inside each one fills a
// different share of the canvas. `scale` compensates for that padding so every badge
// reads at roughly the same optical size.
const certs = [
  { src: "/v26-images/certs/iso.png", alt: "ISO 27001 Certified by AssurancePoint", scale: 1 },
  { src: "/v26-images/certs/aicpa.png", alt: "AICPA SOC for Service Organizations", scale: 1.03 },
  { src: "/v26-images/certs/great-place.png", alt: "Great Place To Work Certified", scale: 1.2 },
  { src: "/v26-images/certs/hipaa.png", alt: "HIPAA Compliant", scale: 1.23 },
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
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-12 items-center max-w-5xl mx-auto [--cert-size:105px] sm:[--cert-size:130px] md:[--cert-size:160px]"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.src}
              className="relative mx-auto flex max-w-full items-center justify-center"
              style={{
                width: `calc(var(--cert-size) * ${cert.scale})`,
                height: `calc(var(--cert-size) * ${cert.scale})`,
              }}
              variants={itemVariants}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={3600}
                height={3600}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="h-full w-full object-contain grayscale opacity-70 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
