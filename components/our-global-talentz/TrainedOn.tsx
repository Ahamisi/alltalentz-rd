"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certificationsInOrder } from "@/lib/certifications";
import { REVEAL_VIEWPORT } from "@/lib/motion";

const CERTS = certificationsInOrder("iso", "soc2", "hipaa", "great-place");

const CARD_STYLE = {
  border: "0.93px solid transparent",
  backgroundImage: [
    "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(25, 22, 20, 0.18) 0%, rgba(228, 228, 228, 0.18) 100%)",
    "linear-gradient(#fff, #fff)",
    "linear-gradient(104.59deg, rgba(255, 255, 255, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(226, 226, 226, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)",
  ].join(", "),
  backgroundOrigin: "padding-box, padding-box, border-box",
  backgroundClip: "padding-box, padding-box, border-box",
} as const;

const TrainedOn = () => {
  return (
    <section className="bg-white px-[24px] py-[70px] md:px-[40px] md:py-[100px]">
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <div className="grid items-center gap-[40px] lg:grid-cols-2 lg:gap-[80px]">
          <div className="order-2 grid grid-cols-2 gap-[16px] md:gap-[24px] lg:order-1">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={CARD_STYLE}
                className="flex flex-col p-[20px] md:p-[28px]"
              >
                <div className="flex h-[120px] items-center justify-center md:h-[150px]">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={cert.box.w}
                    height={cert.box.h}
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                <h3 className="mt-[20px] text-[13px] font-bold uppercase leading-[130%] tracking-[0%] text-[#121212] md:text-[16px]">
                  {cert.name}
                </h3>
                <p className="mt-[10px] text-[12px] leading-[150%] text-[#5C5C5C] md:text-[14px]">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.5 }}
            className="order-1 text-3xl font-semibold tracking-[-1.5px] text-[#121212] md:text-[55px] md:leading-[64px] lg:max-w-[519.52px] md:tracking-[-5%] lg:order-2 lg:text-[55px] lg:leading-[67.25px]"
          >
            What All Talentz professionals are trained on
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

export default TrainedOn;
