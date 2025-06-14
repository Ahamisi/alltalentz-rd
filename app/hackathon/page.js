"use client";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

// Judges data object for easy updates
const judges = [
  {
    id: 1,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile",
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-gray-200"
  },
  {
    id: 2,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile", 
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-[#F99621]"
  },
  {
    id: 3,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile",
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-gray-400"
  },
  {
    id: 4,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile",
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-pink-500"
  },
  {
    id: 5,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile",
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-gray-700"
  },
  {
    id: 6,
    name: "Tommy Shelby",
    title: "Founder, CBTB Mobile",
    image: "/hackathon/judges/tommy-shelby.png",
    bgColor: "bg-[#FFB300]"
  }
];

// Rules data object
const rules = [
  {
    id: 1,
    question: "Who can participate?",
    answer: `Nigerian youth — NYSC graduates, Post-NYSC, or employable individuals.\nYou must form a team of at least 3 members to participate.`
  },
  {
    id: 2,
    question: "How to submit an entry?",
    answer: `You will submit your team registration via the Hackathon Microsite.\nDuring registration, you'll provide your team info, problem statement, and initial solution idea.`
  },
  {
    id: 3,
    question: "Submission requirements?",
    answer: `Your submission must include:\n\n- A clear problem statement\n- A proposed tech-driven solution\n- A working MVP or prototype (required for Demo Day — UI mockup only is not enough)\n- A demo presentation for final judging.`
  },
  {
    id: 4,
    question: "What are the team requirements?",
    answer: `Each team must have a minimum of 3 members.\nYou can add more members, but all must be registered as part of your team.`
  },
  {
    id: 5,
    question: "What solution types are allowed?",
    answer: `Tech-based solutions that address one of the 8 Hackathon tracks.\nYour project must be original and developed during the Hackathon period.`
  },
  {
    id: 6,
    question: "What are the rules on intellectual property?",
    answer: `All submitted solutions remain the intellectual property of the participants.\nHowever, All Talentz may highlight and promote winning projects with participant consent.`
  }
];

// Rules Modal data object - shorter statements for the modal
const rulesModal = [
  {
    id: 1,
    text: "Teams must have a minimum of 3 members."
  },
  {
    id: 2,
    text: "Participants must be employable Nigerian youth (NYSC, Post-NYSC, graduates)."
  },
  {
    id: 3,
    text: "All submissions must be original solutions — plagiarism will result in disqualification."
  },
  {
    id: 4,
    text: "Final Demo Day submissions should include a working MVP or prototype."
  },
  {
    id: 5,
    text: "Collaboration will happen via provided platforms (Slack, Teams, etc.)."
  },
  {
    id: 6,
    text: "Judging criteria: Innovation (30%), Impact (30%), Feasibility (20%), Presentation (10%), Creativity (10%)."
  }
];

// Mentorship Modal data object
const mentorshipModal = [
  {
    id: 1,
    text: "Access to industry experts across the 8 challenge tracks."
  },
  {
    id: 2,
    text: "Personalized feedback on your solution & pitch."
  },
  {
    id: 3,
    text: "A dedicated mentor will be assigned to each team during the 4-week Main Hackathon"
  },
  {
    id: 4,
    text: "Workshops on prototyping, business modeling & presentation skills."
  }
];

// FAQs data object
const faqs = [
  {
    id: 1,
    question: "How do I start?",
    answer: `Click "Apply Now" to register your team.\nFollow the instructions and complete your submission before the deadline.`
  },
  {
    id: 2,
    question: "Can I submit a custom code?",
    answer: `Yes! You are encouraged to build a real MVP or working prototype with your own code or tech stack of choice.`
  },
  {
    id: 3,
    question: "How do I win a prize?",
    answer: `Judging criteria:\n\n- Innovation (30%)\n- Impact (30%)\n- Feasibility (20%)\n- Presentation (10%)\n- Creativity (10%)\n\nYour solution should be practical, scalable, and deliver real-world value.`
  },
  {
    id: 4,
    question: "Can individuals participate alone?",
    answer: `No. You must form a team of at least 3 members to participate.`
  },
  {
    id: 5,
    question: "Can I join more than one team?",
    answer: `No. You can only participate as part of one registered team.`
  },
  {
    id: 6,
    question: "Do I need to attend Demo Day in person?",
    answer: `Demo Day will be a Hybrid event. Teams may present virtually or in-person at the designated venue in Lagos.`
  },
  {
    id: 7,
    question: "What kind of mentorship will I receive?",
    answer: `Shortlisted teams will receive guidance from industry mentors during the Hackathon period to help refine and improve their solutions.`
  },
  {
    id: 8,
    question: "Will travel or accommodation be provided?",
    answer: `For selected in-person participants, All Talentz may offer support for transportation within Lagos for Demo Day. Details will be communicated to shortlisted teams.`
  }
];

// Partners data object
const partners = [
  {
    id: 1,
    name: "PuroClean",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://puroclean.com"
  },
  {
    id: 2,
    name: "WeScope",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://wescope.com"
  },
  {
    id: 3,
    name: "ServPro",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://servpro.com"
  },
  {
    id: 4,
    name: "CleanSlate",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://cleanslate.com"
  },
  {
    id: 5,
    name: "TrueNorth",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://truenorth.com"
  },
  {
    id: 6,
    name: "365 Restoration",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://365restoration.com"
  },
  {
    id: 7,
    name: "Restoration Specialists",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://restoration-specialists.com"
  },
  {
    id: 8,
    name: "DRI",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://dri.com"
  },
  {
    id: 9,
    name: "CRDN",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://crdn.com"
  },
  {
    id: 10,
    name: "Property Damage",
    logo: "/hackathon/partners/microsoft.png",
    website: "https://property-damage.com"
  }
];

export default function Hackathon() {
  const [openRules, setOpenRules] = useState({});
  const [openFaqs, setOpenFaqs] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);

  const toggleRule = (id) => {
    setOpenRules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Add smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Head>
        <title>All Talentz Hackathon 2025 | Build Solutions That Matter</title>
        <meta name="description" content="Join Nigeria's leading tech hackathon. Build innovative solutions across 8 challenge tracks, compete for ₦10M in prizes, and connect with top industry leaders." />
        <meta name="keywords" content="hackathon, Nigeria tech, innovation challenge, tech hackathon, All Talentz, tech competition" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="All Talentz Hackathon 2025 | Build Solutions That Matter" />
        <meta property="og:description" content="Join Nigeria's leading tech hackathon. Build innovative solutions across 8 challenge tracks, compete for ₦10M in prizes, and connect with top industry leaders." />
        <meta property="og:image" content="/hackathon/alltalentz.svg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="All Talentz Hackathon 2025" />
        <meta property="twitter:description" content="Join Nigeria's leading tech hackathon. Build solutions that matter, compete for ₦10M in prizes." />
        <meta property="twitter:image" content="/hackathon/alltalentz.svg" />
      </Head>
      
      <main className="relative overflow-hidden">
      {/* Header */}
      <header className="bg-white py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/hackathon/alltalentz.svg"
              alt="All Talentz"
              width={150}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#what-is" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('what-is');
              }}
              className="text-black hover:text-[#F99621] transition-colors cursor-pointer"
            >
              About
            </a>
            <a 
              href="#prizes" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('prizes');
              }}
              className="text-black hover:text-[#F99621] transition-colors cursor-pointer"
            >
              Prize
            </a>
            <a 
              href="#challenge-tracks" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('challenge-tracks');
              }}
              className="text-black hover:text-[#F99621] transition-colors cursor-pointer"
            >
              Challenges
            </a>
            <a 
              href="#faqs" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faqs');
              }}
              className="text-black hover:text-[#F99621] transition-colors cursor-pointer"
            >
              FAQs
            </a>
            <a 
              href="#rules" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rules');
              }}
              className="text-black hover:text-[#F99621] transition-colors cursor-pointer"
            >
              Rules
            </a>
          </nav>

          {/* Register Button */}
          <Link 
            href="https://forms.office.com/r/WDsvt4BR59?origin=lprLink"
            target="_blank"
            className="hidden md:block bg-[#F99621] hover:bg-black text-white px-8 py-3 rounded-lg transition-colors"
          >
            Register
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <Image
                  src="/hackathon/alltalentz.svg"
                  alt="All Talentz"
                  width={120}
                  height={32}
                  className="h-auto"
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                <a
                  href="#what-is"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('what-is');
                    setMobileMenuOpen(false);
                  }}
                  className="text-black hover:text-[#F99621] transition-colors text-lg cursor-pointer"
                >
                  About
                </a>
                <a
                  href="#prizes"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('prizes');
                    setMobileMenuOpen(false);
                  }}
                  className="text-black hover:text-[#F99621] transition-colors text-lg cursor-pointer"
                >
                  Prize
                </a>
                <a
                  href="#challenge-tracks"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('challenge-tracks');
                    setMobileMenuOpen(false);
                  }}
                  className="text-black hover:text-[#F99621] transition-colors text-lg cursor-pointer"
                >
                  Challenges
                </a>
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('faqs');
                    setMobileMenuOpen(false);
                  }}
                  className="text-black hover:text-[#F99621] transition-colors text-lg cursor-pointer"
                >
                  FAQs
                </a>
                <a
                  href="#rules"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('rules');
                    setMobileMenuOpen(false);
                  }}
                  className="text-black hover:text-[#F99621] transition-colors text-lg cursor-pointer"
                >
                  Rules
                </a>
                <Link
                  href="https://forms.office.com/r/WDsvt4BR59?origin=lprLink"
                  target="_blank"
                  className="bg-[#F99621] hover:bg-black text-white px-8 py-3 rounded-lg transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section 
        className="relative py-16 px-4 md:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hackathon/hackathon-bg.jpg')"
        }}
      >
        {/* Background overlay for better text readability - reduced opacity */}
        <div className="absolute inset-0 bg-white/30"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-2xl md:text-md lg:text-xl font-medium text-gray-800 mb-12 leading-relaxed max-w-4xl mx-auto">
            Join us this August for Nigeria's most exciting Tech Innovation
          </h1>
          
          {/* Hackathon Logo/Title */}
          <div className="mb-16">
         
            
            {/* Large Hackathon Logo */}
            <div className="relative mb-12 flex justify-center">
              <Image
                src="/hackathon/hackathon-logo.svg"
                alt="All Talentz Hackathon Logo"
                width={800}
                height={300}
                className="max-w-full h-auto"
                priority
              />
            </div>
            
            {/* Description and CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
              <Link 
                href="https://forms.office.com/r/WDsvt4BR59?origin=lprLink"
                target="_blank"
                className="bg-[#F99621] hover:bg-black text-black hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                APPLY NOW
              </Link>
              
              <div className="max-w-md text-left md:text-left">
                <p className="text-gray-600 leading-relaxed text-md">
                  Calling all young innovators — build solutions that drive real impact, 
                  compete for a ₦10M prize, and gain global career opportunities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Image Collage */}
          <div className="flex justify-center max-w-6xl mx-auto">
            <Image
              src="/hackathon/hackathon-collage.png"
              alt="Hackathon participants and tech innovation collage"
              width={1200}
              height={400}
              className="max-w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* What is All Talentz Hackathon Section */}
      <section id="what-is" className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-4xl md:text-3xl lg:text-3xl font-normal text-gray-800 mb-8 leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            WHAT IS ALL TALENTZ HACKATHON?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
            Join us this August for Nigeria's leading Hackathon. Build solutions, win 
            ₦10M in prizes, and connect with top investors and industry leaders.
          </p>
        </div>
      </section>
      
      {/* What to Expect Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-gray-800 mb-12 text-center leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            WHAT TO EXPECT
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 md:bg-[#F8F8F8] md:p-10 text-left md:rounded-xl">
            {/* Challenge Column */}
            <div className="bg-[#F8F8F8] p-6 rounded-xl md:bg-transparent md:p-0 md:rounded-none">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                CHALLENGE
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Pick from 8 challenge tracks and build real-world tech solutions.
              </p>
              <a 
                href="#challenge-tracks" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('challenge-tracks');
                }}
                className="bg-[#F99621] hover:bg-black text-black hover:text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 inline-block cursor-pointer"
              >
                Learn more...
              </a>
            </div>
            
            {/* Rules Column */}
            <div className="bg-[#F8F8F8] p-6 rounded-xl md:bg-transparent md:p-0 md:rounded-none">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                RULES
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Simple rules, big reward. See how to qualify
              </p>
              <button 
                // href="#rules"
                // onClick={(e) => {
                //   e.preventDefault();
                //   scrollToSection('rules');
                // }}
                onClick={() => setRulesModalOpen(true)}
                className="bg-[#F99621] hover:bg-black text-black hover:text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 inline-block cursor-pointer"
              >
                Learn more...
              </button>
            </div>
            
            {/* Mentorship Column */}
            <div className="bg-[#F8F8F8] p-6 rounded-xl md:bg-transparent md:p-0 md:rounded-none">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                MENTORSHIP
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                You will create a disruptive and innovative idea for the restoration industry.
              </p>
              <button 
                onClick={() => setMentorshipModalOpen(true)}
                className="bg-[#F99621] hover:bg-black text-black hover:text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 inline-block cursor-pointer"
              >
                Learn more...
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge Tracks Section */}
      <section id="challenge-tracks" className="bg-black py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-white mb-12 text-left leading-tight text-white text-center"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            CHALLENGE TRACKS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education Track */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/education.jpg"
                  alt="Education background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* FinTech Track */}

            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/fintech.jpg"
                  alt="FinTech background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
           

            {/* Health Track */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/health.jpg"
                  alt="Education background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Governance Track */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/governance.jpg"
                  alt="Governance background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* AgriTech Track */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/agritech.jpg"
                  alt="AgriTech background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Smart Mobility Track */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
                <img
                  src="/hackathon/challenges/smart-mobility.jpg"
                  alt="Smart Mobility background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          
          {/* AI in Housing and Youth Employment in a separate centered container */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* AI in Housing */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="">
                <img
                  src="/hackathon/challenges/ai-in-housing.jpg"
                  alt="AI in Housing background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
            </div>

            {/* Youth Employment */}
            <div className="relative group overflow-hidden rounded-2xl h-[160px] cursor-pointer">
              <div className="absolute inset-0">
                <img
                  src="/hackathon/challenges/youth-employment.jpg"
                  alt="Youth Employment background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
             
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Judges Section */}
      {/* <section id="judges" className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-16">
            <h2 
              className="text-2xl md:text-3xl font-normal text-gray-800 mb-4 leading-tight"
              style={{ fontFamily: 'Digital Numbers, monospace' }}
            >
              MEET OUR
            </h2>
            <div 
              className="text-6xl md:text-8xl lg:text-9xl font-normal leading-none text-left ml-[-10px] md:ml-[-48px]"
              style={{ 
                fontFamily: 'Digital Numbers, monospace',
                color: '#F99621'
              }}
            >
              JUDGES
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {judges.map((judge) => (
              <div key={judge.id} className="relative rounded-2xl overflow-hidden group aspect-[4/5]">
                <Image
                  src={judge.image}
                  alt={judge.name}
                  fill
                  className="object-cover"
                />
                
                <div className="absolute bottom-10 right-0 ml-auto w-4/5">
                  <div className="bg-[#FFB300] text-white px-4 py-3">
                    <h3 className="font-bold text-lg text-left">{judge.name}</h3>
                  </div>
                  <div className="bg-white px-4 py-2 ml-auto w-[80%]">
                    <p className="text-gray-600 text-sm text-left">{judge.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* Hackathon Journey Section */}
      <section id="hackathon-journey" className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-gray-800 mb-16 text-center leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            HACKATHON JOURNEY
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 bg-[#F8F8F8] p-6 rounded-xl">
            {/* Teams Call Phase */}
            <div className="text-left">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                TEAMS<br />CALL:
              </h3>
              <div className="space-y-3 text-gray-600 text-sm md:text-base">
                <p>Teams register via the portal.</p>
                <p>Each team must have at least 3 members.</p>
              </div>
            </div>
            
            {/* Problem Statements Phase */}
            <div className="text-left">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                PROBLEM<br />STATEMENTS:
              </h3>
              <div className="space-y-3 text-gray-600 text-sm md:text-base">
                <p>Teams submit a written problem statement and a proposed solution (max 500 words).</p>
              </div>
            </div>
            
            {/* Teams Selection Phase */}
            <div className="text-left">
              <h3 
                className="text-lg md:text-xl font-normal text-gray-800 mb-4 leading-tight"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                TEAMS<br />SELECTION:
              </h3>
              <div className="space-y-3 text-gray-600 text-sm md:text-base">
                <p>Judges review submissions.</p>
                <p>Top 50 teams are invited to join the main hackathon phase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Phase 1 Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-gray-800 mb-12 text-left leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            PHASE 1
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* June 16 */}
            <div className="text-left">
              <div className="mb-6">
                <div 
                  className="text-lg md:text-xl font-normal text-black px-4 py-3 w-3/5 mb-2"
                  style={{ 
                    fontFamily: 'Digital Numbers, monospace',
                    backgroundColor: '#FFB300'
                  }}
                >
                  JUNE 16
                </div>
                <div 
                  className="h-2 w-3/5"
                  style={{ backgroundColor: '#727272' }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Call for submission
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Sign up for the Hackathon.
              </p>
            </div>
            
            {/* June 27 */}
            <div className="text-left">
              <div className="mb-6">
                <div 
                  className="text-lg md:text-xl font-normal text-black px-4 py-3 w-3/5 mb-2"
                  style={{ 
                    fontFamily: 'Digital Numbers, monospace',
                    backgroundColor: '#FFB300'
                  }}
                >
                  JUNE 27
                </div>
                <div 
                  className="h-2 w-3/5"
                  style={{ backgroundColor: '#727272' }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Registration Deadline
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Goodluck on your submissions!
              </p>
            </div>
            
            {/* July 2 */}
            <div className="text-left">
              <div className="mb-6">
                <div 
                  className="text-lg md:text-xl font-normal text-black px-4 py-3 w-3/5 mb-2"
                  style={{ 
                    fontFamily: 'Digital Numbers, monospace',
                    backgroundColor: '#FFB300'
                  }}
                >
                  JULY 2
                </div>
                <div 
                  className="h-2 w-3/5"
                  style={{ backgroundColor: '#727272' }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Teams Announcement
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Get ready for the main event!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Phase 2 Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-gray-800 mb-12 text-left leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            PHASE 2
          </h2>
          
          <div className="space-y-12">
            {/* Week 1 */}
            <div className="flex items-start gap-6">
              {/* Timeline Left */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: '#FFB300' }}
                  ></div>
                  <div className="w-px h-20 bg-gray-400 mt-4" style={{ borderLeft: '2px dotted #999' }}></div>
                </div>
                <div className="flex flex-col items-start">
                  <div 
                    className="text-lg font-normal text-black px-4 py-3 mb-2"
                    style={{ 
                      fontFamily: 'Digital Numbers, monospace',
                      backgroundColor: '#FFB300'
                    }}
                  >
                    WEEK 1
                  </div>
                  <div 
                    className="h-2 w-32"
                    style={{ backgroundColor: '#727272' }}
                  ></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  July 7 - 11, 2025.
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Kickoff, onboarding, agent ideation
                </p>
              </div>
              
              {/* Illustration Space */}
              <div className="w-32 h-24 flex-shrink-0 mr-8 hidden md:block">
                <Image
                  src="/hackathon/week-1.svg"
                  alt="Week 1 illustration"
                  width={128}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Week 2 */}
            <div className="flex items-start gap-6">
              {/* Timeline Left */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: '#FFB300' }}
                  ></div>
                  <div className="w-px h-20 bg-gray-400 mt-4" style={{ borderLeft: '2px dotted #999' }}></div>
                </div>
                <div className="flex flex-col items-start">
                  <div 
                    className="text-lg font-normal text-black px-4 py-3 mb-2"
                    style={{ 
                      fontFamily: 'Digital Numbers, monospace',
                      backgroundColor: '#FFB300'
                    }}
                  >
                    WEEK 2
                  </div>
                  <div 
                    className="h-2 w-32"
                    style={{ backgroundColor: '#727272' }}
                  ></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  July 14 - 18, 2025
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Tooling deep dives, prototyping
                </p>
              </div>
              
              {/* Illustration Space */}
              <div className="w-32 h-24 flex-shrink-0 mr-8 hidden md:block">
                <Image
                  src="/hackathon/week-2.svg"
                  alt="Week 2 illustration"
                  width={128}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Week 3 */}
            <div className="flex items-start gap-6">
              {/* Timeline Left */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: '#FFB300' }}
                  ></div>
                  <div className="w-px h-20 bg-gray-400 mt-4" style={{ borderLeft: '2px dotted #999' }}></div>
                </div>
                <div className="flex flex-col items-start">
                  <div 
                    className="text-lg font-normal text-black px-4 py-3 mb-2"
                    style={{ 
                      fontFamily: 'Digital Numbers, monospace',
                      backgroundColor: '#FFB300'
                    }}
                  >
                    WEEK 3
                  </div>
                  <div 
                    className="h-2 w-32"
                    style={{ backgroundColor: '#727272' }}
                  ></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  July - 21 - 25, 2025
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Testing, integration, polish
                </p>
              </div>
              
              {/* Illustration Space */}
              <div className="w-32 h-24 flex-shrink-0 mr-8 hidden md:block">
                <Image
                  src="/hackathon/week-3.svg"
                  alt="Week 3 illustration"
                  width={128}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Week 4 */}
            <div className="flex items-start gap-6">
              {/* Timeline Left */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: '#FFB300' }}
                ></div>
                <div className="flex flex-col items-start">
                  <div 
                    className="text-lg font-normal text-black px-4 py-3 mb-2"
                    style={{ 
                      fontFamily: 'Digital Numbers, monospace',
                      backgroundColor: '#FFB300'
                    }}
                  >
                    WEEK 4
                  </div>
                  <div 
                    className="h-2 w-32"
                    style={{ backgroundColor: '#727272' }}
                  ></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  July 28 - August 1, 2025
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Pitching, submission prep, dry runs
                </p>
              </div>
              
              {/* Illustration Space */}
              <div className="w-32 h-24 flex-shrink-0 mr-8 hidden md:block">
                <Image
                  src="/hackathon/week-4.svg"
                  alt="Week 4 illustration"
                  width={128}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Phase 3 Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-normal text-gray-800 mb-12 text-left leading-tight"
            style={{ fontFamily: 'Digital Numbers, monospace' }}
          >
            PHASE 3
          </h2>
          
          <div className="flex items-start gap-6">
            {/* Left Side - Date and Content */}
            <div className="flex-1">
              {/* Date Box */}
              <div className="flex flex-col items-start mb-6">
                <div 
                  className="text-lg md:text-xl font-normal text-black px-6 py-4 mb-2"
                  style={{ 
                    fontFamily: 'Digital Numbers, monospace',
                    backgroundColor: '#FFB300'
                  }}
                >
                  AUGUST 23
                </div>
                <div 
                  className="h-2 w-40"
                  style={{ backgroundColor: '#727272' }}
                ></div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Live Demo Day + Judging
              </h3>
            </div>
            
            {/* Illustration Space */}
            <div className="w-48 h-36 flex-shrink-0 mr-8 hidden md:block">
              <Image
                src="/hackathon/phase-3.svg"
                alt="Demo day illustration"
                width={192}
                height={144}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Prizes Section */}
      <section id="prizes" className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Large PRIZES Heading */}
          <div className="text-center mb-16">
            <h2 
              className="text-6xl md:text-8xl lg:text-9xl font-normal leading-none"
              style={{ 
                fontFamily: 'Digital Numbers, monospace',
                color: '#F99621'
              }}
            >
              PRIZES
            </h2>
          </div>
          
          {/* Grand Prize Section */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Grand Prize
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              ₦10,000,000 cash + Trophy + Sponsored trip to TechCrunch Disrupt 2025 in San Francisco.
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              To win, your solution must deliver impact, innovation, and scalability.
            </p>
          </div>
          
          {/* Prize Icons Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
            <div className="flex items-center gap-4">
              <Image
                src="/hackathon/money.svg"
                alt="Money icon"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-800">₦10,000,000</span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/hackathon/trophy.svg"
                alt="Trophy icon"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-800">Trophy</span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/hackathon/trip.svg"
                alt="Trip icon"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-800">Trip to US</span>
            </div>
          </div>
          
          {/* Runner-up Prizes */}
          <div className="bg-[#F8F8F8] p-8 md:p-10 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* 1st Runner up */}
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-3">1st Runner up</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ₦2,000,000 cash prize + trophy + spotlight in All Talentz talent network.
                </p>
              </div>
              
              {/* 2nd Runner up */}
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-3">2nd Runner up</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ₦1,000,000 cash prize + trophy + media spotlight.
                </p>
              </div>
              
              {/* Best Integration */}
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Best integration</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Special recognition for the most creative and forward-thinking solution — mentorship + networking opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rules and FAQs Section */}
      <section id="rules-and-faqs" className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Rules Column */}
            <div id="rules">
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-normal leading-none mb-12"
                style={{ 
                  fontFamily: 'Digital Numbers, monospace',
                  color: '#F99621'
                }}
              >
                RULES
              </h2>
              
              <div className="space-y-6">
                {rules.map((rule) => (
                  <div key={rule.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-medium text-gray-800 pr-4">
                        {rule.question}
                      </h3>
                      <button 
                        onClick={() => toggleRule(rule.id)}
                        className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-500 transition-colors"
                      >
                        <span className="text-black text-sm font-bold">
                          {openRules[rule.id] ? '−' : '+'}
                        </span>
                      </button>
                    </div>
                    {openRules[rule.id] && (
                      <div className="mt-4 pr-12">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {rule.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQs Column */}
            <div id="faqs">
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-normal leading-none mb-12"
                style={{ 
                  fontFamily: 'Digital Numbers, monospace',
                  color: '#F99621'
                }}
              >
                FAQS
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-medium text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <button 
                        onClick={() => toggleFaq(faq.id)}
                        className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-500 transition-colors"
                      >
                        <span className="text-black text-sm font-bold">
                          {openFaqs[faq.id] ? '−' : '+'}
                        </span>
                      </button>
                    </div>
                    {openFaqs[faq.id] && (
                      <div className="mt-4 pr-12">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Learn More Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setRulesModalOpen(true)}
              className="bg-[#F99621] hover:bg-black text-black hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
            >
              Learn more...
            </button>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      {/* <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-normal leading-none"
              style={{ 
                fontFamily: 'Digital Numbers, monospace',
                color: '#F99621'
              }}
            >
              OUR PARTNERS
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center">
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-4">
                <a 
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-75 transition-opacity duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={80}
                    className="object-contain max-w-full h-auto grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Acquire Innovators Section */}
      <section className="bg-white py-16 px-4 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left side - Illustration */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/hackathon/hackathon-footer.jpg"
                alt="AI Robot Illustration"
                width={600}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-1/2 md:pl-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 leading-tight">
                Acquire new & vibrant innovators.
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Build your dream team without burning through your funding.
              </p>
              <a 
                href="https://forms.office.com/r/WDsvt4BR59?origin=lprLink"
                target="_blank"
               
                className="inline-block bg-[#FF9500] hover:bg-[#FF9500]/90 text-black font-medium px-8 py-4 rounded-lg text-lg transition-colors cursor-pointer"
              >
                Register to attend
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#131313] py-6">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="">
                    {/* third Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="col-span-1 flex md:block justify-center md:justify-self-auto">
                            <img src="/all-talents-footer.svg" alt="Footer Logo" />
                        </div>
                        <div className="col-span-1 text-white text-center text-sm md:text-auto">
                            © {new Date().getFullYear()} All Talentz LLC. All rights reserved.
                        </div>
                        <div className="col-span-1 flex justify-center items-center gap-[30px]">
                            {/* Add your social media icons here */}
                            <Link href="https://instagram.com/all_talentz" target='_blank'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18.2561" cy="17.7708" r="14.6511" fill="#F99621"/>
                                <path d="M18.256 10.5639C20.6032 10.5639 20.8813 10.5728 21.8082 10.6151C22.6653 10.6542 23.1307 10.7974 23.4405 10.9178C23.8508 11.0773 24.1437 11.2678 24.4513 11.5754C24.7589 11.883 24.9494 12.1758 25.1088 12.5862C25.2292 12.8959 25.3724 13.3614 25.4115 14.2185C25.4538 15.1454 25.4628 15.4234 25.4628 17.7706C25.4628 20.1178 25.4538 20.3959 25.4115 21.3228C25.3724 22.1799 25.2292 22.6453 25.1088 22.9551C24.9494 23.3654 24.7589 23.6583 24.4513 23.9659C24.1437 24.2735 23.8508 24.464 23.4405 24.6234C23.1307 24.7438 22.6653 24.887 21.8082 24.9261C20.8814 24.9684 20.6034 24.9774 18.256 24.9774C15.9086 24.9774 15.6307 24.9684 14.7038 24.9261C13.8467 24.887 13.3813 24.7438 13.0715 24.6234C12.6612 24.464 12.3684 24.2735 12.0608 23.9659C11.7532 23.6583 11.5626 23.3654 11.4032 22.9551C11.2828 22.6453 11.1396 22.1799 11.1005 21.3228C11.0582 20.3959 11.0492 20.1178 11.0492 17.7706C11.0492 15.4234 11.0582 15.1454 11.1005 14.2185C11.1396 13.3614 11.2828 12.8959 11.4032 12.5862C11.5626 12.1758 11.7531 11.883 12.0608 11.5754C12.3684 11.2678 12.6612 11.0773 13.0715 10.9178C13.3813 10.7974 13.8467 10.6542 14.7038 10.6151C15.6308 10.5728 15.9088 10.5639 18.256 10.5639ZM18.2602 8.97998C15.8686 8.97998 15.5692 8.9901 14.6316 9.03288C13.696 9.07556 13.0569 9.22417 12.4978 9.44146C11.9197 9.66611 11.4295 9.96669 10.9407 10.4554C10.452 10.9441 10.1515 11.4344 9.92685 12.0124C9.70952 12.5716 9.56091 13.2106 9.51823 14.1463C9.47545 15.0839 9.46533 15.3832 9.46533 17.7706C9.46533 20.158 9.47545 20.4574 9.51823 21.395C9.56091 22.3307 9.70952 22.9697 9.92685 23.5288C10.1515 24.1069 10.452 24.5971 10.9407 25.0859C11.4295 25.5746 11.9197 25.8751 12.4978 26.0998C13.0569 26.3171 13.696 26.4657 14.6316 26.5084C15.5692 26.5512 15.8686 26.5613 18.256 26.5613C20.6434 26.5613 20.9428 26.5512 21.8804 26.5084C22.8161 26.4657 23.4551 26.3171 24.0142 26.0998C24.5923 25.8751 25.0825 25.5746 25.5713 25.0859C26.06 24.5971 26.3605 24.1069 26.5852 23.5288C26.8025 22.9697 26.9511 22.3307 26.9938 21.395C27.0366 20.4574 27.0467 20.158 27.0467 17.7706C27.0467 15.3832 27.0366 15.0839 26.9938 14.1463C26.9511 13.2106 26.8025 12.5716 26.5852 12.0124C26.3605 11.4344 26.06 10.9441 25.5713 10.4554C25.0825 9.96669 24.5923 9.66611 24.0142 9.44146C23.4551 9.22417 22.8161 9.07556 21.8804 9.03288C20.9428 8.9901 20.6434 8.97998 18.256 8.97998Z" fill="#131313"/>
                                <path d="M18.2602 13.2607C15.7671 13.2607 13.7461 15.2818 13.7461 17.7748C13.7461 20.2679 15.7671 22.289 18.2602 22.289C20.7533 22.289 22.7744 20.2679 22.7744 17.7748C22.7744 15.2818 20.7533 13.2607 18.2602 13.2607ZM18.2602 20.7051C16.6419 20.7051 15.33 19.3932 15.33 17.7748C15.33 16.1565 16.6419 14.8446 18.2602 14.8446C19.8785 14.8446 21.1904 16.1565 21.1904 17.7748C21.1904 19.3932 19.8785 20.7051 18.2602 20.7051Z" fill="#131313"/>
                                <path d="M24.0072 13.0793C24.0072 13.6619 23.5349 14.1342 22.9523 14.1342C22.3698 14.1342 21.8975 13.6619 21.8975 13.0793C21.8975 12.4967 22.3698 12.0244 22.9523 12.0244C23.5349 12.0244 24.0072 12.4967 24.0072 13.0793Z" fill="#131313"/>
                            </svg>
                            </Link>

                            <Link href="https://twitter.com/AllTalentz" target='_blank'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18.4187" cy="17.7708" r="14.6511" fill="#F99621"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.2093 12.1365C26.5629 12.4237 25.8673 12.617 25.1377 12.7044C25.8826 12.2578 26.4545 11.5511 26.7235 10.709C26.0273 11.1227 25.2544 11.4222 24.4334 11.5845C23.7753 10.8836 22.8371 10.4453 21.8004 10.4453C19.8086 10.4453 18.1936 12.0603 18.1936 14.0522C18.1936 14.3346 18.2258 14.6101 18.2873 14.8743C15.2893 14.7243 12.6318 13.288 10.8527 11.1057C10.5421 11.6384 10.3645 12.2578 10.3645 12.9188C10.3645 14.17 11.0004 15.274 11.969 15.921C11.3772 15.9022 10.8216 15.7399 10.3347 15.4697V15.5149C10.3347 17.2629 11.5787 18.7203 13.2278 19.0526C12.9254 19.1346 12.6066 19.1791 12.2778 19.1791C12.0452 19.1791 11.819 19.1563 11.5987 19.1141C12.0575 20.5469 13.3901 21.59 14.9682 21.6193C13.7341 22.5862 12.1788 23.1634 10.4888 23.1634C10.1969 23.1634 9.9098 23.1464 9.62793 23.1124C11.2242 24.1356 13.1199 24.7333 15.1569 24.7333C21.7911 24.7333 25.419 19.2372 25.419 14.4712C25.419 14.3147 25.4161 14.1588 25.4085 14.0047C26.114 13.4949 26.7258 12.8597 27.2093 12.1365Z" fill="#131313"/>
                                </svg>
                            </Link>

                            <Link href="https://www.linkedin.com/company/all-talentz/" target='_blank'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="17.5828" cy="18.0276" r="14.6511" fill="#F99621"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7556 10.91C13.7556 11.8221 13.0611 12.5602 11.975 12.5602C10.9313 12.5602 10.2368 11.8221 10.2583 10.91C10.2368 9.95352 10.9313 9.23688 11.9958 9.23688C13.0611 9.23688 13.7348 9.95352 13.7556 10.91ZM10.3456 24.488V13.8639H13.6474V24.4873H10.3456V24.488Z" fill="#131313"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2943 17.2545C16.2943 15.9294 16.2507 14.7996 16.207 13.8654H19.075L19.2274 15.3209H19.2926C19.7271 14.6472 20.8132 13.627 22.5729 13.627C24.7451 13.627 26.3745 15.0609 26.3745 18.1881V24.4895H23.0726V18.6019C23.0726 17.2324 22.5951 16.2988 21.4002 16.2988C20.4875 16.2988 19.9448 16.9288 19.7278 17.5366C19.6405 17.7542 19.5975 18.0578 19.5975 18.3627V24.4895H16.2957V17.2545H16.2943Z" fill="#131313"/>
                            </svg>

                            </Link>



                        



                            <Link href="https://www.facebook.com/Alltalentz" target='_blank'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="17.7444" cy="17.7708" r="14.6511" fill="#F99621"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.6379 12.6117C21.1813 12.5204 20.5645 12.4522 20.1767 12.4522C19.1264 12.4522 19.0582 12.9088 19.0582 13.6394V14.94H21.6835L21.4547 17.6341H19.0582V25.8286H15.7711V17.6341H14.0815V14.94H15.7711V13.2736C15.7711 10.991 16.8439 9.7124 19.5374 9.7124C20.4732 9.7124 21.1582 9.84939 22.0483 10.032L21.6379 12.6117Z" fill="#131313"/>
                                </svg>
                            </Link>
                            {/* Add more social media icons as needed */}
                        </div>
                    </div>
                </div>    


         
        </div>
      </footer>

      {/* Rules Modal */}
      {rulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div 
            className="rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{
            //   backgroundImage: "url('/hackathon/bg-texture.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#131313'
            }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6">
              <div className="flex-1"></div>
              <h2 
                className="text-4xl md:text-5xl font-normal text-white text-center flex-1"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                RULES
              </h2>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => setRulesModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rulesModal.map((rule) => (
                  <div key={rule.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Orange star icon */}
                    <div className="mb-4">
                      <Image
                        src="/hackathon/icons/star.svg"
                        alt="Star icon"
                        width={24}
                        height={24}
                      />
                    </div>
                    
                    {/* Rule content */}
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">
                      {rule.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Modal */}
      {mentorshipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div 
            className="rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{
            //   backgroundImage: "url('/hackathon/bg-texture.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#131313'
            }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6">
              <div className="flex-1"></div>
              <h2 
                className="text-4xl md:text-5xl font-normal text-white text-center flex-1"
                style={{ fontFamily: 'Digital Numbers, monospace' }}
              >
                MENTORSHIP
              </h2>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => setMentorshipModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentorshipModal.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Orange star icon */}
                    <div className="mb-4">
                      <Image
                        src="/hackathon/icons/star.svg"
                        alt="Star icon"
                        width={24}
                        height={24}
                      />
                    </div>
                    
                    {/* Mentorship content */}
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
} 