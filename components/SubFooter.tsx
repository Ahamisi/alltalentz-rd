"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Btn from "./Btn";

interface SubFooterProps {
  brochure?: string;
  meetWithUs?: string;
}

const SubFooter = ({ brochure, meetWithUs }: SubFooterProps) => {
  return (
    <motion.div
      className="bg-[#131313] py-[100px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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
              Need customised solutions to meet your peculiar Talent needs?
            </h3>
            <p className="text-white mb-6">
              Kindly take a moment to schedule meeting with us via Teams or download our company
              brochure.
            </p>
            <div className="flex items-center flex-col md:flex-row">
              <Btn
                text="Meet with us"
                otherCSS="w-full text-center"
                link={`${meetWithUs ? meetWithUs : "https://calendly.com/mnwoseh"}`}
              />
              &nbsp;&nbsp;
              <Btn
                text="Download Brochure"
                otherCSS="w-full text-center"
                link={`${brochure ? brochure : "https://drive.google.com/uc?export=download&id=1R2_hd4vojiTA59zryjREZkWRKrXWZeon"}`}
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubFooter;
