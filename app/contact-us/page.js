import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ConferenceVideo";
import Milestone from "@/components/homeRD/Milestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/homeRD/ContactForm";



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
      <PageHeader showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
            {/* Left Column */}
            <div className="lg:w-[40%] flex flex-col">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                Say <span className="text-[#FFB300]">Hello</span>
                </h1>
                    
                <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
                    Feel Free to send us a message, call us or visit our office or drop us an email anytime.  We’d love to hear from you.
                </p><br/>

            </div>

            {/* Right Column - Map */}
            <div className="hidden lg:block lg:w-[60%] pl-12">
                <img
                    src="/redesign-25/say-hello.png"
                    alt="Success Stories"
                    className="w-full h-[400px] object-contain"
                />
            </div>
        </div>
    </PageHeader>


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
