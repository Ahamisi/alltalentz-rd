import React from 'react';
import Link from 'next/link';

const SubFooter = () => {
  return (
    <div className="bg-[#131313] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side (Image) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/alltalentz-footer.png" alt="All Talents Footer" />
          </div>

          {/* Right side (Text and CTAs) */}
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-white text-3xl md:text-5xl font-semibold mb-4">Need customised solutions to meet your peculiar Talent needs?</h3>
            <p className="text-white mb-6">
            Kindly take a moment to schedule meeting with us via Teams or download our company brochure.
            </p>
            <div className="flex items-center">
              <Link href="https://calendly.com/mnwoseh" className="bg-secondary text-[#131313] py-2 px-4 rounded mr-4">
                Meet with us
              </Link>
              <Link href="/AllTalentzBrochure.pdf" className="bg-secondary text-[#131313] py-2 px-4 rounded">
                Download Brochure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
