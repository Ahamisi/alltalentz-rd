import Link from "next/link";
import Header from "./Header";
import Btn from "@/components/Btn";
import HeaderText from "@/components/HeaderText";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/alltalentz-bg.jpg')" }}
    >
          {/* <div className="md:h-[50px]"></div> */}
          <Header/>


    {/* bg-gradient-to-b from-transparent to-black */}

      <div className="absolute inset-0 
      " style={{
        backgroundColor: 'rgba(0, 0, 0, 0.60)'
      }}></div>
      <div className="relative  h-screen inset-0 flex flex-col px-2 md:px-0 items-center justify-center md:mt-[-35px] text-white">
      {/* <HeaderText variant='h1' otherCSS= 'text-center'>
          Scale up your <span className="text-secondary">business operations</span>   <br />
          with the right remote talents.
        </HeaderText> */}
        <h1 className="text-3xl md:text-[65px] md:font-[700] md:leading-[80px] font-bold mb-6 text-center">
          Scale up your <span className="text-secondary">business operations</span>
          <br />
          with the right remote talents.
        </h1>
        <Btn text="Find Talent" link="/request-talent"/>

        {/* <Link href="/request-talent" className="bg-secondary text-black text-1xl px-[63px] py-[23px] mb-8 text-[20px] hover:bg-white">
          Find Talent
        </Link> */}
        <p className="text-[#FEF5E9] text-xl md:text-[20px] text-center max-w-3xl mt-[40px]">
          Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.
        </p>
      </div>
    </section>
  );
};

export default Hero;
