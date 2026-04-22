"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Btn from "./Btn";

interface SubFooterProps {
  brochure?: string;
  meetWithUs?: string;
  heading?: string;
  subheading?: string;
}

const SubFooter = ({
  brochure,
  meetWithUs,
  heading = "Ready to Build Your Remote Team?",
  subheading = "Tell us what you need. We'll have the right talent matched, vetted, and ready to deploy within 7 days.",
}: SubFooterProps) => {
  return (
    <motion.div
      className="bg-[#131313] py-[100px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" as const }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side (Image) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/alltalentzwoman-footer.png"
              alt="All Talents Footer"
              width={600}
              height={500}
              className="hover:rotate-6 transition duration-200 cursor-pointer w-full h-auto"
            />
          </div>

          {/* Right side (Text and CTAs) */}
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-white text-3xl lg:text-[40px] xl:text-[65px] lg:leading-[50px] xl:leading-[80px] font-semibold mb-4">
              {heading}
            </h3>
            <p className="text-white mb-6">
              {subheading}
            </p>
            <div className="flex items-center flex-col md:flex-row">
              <Btn text="Build my Team" otherCSS="w-full text-center" link="/request-talent" />
              &nbsp;&nbsp;
              <Btn
                text="Talk to our team"
                otherCSS="w-full text-center"
                link={`${meetWithUs ? meetWithUs : "https://calendly.com/mnwoseh"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubFooter;
