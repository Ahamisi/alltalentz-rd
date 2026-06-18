import Image from "next/image";
import Link from "next/link";

const pricingModels = [
  {
    id: 1,
    title: "DATA ANNOTATORS",
    image: "/redesign-25/pricing/Data-Annotators.webp",
    description:
      "Clean, structured training data that powers your AI and ML models; labeled with precision so your algorithms actually learn what you need them to.",
    price: "400/mo",
    ctaLink: "/request-talent#data-annotators",
  },
  {
    id: 2,
    title: " AI/ML SPECIALISTS",
    image: "/redesign-25/pricing/AI/MLSpecialists.webp",
    description:
      "From model development to deployment, our AI/ML specialists help you move from concept to production; without the six-month search for niche technical talent.",
    price: "1,500/mo",
    ctaLink: "/request-talent#ai-ml-specialists",
  },
  {
    id: 3,
    title: "MEDICAL BILLING SPECIALISTS",
    image: "/redesign-25/pricing/MedicalBillingSpecialists.webp",
    description:
      "Accurate coding, timely claims, and a healthier revenue cycle; our medical billing specialists reduce denials and keep your cash flow moving.",
    price: "400/mo",
    ctaLink: "/request-talent#medical-billing-specialists",
  },
  {
    id: 4,
    title: "SOFTWARE DEVELOPERS",
    image: "/redesign-25/pricing/SoftwareDevelopers.webp",
    description:
      "Full-stack, front-end, or back-end; our developers build and maintain scalable applications built to your spec, your stack, and your security requirements.",
    price: "1,500/mo",
    ctaLink: "/request-talent#software-developers",
  },
  {
    id: 5,
    title: "UI/UX DESIGNERS",
    image: "/redesign-25/pricing/software-devs.webp",
    description:
      "Interfaces that make sense to real users; our UI/UX designers blend research and design to create experiences that drive product adoption and reduce churn.",
    price: "400/mo",
    ctaLink: "/request-talent#ui-ux-designers",
  },
  {
    id: 5,
    title: "ESTIMATOR",
    image: "/redesign-25/pricing/Estimators.webp",
    description:
      "Accurate, defensible project estimates that protect your margins and win bids; our Xactimate-trained estimators are built for the pace of restoration and construction.",
    price: "400/mo",
    ctaLink: "/request-talent#estimators",
  },
  {
    id: 6,
    title: "CALL CENTER SUPPORT ",
    image: "/redesign-25/pricing/CallCenterSupport.webp",
    description:
      "A professionally trained, dedicated call center team — handling inbound and outbound support, client intake, and customer service — deployed and ready within 2 weeks.",
    price: "400/mo",
    ctaLink: "/request-talent#call-center-support",
  },
  {
    id: 7,
    title: "ACCOUNT RECEIVABLES SPECIALIST",
    image: "/redesign-25/pricing/AccountsReceivablesSpecialists.webp",
    description:
      "Invoicing, payment tracking, and collections managed with precision — keeping your cash flow consistent and your receivables under control.",
    price: "400/mo",
    ctaLink: "/request-talent#account-receivables",
  },
  {
    id: 8,
    title: "VIRTUAL ASSISTANT",
    image: "/redesign-25/pricing/VirtualAssistants.webp",
    description:
      "Email, scheduling, document management, and more — our virtual assistants handle the operational tasks that slow your team down, so you can focus on what actually grows the business.",
    price: "400/mo",
    ctaLink: "/request-talent#virtual-assistant",
  },
  {
    id: 9,
    title: "CLIENT OUTREACH & ADMIN ASSISTANTS",
    image: "/redesign-25/pricing/TelemarketingAdminAssistants.webp",
    description:
      "Outbound client outreach, lead generation calls, data entry, documentation, and appointment setting — handled by trained assistants who represent your brand professionally.",
    price: "400/mo",
    ctaLink: "/request-talent#telemarketing-assistant",
  },
  {
    id: 10,
    title: "DIGITAL MARKETERS",
    image: "/redesign-25/pricing/DigitalMarketers.webp",
    description:
      "SEO, social media, content creation, and lead generation — our digital marketers execute your online strategy and bring in the visibility your business needs to grow.",
    price: "400/mo",
    ctaLink: "/request-talent#digital-marketers",
  },
  // {
  //   id: 6,
  //   title: "DESIGNERS / DEVELOPERS",
  //   image: "/redesign-25/pricing/software-devs.webp",
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
        <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">Our Pricing Model</h2>
        {/* <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          We've got the perfect pricing plan for any type of business.
        </p> */}

        <p className="text-center text-gray-700 mb-16 max-w-3xl mx-auto">
          <span className="font-semibold text-[#1A1A1A]">Every role includes: </span> highly trained
          &amp; vetted professionals · 24/7 operational support · dedicated account management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingModels.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-lg p-6"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6">
                <Image
                  src={model.image}
                  alt={model.title}
                  width={400}
                  height={200}
                  className="w-full h-[200px] object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#1A1A1A]">{model.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{model.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-gray-500 ml-2">Starting From </span>

                  <span className="text-xl font-bold text-[#1A1A1A]">${model.price}</span>
                </div>

                {/* CTA Button */}
                <Link
                  href={model.ctaLink}
                  className="block w-full py-3 px-4 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] text-md font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
                >
                  Hire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingModelList;
