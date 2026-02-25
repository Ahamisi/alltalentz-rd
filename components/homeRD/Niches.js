"use client"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const NicheItem = ({ title, imageSrc, description }) => {
  const router = useRouter();

  const handleHireNow = () => {
    router.push(`/request-talent#${title.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div 
      className="relative rounded-[24px] overflow-hidden bg-neutral-900/90 w-full cursor-pointer group"
      onClick={handleHireNow}
    >
      {/* Default State */}
      <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay - only shown in non-hover state */}
        <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>

      {/* Default Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 group-hover:opacity-0 transition-opacity duration-300">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          <div className="inline-flex items-center">
            <span className="text-white border-b border-white">
              Hire now
            </span>
            <svg className="w-6 h-6 ml-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover State Content */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-neutral-800/95">
        <div className="flex flex-col h-full pt-6">
          {/* Image Container - Top portion with proper padding */}
          <div className="relative h-[45%] px-8">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col justify-start p-8 flex-grow">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{title}</h2>
            <p className="text-white/80 mb-6">{description}</p>
            <div className="inline-flex items-center mt-auto">
              <span className="text-white border-b border-white">
                Hire now
              </span>
              <svg className="w-6 h-6 ml-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NicheSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView();

  const niches = [
    {
      title: "Data Annotators",
      imageSrc: "/redesign-25/pricing/Data Annotators.jpg",
      description: "Our skilled Data Annotators meticulously label and categorize data, such as images, text, and audio, to create high-quality, structured datasets essential for training and improving machine learning models."
    },
    {
      title: "AI/ML Specialists",
      imageSrc: "/redesign-25/pricing/AI/MLSpecialists.jpg",
      description: "Our AI/ML Specialists design, build, and deploy artificial intelligence and machine learning models to solve complex business challenges, automate processes, and extract valuable insights from your data."
    },
    {
      title: "Medical Billing Specialists",
      imageSrc: "/redesign-25/pricing/MedicalBillingSpecialists.jpg",
      description: "Our Medical Billing Specialists manage healthcare billing processes, handle insurance claims, and ensure accurate coding to streamline revenue cycles and maintain compliance for medical practices."
    },
    {
      title: "Software Developers",
      imageSrc: "/redesign-25/pricing/SoftwareDevelopers.jpg",
      description: "Our Software Developers (a dedicated card for this role) analyze requirements to build, test, and maintain scalable software applications and systems, ensuring they are efficient, secure, and meet user needs."
    },
    {
      title: "UI/UX Designers",
      imageSrc: "/redesign-25/niche/software-developers.jpg",
      description: "Our UI/UX Designers create intuitive and engaging user interfaces and experiences for digital products, conducting user research and designing workflows to enhance customer satisfaction and usability."
    },
    {
      title: "Estimators",
      imageSrc: "/redesign-25/pricing/Estimators.jpg",
      description: "Our team of well trained and highly experienced estimators, review and prepare detailed estimates for property restoration projects, ensuring accuracy in cost calculations for materials and labor."
    },
    {
      title: "Call Center Support",
      imageSrc: "/redesign-25/pricing/CallCenterSupport.jpg",
      description: "We provide a complete call center solution by professionally recruiting, training, and deploying a dedicated support team tailored to your business within 2 weeks. This service covers inbound/outbound customer service, technical support, and telemarketing to meet your specific operational needs.."
    },
    {
      title: "Account Receivables",
      imageSrc: "/redesign-25/pricing/AccountsReceivablesSpecialists.jpg",
      description: "Our Accounts Receivables Specialist supports business in managing invoicing, tracking payments, and ensure timely collections, to maintain a company’s cash flow."
    },
    {
      title: "Virtual Assistants",
      imageSrc: "/redesign-25/pricing/VirtualAssistants.jpg",
      description: "Our VAs offer administrative and organizational support remotely, handling tasks like email management, scheduling, and document preparation for our clients."
    },
    {
      title: "Telemarketing Assistant",
      imageSrc: "/redesign-25/pricing/TelemarketingAdmin Assistants.jpg",
      description: "Our Telemarketers/Admin Assistants provide customer outreach through calls to generate leads or sales, while also assisting with administrative tasks such as data entry, documentation and appointment setting."
    },
    {
      title: "Digital Marketers",
      imageSrc: "/redesign-25/pricing/DigitalMarketers.jpg",
      description: "Our Digital Marketers help businesses to develop and execute online marketing strategies, including SEO, social media, and content creation, to generate quality leads, increase brand visibility and drive engagement."
    },
    
 
  ];

  // Create slides with 3 items per slide for desktop
  const createSlides = () => {
    if (isMobile) {
      return niches.map(niche => [niche]);
    }
    const slides = [];
    for (let i = 0; i < niches.length; i += 3) {
      slides.push(niches.slice(i, i + 3));
    }
    return slides;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = createSlides();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      ref={ref} 
      className="relative py-20 bg-gradient-to-b from-neutral-800 to-black"
    >
      {/* Optional: Add pattern overlay */}
      <div className="absolute inset-0 bg-[url('/redesign-25/bg/vetted.svg')] opacity-10 mix-blend-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-16">
          Our range of vetted remote employees cut<br />
          across varied business needs and niches.
        </h2>

        {/* Social Media Links */}
        <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-10">
          <a href="#" className="text-white hover:text-[#FFB300]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Instagram icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-[#FFB300]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Twitter icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-[#FFB300]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* LinkedIn icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-[#FFB300]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Facebook icon */}
            </svg>
          </a>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {slideItems.map((item, itemIndex) => (
                      <NicheItem key={itemIndex} {...item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-[#FFB300]" : "bg-white"
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="/pricing-model"
            className="inline-flex items-center space-x-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3 "
          >
            <span>Check out our Pricing Model</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NicheSection;
