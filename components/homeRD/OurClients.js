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
      <img src={src} alt={alt} className="max-w-xs h-[60px]" />
    </motion.div>
  );
};

const OurClients = () => {
    const logos = [
        "/home-img/clients/puro-clean.png",
        "/home-img/clients/we-scope.png",
        "/home-img/clients/serv-pro.png",
        "/home-img/clients/clean-slate.png",
        "/home-img/clients/true-north.png",
        "/home-img/clients/365-restoration.png",
        "/home-img/clients/restoration-specialists.png",
        "/home-img/clients/dri.png",
        "/home-img/clients/crdn.png",
        "/home-img/clients/property-doctor.png"
    ]

    
  return (
    <section className="bg-black py-12 md:py-[116px]">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">Trusted by top brands</h2>

        {/* Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
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
