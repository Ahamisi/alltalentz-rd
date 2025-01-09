import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ConferenceVideo";
import Milestone from "@/components/homeRD/Milestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/homeRD/ContactForm";

const benefits = [
  {
    icon: "/icons/cost-effectiveness.svg",
    title: "Cost-Effectiveness",
    description: "Hiring African talent offers significant cost savings without compromising quality. By tapping into a unique pool of skilled African professionals, operational costs can be greatly reduced while at the same time increasing efficiency."
  },
  {
    icon: "/icons/diverse-skill.svg",
    title: "Diverse Skillset",
    description: "African talent brings a unique blend of skills and perspectives to the table. Raised in diverse cultural and economic environments, we often develop strong problem-solving and adaptability skills naturally. This diversity fuels innovation and drives business growth."
  },
  {
    icon: "/icons/cultural-compatibility.svg",
    title: "Cultural Compatibility",
    description: "African professionals are increasingly exposed to global cultures, making us well-suited for international teams. With strong interpersonal skills and a deep understanding of different cultural nuances, seamless collaboration with colleagues from around the world is guaranteed."
  },
  {
    icon: "/icons/language-proficiency.svg",
    title: "Language Proficiency",
    description: "Many African professionals are multilingual, proficient particularly in English language. This linguistic diversity facilitates effective communication with clients and colleagues worldwide, breaking down language barriers and fostering stronger business relationships."
  },
  {
    icon: "/icons/skilled-workforce.svg",
    title: "Skilled Workforce",
    description: "We are experiencing a rapid growth in skilled professionals, particularly in technology, finance, and healthcare. By hiring African talent, you gain access to a highly skilled workforce that can contribute tremendously to your organization's success!"
  },
  {
    icon: "/icons/discipline-talents.svg",
    title: "Discipline",
    description: "Discipline guides our work. We avoid the pitfalls of over-engineering and unnecessary features, maintaining a clear and focused approach. We ensure that every decision is made with purpose and precision."
  }
];

const Benefits = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A]">
          Benefits of Hiring African Talents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg border border-[#EBEBF0] bg-white hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <img 
                  src={benefit.icon} 
                  alt={benefit.title}
                  className="w-16 h-16"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function WhyAfrica() {
  const services = [
    'Estimators ',
    'Administrative Assistants ',
    'Virtual Assistants ',
    'Telemarketing Assistant ',
    'Digital Marketers',
    'Account Receivables ',
    'Designers / Software Developers ',
    'Quick book Specialists ',
    'Compliance Specialists',
  ];

  return (
    <>
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
            {/* Left Column */}
            <div className="lg:w-[50%] flex flex-col space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                  Why African <span className="text-[#FFB300]">Talents</span>
                </h1>

                     
                <p className="text-white text-md md:text-lg font-light leading-relaxed max-w-xl">
                Africa is a continent of immense potential, home to a diverse and dynamic workforce. Our people are known for our exceptional work ethic, strong problem-solving skills, and high adaptability. We are quick learners, eager to embrace new challenges. We strive for excellence, knowledge and we never back down from an opportunity to show a wealth of skill and intellect. 

                <br/> <br/>
                By partnering with us, you gain access to a global talent pool that can help you achieve your business objectives. Our people are ready to contribute to your success, offering a unique blend of skills, cultural perspectives, and a fresh approach to problem-solving. 

                </p>

              
                <a href="/request-talent" className="bg-[#F99621] hover:bg-white text-[#121212] px-[63px] py-[23px] transition duration-300 w-fit">
                Hire Talents
              </a>
  
            </div>


            {/* Right Column - Map */}
            <div className="hidden lg:block lg:w-[50%] pl-12">
                <img
                    src="/redesign-25/africa-map.png"
                    alt="Success Stories"
                    className="w-full h-auto object-contain"
                    // className="w-full h-auto object-contain"
                />
            </div>
        </div>
    </PageHeader>

    <Benefits />

    {/* Contact Form Section */}
    <section
      className="relative bg-white py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: 'url(/alltalentz-white-frame.svg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:w-1/2 bg-black rounded-3xl p-12 text-white">
            <p className="text-[#F99621] mb-2">Get in Touch</p>
            <h2 className="text-3xl font-bold mb-12">We will like to hear from you</h2>

            {/* Mail Section */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <img src="/icons/Mailbox.svg" alt="Mail" className="w-8 h-8" />
                <div>
                  <h3 className="text-xl mb-2">Send us a Mail</h3>
                  <p className="text-white-800 opacity-70 mb-1">Our friendly team is here to help. Send us a mail;</p>
                  <a href="mailto:info@alltalentz.com" className="text-white">info@alltalentz.com</a>
                </div>
              </div>
            </div>

            {/* Visit Us Section */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <img src="/icons/Home.svg" alt="Location" className="w-8 h-8" />
                <div>
                  <h3 className="text-xl mb-2">Visit Us</h3>
                  <p className="text-white-800 opacity-70 mb-2">Say hello to us at our head office</p>
                  <p className="mb-2">2020 Brice Rd, Reynolds-burg, OH 43068, United States (USA)</p>
                  <p>151 Herbert Macaulay Way, Yaba, Lagos. (Nigeria)</p>
                </div>
              </div>
            </div>

            {/* Phone Section */}
            <div>
              <div className="flex items-start gap-4">
                <img src="/icons/Phone.svg" alt="Phone" className="w-8 h-8" />
                <div>
                  <h3 className="text-xl mb-2">Phone</h3>
                  <p className="text-white-800 opacity-70 mb-2">Mon - Fri from 8am-5pm</p>
                  <p className="mb-1">USA: +1 614-502-1440</p>
                  <p>Nigeria: +1 614-502-1440</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-1/2">
            <ContactForm services={services} />
          </div>
        </div>
      </div>
    </section>

    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>
    </>
  )
}
