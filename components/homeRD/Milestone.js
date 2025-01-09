"use client"
import { motion } from 'framer-motion';

const Milestone = () => {
  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 text-[#121212]"
          >
            Our Milestones
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            Founded in 2022, AllTalentz began with a bold mission to connect Africa's brightest talents 
            with meaningful global opportunities.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Tree */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full z-0">
            <img src="/icons/tree.svg" alt="Timeline Tree" className="h-full w-auto" style={{ maxWidth: 'none' }} />
          </div>

          {/* Timeline Items with Stems */}
          <div className="space-y-32">
            {/* 2022 - Right */}
            <motion.div className="flex items-center justify-between relative">
              <div className="w-5/12"></div>
              <div className="w-5/12 relative">
                <img 
                  src="/icons/stem-right.svg" 
                  alt="Right Stem" 
                  className="absolute -left-[11rem] top-1/2 -translate-y-1/2"
                />
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2022</h3>
                  <p className="text-gray-600">
                    2022 marked the humble beginning of AllTalentz. We started with just 3 employees—a small but mighty team 
                    that became the foundation for everything we've built today.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 2023 First Half - Left */}
            <motion.div className="flex items-center justify-between relative">
              <div className="w-[35%] relative">
                <img 
                  src="/icons/stem-left.svg" 
                  alt="Left Stem" 
                  className="absolute -right-[11rem] top-1/2 -translate-y-1/2"
                />
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2023</h3>
                  <p className="text-gray-600">
                    By 2023, our team grew to 75 talented professionals. We continued our journey of bridging African talents with 
                    businesses globally, completing more projects and scaling operations.
                  </p>
                </div>
              </div>
              <div className="w-5/12"></div>
            </motion.div>

            {/* 2023 Second Half - Right */}
            <motion.div className="flex items-center justify-between relative">
              <div className="w-5/12"></div>
              <div className="w-[33%] relative">
                <img 
                  src="/icons/stem-right.svg" 
                  alt="Right Stem" 
                  className="absolute -left-[11rem] top-1/2 -translate-y-1/2"
                />
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2023</h3>
                  <p className="text-gray-600">
                    In just a year, we opened our first physical office and launched our first bootcamp, paving the way for 
                    more talent and innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 2024 - Left */}
            <motion.div className="flex items-center justify-between relative">
              <div className="w-5/12 relative">
                <img 
                  src="/icons/stem-left.svg" 
                  alt="Left Stem" 
                  className="absolute -right-[10rem] top-1/2 -translate-y-1/2"
                />
                <div className="bg-white rounded-lg p-6 border border-gray-100">
                  <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2024</h3>
                  <p className="text-gray-600">
                    Now in 2024, we are over 300 strong, delivering over 100,000 successful projects. We're scaling faster, matching 
                    world-class African talents with global companies that trust us.
                  </p>
                </div>
              </div>
              <div className="w-5/12"></div>
            </motion.div>

            {/* Presently - Center */}
            <motion.div className="text-center max-w-3xl mx-auto mt-40 border border-gray-100 p-3 relative z-20 bg-white">
              <h3 className="text-[24px] font-bold mb-1 text-[#4C4C4C]">PRESENTLY</h3>
              <p className="text-gray-600">
                All Talentz continues to build on this legacy of growth and success. With each project, we are empowering 
                talents across Africa and helping businesses around the globe achieve new heights. And this is only the beginning!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestone;
