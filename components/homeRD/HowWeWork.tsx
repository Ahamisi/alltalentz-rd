"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    step: "STEP 1",
    title: "Tell Us What You Need",
    description: "Share your role, vertical, and timeline. We start matching immediately.",
    gradient: "linear-gradient(125.7deg, #5D460F 0%, #FDAB4B 117.55%)",
  },
  {
    step: "STEP 2",
    title: "We Source, Vet, and Match",
    description: "We go straight to our pre-trained talent pool and find the talent for you",
    gradient: "linear-gradient(125.7deg, #BE7014 0%, #E89A3D 117.55%)",
  },
  {
    step: "STEP 3",
    title: "Your Hire Is Live",
    description: "Onboarded, integrated into your workflow, and delivering from day one.",
    gradient: "linear-gradient(125.7deg, #5D460F 0%, #F19920 117.55%)",
  },
];

const HowWeWork = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="bg-white text-[#4C4C4C] py-[50px] px-[24px] md:px-[40px]" ref={ref}>
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <motion.div
          className="flex flex-col items-center text-center mb-[60px]"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          {/* <Image
            src="/v26-images/home/request-to-deployed/small-tree.svg"
            alt="All Talentz"
            width={49}
            height={50}
            className="mb-8"
          /> */}
          <h2 className="text-3xl my-6 md:text-[55px] lg:text-[50px] lg:leading-[67.25px] md:leading-[64px] font-medium text-black max-w-[616px] tracking-[-5%]">
            From Request to Assigned <br className="hidden md:block" /> in Less Than 48 Hours
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
            >
              <div
                className="relative h-[316px] rounded-t-[24px] p-[28px] flex items-center justify-center overflow-hidden"
                style={{ backgroundImage: item.gradient }}
              >
                {index === 0 && (
                  <div className="w-full rounded-[20px] p-[20px]">
                    <Image
                      src="/v26-images/home/request-to-deployed/step-1.png"
                      alt="Request form"
                      width={708}
                      height={430}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {index === 1 && (
                  <div className="w-full rounded-[20px] p-[24px]">
                    <Image
                      src="/v26-images/home/request-to-deployed/step-2.png"
                      alt="Matched talent"
                      width={740}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {index === 2 && (
                  <div className="w-full rounded-[20px] p-[24px]">
                    <Image
                      src="/v26-images/home/request-to-deployed/step-3.png"
                      alt="Welcome to the team"
                      width={1216}
                      height={620}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>

              <div className="pt-[28px] rounded-b-[24px] px-6 bg-[#FAFAFA] pb-10">
                <span className="inline-block text-[#F99621] text-sm font-medium tracking-wide bg-white text-[12px] leading-[150%] tracking-[0%] rounded-full px-[14px] py-[4px] mb-[18px] font-medium">
                  {item.step}
                </span>
                <h3 className="text-[20px] font-bold leading-[120%] tracking-[0%] text-black mb-[14px]">{item.title}</h3>
                <p className="text-black text-sm leading-[150%] font-normal">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
