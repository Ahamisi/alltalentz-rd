import Link from 'next/link';

const pricingModels = [
  {
    id: 1,
    title: "ESTIMATOR",
    image: "/redesign-25/pricing/estimator.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  {
    id: 2,
    title: "VIRTUAL ASSISTANT",
    image: "/redesign-25/pricing/virtual-assistants.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  {
    id: 3,
    title: "ACCOUNT RECEIVABLES",
    image: "/redesign-25/pricing/account-reciveables.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  {
    id: 4,
    title: "DIGITAL MARKETERS",
    image: "/redesign-25/pricing/digital-marketer.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  {
    id: 5,
    title: "TELEMARKETING/ADMIN ASSISTANTS",
    image: "/redesign-25/pricing/telemarketer.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  {
    id: 6,
    title: "DESIGNERS / SOFTWARE DEVELOPERS",
    image: "/redesign-25/pricing/software-devs.jpg",
    description: "Our range of vetted remote employees cut across varied business needs and niches, varied business needs and niches.",
    price: "3200.00",
    benefits: [
      "Highly trained Estimators",
      "24/7 supports",
      "24/7 supports"
    ]
  },
  
];

const PricingModelList = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">
          Our Pricing Model
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We've got the perfect pricing plan for your business to manage all your restoration documentations and claims
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
                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    ${model.price}
                  </span>
                  <span className="text-gray-500 ml-2">(Starting Price)</span>
                </div>

                {/* CTA Button */}
                <Link 
                  href="/request-talent" 
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
