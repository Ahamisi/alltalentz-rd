"use client"
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ConferenceVideo = () => {
  const { ref, inView } = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="bg-[#F8F8F8] py-[82px]" ref={ref}>
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-black"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          The <span className="text-[#F99621]">All Talentz</span> Conference
        </motion.h2>

        {/* Description Text */}
        <motion.p
          className="text-lg text-gray-700 mb-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The All-Talentz Conference is an annual event/retreat where all talents in All-<br/>Talentz go through a re-orientation in excellence and service delivery.
        </motion.p>

        {/* Video Player */}
        <motion.div
          className="mx-auto max-w-screen-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <video width="100%" controls poster="/video-cover.png">
            <source src="/video/all-talent.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceVideo;
