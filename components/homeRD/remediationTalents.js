"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RemediationTalents = () => {

  const Talents = [
    {
      id: 1,
      title: 'Estimators',
      description: 'Prepare detailed, accurate cost estimates for labor and materials to ensure profitable project bidding and planning.',
      image: '/redesign-25/remediation-talents/estimator.png',
      bgColor: 'bg-[#FF89E9]'
    },
    {
      id: 2,
      title: 'Account Receivable Specialists',
      description: 'Manage project-based invoicing, insurance claim paperwork,and collections to maintain healthy cash flow.',
      image: '/redesign-25/remediation-talents/ARS.png',
      bgColor: 'bg-[#FFE682]'
    },
    {
      id: 3,
      title: 'Call Center Support & Telemarketing',
      description: 'Handle initial client intake, emergency dispatch coordination, and insurance follow-up calls.',
      image: '/redesign-25/remediation-talents/telemarketing.png',
      bgColor: 'bg-[#6EF284]'
    },
    {
      id: 4,
      title: 'Virtual & Admin Assistants',
      description: 'Support project managers with scheduling, contractor coordination, documentation, and customer updates',
      image: '/redesign-25/remediation-talents/remediation-VAA.png',
      bgColor: 'bg-[#E19749]',
      textColor: 'text-white'
    },
    {
      id: 5,
      title: 'Digital Marketers',
      description: 'Help grow your restoration business with local SEO, service area marketing, and lead generation campaigns',
      image: '/redesign-25/remediation-talents/digital-marketing.png',
      bgColor: 'bg-[#9747FF]',
      textColor: 'text-white'
    }
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
    "/redesign-25/client-logos/property-doctors.jpg"
  ];


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

  return (
    <div className='bg-white pb-24 px-4'>
      <section className="py-24 bg-white">
        <div className="flex flex-col space-y-8 items-center">
          <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
            Construction/Reconstruction and restoration projects move fast under high-pressure conditions. All Talentz provides the critical behind-the-scenes talent to ensure accurate project 
            scoping, efficient administrative coordination, and clear client communication, helping you complete jobs on time and on budget with the fusion of tech+talent.
          </p>
          <Link 
            href="/request-talent" 
            className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
          >
            Explore Talent
          </Link>
        </div>

        <div className="flex flex-col space-y-8 items-center text-black mt-24">
          <h2 className="text-4xl md:text-5xl font-semibold text-center w-full mb-12">
            Our Solutions for Construction Project Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-20 mt-12 max-w-7xl mx-auto w-full px-4">
            {Talents.map((talent) => (
              <div key={talent.id} className={`flex flex-col ${talent.bgColor} ${talent.textColor} text-black p-6 rounded-lg hover:shadow-lg transition duration-300`}>
                <h3 className="text-3xl md:text-4xl font-semibold max-w-3xl">
                  {talent.title}
                </h3>
                <p className="text-sm py-4">{talent.description}</p>
                <img 
                  src={talent.image}
                  alt={talent.title}
                  className="w-full mt-4"
                />
              </div>
            ))}
          </div>  
        </div>

        <div className="pt-24 flex justify-center">
          <Link 
            href="/services" 
            className="bg-[#F99621] text-black text-center font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 inline-block"
          >
            Explore Our Industry Solutions
          </Link>
        </div>
      </section>

        <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-8 lg:px-16 items-center my-16 md:my-24 lg:my-32">
  
      <div className="relative flex justify-center md:justify-end px-4 md:col-span-1">
        <div className="relative w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">

          <div className="absolute w-[90%] h-[99%] bg-black/20 rounded-[24px] left-1/2 -translate-x-1/2 translate-y-4 md:translate-y-6"></div>

            <img 
            src="/redesign-25/remediation-talents/remediation-trust.png" 
            alt="Remediation Trust" 
            className="relative rounded-[24px] w-full h-auto object-cover shadow-lg" 
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start px-4 md:w-[98%] md:col-span-2 false">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black text-center md:text-left">
          Why Construction & Remediation Contractors Rely on Us.
        </h2>
    
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center md:text-left max-w-xl">
        We train our talent to understand the workflow of a restoration project, from emergency call to final invoice. This ensures they integrate smoothly with your field teams and external partners like insurance adjusters. 
        </p>
    
        <div className='flex flex-col lg:flex-row gap-6'>
          <Link href="/contact-us" className="bg-[#F99621] text-white px-8 py-3 text-center mx-auto hover:bg-[#121212] transition duration-300">Hire Construction/Remediation Support</Link>
          <Link href="/contact-us" className="bg-[#FEF5E9] text-[#F99621] px-8 py-3 text-center mx-auto hover:bg-[#121212] transition duration-300">Schedule a Workflow Consultation</Link>
        </div>
    </div>

    </section>


      <section className="bg-white py-18 md:py-[116px] px-[40px] md:px-0">
        <div className="container mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
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
    </div>
  );
};

export default RemediationTalents;