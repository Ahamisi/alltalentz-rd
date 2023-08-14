import React from 'react';
import Link from 'next/link';
import Btn from './Btn';

const SubFooter = () => {
  return (
    <div className="bg-[#131313] py-[100px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side (Image) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/alltalentz-footer.png" alt="All Talents Footer" className="hover:rotate-6 transition duration-200 cursor-pointer" />
          </div>

          {/* Right side (Text and CTAs) */}
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-white text-3xl md:text-[65px] md:leading-[80px] font-semibold mb-4">Need customised solutions to meet your peculiar Talent needs?</h3>
            <p className="text-white mb-6">
            Kindly take a moment to schedule meeting with us via Teams or download our company brochure.
            </p>
            <div className="flex items-center">
              <Btn text="Meet with us" link="https://calendly.com/mnwoseh"/>&nbsp;&nbsp;
              <Btn text="Download Brochure" link="/AllTalentzBrochure.pdf"/>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
