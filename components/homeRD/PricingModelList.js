import Link from 'next/link';

const pricingModels = [
  {
    id: 1,
    title: "DATA ANNOTATORS",
    image: "/redesign-25/pricing/Data Annotators.jpg",
    description: "Our skilled Data Annotators meticulously label and categorize data, such as images, text, and audio, to create high-quality, structured datasets essential for training and improving machine learning models.",
    price: "400-1600",
    benefits: [
      "Highly trained Data Annotators",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#data-annotators"
  },
  {
    id: 2,
    title: " AI/ML SPECIALISTS",
    image: "/redesign-25/pricing/AI/MLSpecialists.jpg",
    description: "Our AI/ML Specialists design, build, and deploy artificial intelligence and machine learning models to solve complex business challenges, automate processes, and extract valuable insights from your data. ",
    price: "1500-2500",
    benefits: [
      "Highly trained AI/ML Specialists",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#ai-ml-specialists"
  },
  {
    id: 3,
    title: "MEDICAL BILLING SPECIALISTS",
    image: "/redesign-25/pricing/MedicalBillingSpecialists.jpg",
    description: "Our Medical Billing Specialists manage healthcare billing processes, handle insurance claims, and ensure accurate coding to streamline revenue cycles and maintain compliance for medical practices. ",
    price: "400-1600",
    benefits: [
      " Highly trained Medical Billing Specialists ",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#medical-billing-specialists"
  },
  {
    id: 4,
    title: "SOFTWARE DEVELOPERS",
    image: "/redesign-25/pricing/SoftwareDevelopers.jpg",
    description: "Our Software Developers (a dedicated card for this role) analyze requirements to build, test, and maintain scalable software applications and systems, ensuring they are efficient, secure, and meet user needs.",
    price: "1500-2500",
    benefits: [
      "Highly trained Software Developers",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#software-developers"
  },
  {
    id: 5,
    title: "UI/UX DESIGNERS",
    image: "/redesign-25/pricing/software-devs.jpg",
    description: "Our UI/UX Designers create intuitive and engaging user interfaces and experiences for digital products, conducting user research and designing workflows to enhance customer satisfaction and usability.",
    price: "400-1600",
    benefits: [
      "Highly trained UI/UX Designers",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#ui-ux-designers"
  },
  {
    id: 5,
    title: "ESTIMATOR",
    image: "/redesign-25/pricing/Estimators.jpg",
    description: "Our team of well trained and highly experienced estimators, review and prepare detailed estimates for property restoration projects, ensuring accuracy in cost calculations for materials and labor.",
    price: "400-1600",
    benefits: [
      "Highly trained Estimators",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#estimators"
  },
  {
    id: 6,
    title: "CALL CENTER SUPPORT ",
    image: "/redesign-25/pricing/CallCenterSupport.jpg",
    description: "We provide a complete call center solution by professionally recruiting, training, and deploying a dedicated support team tailored to your business within 2 weeks. This service covers inbound/outbound customer service, technical support, and telemarketing to meet your specific operational needs.",
    price: "400-1600",
    benefits: [
      "A Professionally Trained Call Center Team ",
      "24/7 Operational Support",
      "Vetted and Managed Talents"
    ],
    ctaLink: "/request-talent#call-center-support"
  },
  {
    id: 7,
    title: "ACCOUNT RECEIVABLES SPECIALIST",
    image: "/redesign-25/pricing/AccountsReceivablesSpecialists.jpg",
    description: "Our Accounts Receivables Specialist supports businesses in managing invoicing, tracking payments, and ensure timely collections, to maintain a company’s cash flow.",
    price: "400-1600",
    benefits: [
      "Highly trained Account Receivables Specialists",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#account-receivables"
  },
  {
    id: 8,
    title: "VIRTUAL ASSISTANT",
    image: "/redesign-25/pricing/VirtualAssistants.jpg",
    description: "Our VAs offer administrative and organizational support remotely, handling tasks like email management, scheduling, and document preparation for our clients.",
    price: "400-1600",
    benefits: [
      "Well trained Virtual Assistants",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#virtual-assistant"
  },
  {
    id: 9,
    title: "TELEMARKETING/ADMIN ASSISTANTS",
    image: "/redesign-25/pricing/TelemarketingAdmin Assistants.jpg",
    description: "Our Telemarketers/Admin Assistants provide customer outreach through calls to generate leads or sales, while also assisting with administrative tasks such as data entry, documentation and appointment setting.",
    price: "400-1600",
    benefits: [
      "Highly trained Telemarketers",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#telemarketing-assistant"
  },
  {
    id: 10,
    title: "DIGITAL MARKETERS",
    image: "/redesign-25/pricing/DigitalMarketers.jpg",
    description: "Our Digital Marketers help businesses to develop and execute online marketing strategies, including SEO, social media, and content creation, to generate quality leads, increase brand visibility and drive engagement.",
    price: "400-1600",
    benefits: [
      "Highly trained Digital Marketers",
      "24/7 support",
      "Vetted Talents"
    ],
    ctaLink: "/request-talent#digital-marketers"
  },
  // {
  //   id: 6,
  //   title: "DESIGNERS / DEVELOPERS",
  //   image: "/redesign-25/pricing/software-devs.jpg",
  //   description: "Our highly experienced team of designers and software engineers, design, develop, test, and maintain software applications and systems on behalf of our clients, ensuring they meet user needs and performance requirements.",
  //   price: "1500-2500",
  //   benefits: [
  //     "Highly trained Software Developers",
  //     "24/7 support",
  //     "Vetted Talents"
  //   ],
  //   ctaLink: "/request-talent#designers-and software developers"
  // },
  
];

const PricingModelList = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">
          Our Pricing Model
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We've got the perfect pricing plan for any type of business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingModels.map((model) => (
            <div 
              key={model.id}
              className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-lg p-6"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6">
                <img 
                  src={model.image} 
                  alt={model.title}
                  className="w-full h-[200px] object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {model.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {model.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                <span className="text-gray-500 ml-2">Starting From </span>

                  <span className="text-xl font-bold text-[#1A1A1A]">
                    ${model.price}
                  </span>
                </div>

                {/* CTA Button */}
                <Link 
                  href={model.ctaLink} 
                  className="block w-full py-3 px-4 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] text-md font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
                >
                  Hire Now
                </Link>

                {/* Benefits */}
                <div className="pt-4">
                  <h4 className="text-[#1A1A1A] text-xl font-semibold mb-6">
                    What you will get
                  </h4>
                  <ul className="space-y-4">
                    {model.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-600 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingModelList;
