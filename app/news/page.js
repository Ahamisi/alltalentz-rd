import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";



export default function News() {




  return (
    <>


    
    <section>
        <PageHeader>
            {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
                <div className="max-w-6xl mx-auto px-4 py-12 md:flex relative h-fit mt-0 items-center ">
                    {/* First Column (60% width) */}
                    <div className="md:w-6/10 pr-6 md:w-full">
                        <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">
                        Talent <span className="text-secondary">Buzz</span>
                        </h2>
                        <p className="text-white text-md">
                        Learn about our latest developments and how they can benefit your business growth. We provide valuable insights and tips to help you optimize your operations.
                        </p>
                      
                    </div>

                    {/* Second Column (40% width) */}
                    <div className="hidden md:block md:w-4/10 mt-8 md:mt-0">
                        <img
                            src="/our-talents.png"
                            alt="All Talents Africa"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            {/* </div> */}
            
        </PageHeader>
    </section>






    <section className="relative bg-cover bg-center bg-no-repeat py-[128px] bg-[#0E0E0E]" style={{backgroundImage: "url('/rest-home.svg')"}}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-secondary">
            Stories
          </h2>
            <Blog/>
        </div>      
    </section>


 


    <section>
      <MainFooter/>
    </section>




    
    </>
  )
}
