"use client"
import { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TheAgency = () => {
  

  return (
   

    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[40px] md:px-0" style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
    <div className="container mx-auto py-[200px]">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* First Column (Image) */}
            <div className="relative flex justify-center md:justify-end">
            <div className="w-[350px] h-[460px] mx-auto rounded-[24px]" style={{background: 'rgba(0, 0, 0, 0.2)'}}></div>
                <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
                    <img src="/home-img/outsourcing-agency.png" alt="Outsourcing Agency alltalentz" className="mx-auto rounded-lg w-[380px]" />
                </div>
            </div>

            {/* Second Column (Content) */}
            <div className="flex flex-col justify-center items-center md:items-start md:w-[80%]">
                <h2 className="text-3xl md:text-[55px] md:leading-[65px] font-semibold mb-4 text-black text-center md:text-left">All Talentz <br/> <span className="text-[#F99621]">Outsourcing</span> <br/> Agency.</h2>
                <p className="text-lg text-gray-700 mb-6 text-center md:text-left">All Talentz is more than just a recruitment company; We connect you with the best remote talent in Africa. Whether you need skilled, experienced, or reliable talent, we have the perfect match for you. And the best part is, you get amazing value for your money!</p>
                <button className="bg-[#F99621] text-white px-8 py-3 hover:bg-[#121212] transition duration-300">Get Started</button>
            </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-[180px]">
            {/* Second Column (Content) */}
            <div className="flex flex-col justify-center items-center md:items-start md:w-[80%] md:ml-auto">
                <h2 className="text-3xl md:text-[55px] md:leading-[65px] font-semibold mb-4 text-black text-center md:text-left">Quality <span className="text-[#F99621]">Talents</span> <br/> at bargain.</h2>
                <p className="text-lg text-gray-700 mb-6 text-center md:text-left">Flexible labour that scales with your company. We employ the talent, therefore there are no payroll costs, benefit costs, or high overhead costs that accrue to you.</p>
            </div>

            {/* First Column (Image) */}
            <div className="relative flex justify-center md:justify-end">
            <div className="w-[350px] h-[460px] mx-auto rounded-[24px]" style={{background: 'rgba(0, 0, 0, 0.2)'}}></div>
                <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
                    <img src="/home-img/quality-talents.png" alt="Outsourcing Agency alltalentz" className="mx-auto rounded-lg w-[380px]" />
                </div>
            </div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* First Column (Image) */}
            <div className="relative flex justify-center md:justify-end">
                <div className="w-[350px] h-[460px] mx-auto rounded-[24px]" style={{background: 'rgba(0, 0, 0, 0.2)'}}></div>
                <div className="mt-[-40px] pb-[12px] absolute inset-0 flex justify-center items-center top-0">
                    <img src="/home-img/top-tier-talents.png" alt="Outsourcing Agency alltalentz" className="mx-auto rounded-lg w-[380px]" />
                </div>
            </div>

            {/* Second Column (Content) */}
            <div className="flex flex-col justify-center items-center md:items-start md:w-[80%]">
                <h2 className="text-3xl md:text-[55px] md:leading-[65px] font-semibold mb-4 text-black text-center md:text-left">Top-Tier <span className="text-[#F99621]">Talents</span> <br/> from Day one.</h2>
                <p className="text-lg text-gray-700 mb-6 text-center md:text-left">Our talents are on the money, and we're determined to meet your company's demands and keep them in line with best practices. If you are not satisfied with our Talent after 30 days, we'll replace them.</p>
            </div>
        </div>
    </div>
    </section>

  );
};

export default TheAgency;
