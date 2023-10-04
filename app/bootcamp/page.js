import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";

export default function BootCamp() {


 

  return (
    <>
    
        
    <PageHeader about={true}>
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
        <div className="max-w-6xl mx-auto px-4 justify-center align-middle lg:flex relative h-[100%] items-center mt-6 md:mt-0 ">
                {/* First Column (60% width) */}
                <div className="lg:w-4/10 pr-6 md:w-full flex flex-col">

                    <h2 className="text-2xl md:text-[55px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white ">
                        Coming <span className="text-secondary">Soon</span> 
                    </h2>
                    <p className="text-white text-sm md:text-base">
                    Get ready for an exciting journey of learning and growth! Our upcoming bootcamp is designed to equip you with the latest skills and knowledge.
                    Stay tuned for more details, and get ready to unlock new opportunities and take your skills to the next level with our upcoming bootcamp!
                    </p>
                        
                    

                </div>

                {/* Second Column (40% width) */}
                <div className="hidden lg:block lg:w-6/10 mt-8 md:mt-0">
                    <img
                        src="/our-talents.png"
                        alt="Header Image"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        {/* </div> */}
        
    </PageHeader>


    




    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
