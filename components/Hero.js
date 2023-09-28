import Link from "next/link";
import Header from "./HeaderHome";

import Btn from "@/components/Btn";
import HeaderText from "@/components/HeaderText";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-top bg-no-repeat px-[20px] md:px-0"
      style={{ backgroundImage: "url('/alltalentz-homebg.jpg')" }}
    >
          {/* <div className="md:h-[20px]"></div> */}
          <Header/>


    {/* bg-gradient-to-b from-transparent to-black */}

      <div className="absolute inset-0 
      " style={{
        backgroundColor: 'rgba(0, 0, 0, 0.60)'
      }}></div>
      <br/>
      <div className="relative h-screen flex flex-col px-2 md:px-0 items-center justify-center text-white py-10">

        <h1 className="text-2xl md:text-[65px] md:font-[700] md:leading-[80px] font-bold mb-6 text-center">
          Scale up your  <span className="text-secondary">business operations</span>
          <br />
          with the right remote talents.
        </h1>
        <Btn text="Find Talent" link="/request-talent?popup=true"/>

        {/* <Link href="/request-talent" className="bg-secondary text-black text-1xl px-[63px] py-[23px] mb-8 text-[20px] hover:bg-white">
          Find Talent
        </Link> */}
        <p className="text-[#FEF5E9] text-md md:text-[20px] text-center max-w-3xl mt-6 md:mt-[40px]">
          Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.
        </p>
      </div>
    </section>
  );
};

export default Hero;
