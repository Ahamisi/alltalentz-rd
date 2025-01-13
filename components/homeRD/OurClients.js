"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ClientLogo = ({ src, alt }) => {
  const { ref, inView } = useInView();

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };



  return (
    <motion.div
      ref={ref}
      className="flex justify-center items-center"
      variants={logoVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <img src={src} alt={alt} className="max-w-xs h-[60px] cursor-pointer" />
    </motion.div>
  );
};

const OurClients = () => {
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
        "/redesign-25/client-logos/property-doctors.jpg"
    ]

    
  return (
    <section className="bg-black py-12 md:py-[116px] px-[40px] md:px-0">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">Trusted by top brands</h2>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Logos */}
          {logos.map((src, index) => (
            <ClientLogo
              key={index}
              src={src}
              alt={`Logo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
