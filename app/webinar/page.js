// pages/index.js
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import WebinarFaq from "@/components/webinar/Faq";
import Hero from "@/components/webinar/Hero";
export default function Home() {
  return (
    <section className={`relative  bg-cover bg-center bg-no-repeat mt-[0px] px-0  xl:px-0 bg-white font-montserrat`}>
        <Header theme="light"/>
        <Hero />
            {/* svg home wrapper */}
    <section className="md-padding relative bg-cover bg-center bg-no-repeat py-[30px] md:py-[128px] bg-[#282828] px-[15px] md:px-0">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}



        <div className="py-16 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Meet the Speakers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 text-center lg:w-[70%] lg:mx-auto">
            

                </div>  

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 text-center mt-[30px] md:mt-[60px] lg:w-[70%] lg:mx-auto">

                    <div className="">
                        <img
                            src='/sadiq-isu.png'
                            alt='Sadiq Isu'
                            className="mx-auto rounded-[12px] h-auto w-auto md:h-[403px] md:w-[230px]"
                        />
                        <h3 className="text-lg md:text-[35px] font-semibold mt-5 md:leading-[40px]">Sadiq <br/>Isu&nbsp;<span className="text-[12px]">MBA</span></h3>
                        <p className="text-[16px] text-secondary">Founder &amp; CEO</p>
                    </div>

                

                    <div className="">
                        <img
                            src='/michael-nwoseh.png'
                            alt='Michael Nwoseh'
                            className="mx-auto rounded-[12px] h-auto w-auto md:h-[403px] md:w-[230px]"
                        />
                        <h3 className="text-lg md:text-[35px] font-semibold mt-5 md:leading-[40px]">Michael <br/>Nwoseh </h3>
                        <p className="text-[16px] text-secondary">Business and Digital Solutions Director</p>
                    </div>


                    <div className="">
                        <img
                            src='/sam-akingbade.png'
                            alt='Samuel Akingbade'
                            className="mx-auto rounded-[12px] h-auto w-auto md:h-[403px] md:w-[230px]"
                        />
                        <h3 className="text-lg md:text-[35px] font-semibold mt-5 md:leading-[40px]">Samuel <br/>Akingbade </h3>
                        <p className="text-[16px] text-secondary">Head of Product & Marketing</p>
                    </div>

                

                  




                </div>  
                
          </div>
        </div>


    </section>


    <section className="bg-[#FEF5E9] px-8 md:px-[120px] py-[83px]">
        <div className="mb-[48px]">
            <h2 className="text-[#121212] font-bold text-2xl md:text-4xl ">In this free webinar, you will learn: </h2>
        </div>
        <div>
            <ul className="text-[#4C4C4C] list-disc">
                <li className="mb-5">Understand the customer journey and identify where leads are slipping away. </li>
                <li className="mb-5">How to close deals faster and more efficiently. </li>
                <li className="mb-5">Understand how various digital marketing channels work.  </li>
            </ul>
        </div>
    </section>


    <WebinarFaq/>


    <section className="px-[30px] md:px-0 bg-[#131313]">
        <MainFooter/>
    </section>





    </section>
    
  );
}
