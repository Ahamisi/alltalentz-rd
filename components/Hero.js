import Link from "next/link";
import Header from "./Header";
const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
    <Header/>

      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
      <div className="relative inset-0 h-[100%] flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl md:text-6xl font-bold mb-6 text-center">
          Scale up your <span className="text-secondary">business operations</span>
          <br />
          with the right remote talents.
        </h1>
        <Link href="/request-talent" className="bg-secondary text-white py-4 px-8 text-1xl  mb-8">
          Find Talent
        </Link>
        <p className="text-[#FEF5E9] text-xl text-center max-w-3xl mt-[40px]">
          Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.
        </p>
      </div>
    </section>
  );
};

export default Hero;
