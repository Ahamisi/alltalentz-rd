"use client"
import { motion } from 'framer-motion';

const MobileMilestone = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-[#121212]">
            Our Milestones
          </h2>
          <p className="text-gray-600 text-lg">
            Founded in 2022, AllTalentz began with a bold mission to connect Africa's brightest talents 
            with meaningful global opportunities.
          </p>
        </div>

        {/* Simple Vertical Timeline */}
        <div className="space-y-12">
          {/* 2022 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-100 rounded-lg p-6"
          >
            <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2022</h3>
            <p className="text-gray-600">
              2022 marked the humble beginning of AllTalentz. We started with just 3 employees—a small but mighty team 
              that became the foundation for everything we've built today.
            </p>
          </motion.div>

          {/* 2023 First Half */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-100 rounded-lg p-6"
          >
            <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2023</h3>
            <p className="text-gray-600">
              By 2023, our team grew to 75 talented professionals. We continued our journey of bridging African talents with 
              businesses globally, completing more projects and scaling operations.
            </p>
          </motion.div>

          {/* 2023 Second Half */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-100 rounded-lg p-6"
          >
            <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2023</h3>
            <p className="text-gray-600">
              In just a year, we opened our first physical office and launched our first bootcamp, paving the way for 
              more talent and innovation.
            </p>
          </motion.div>

          {/* 2024 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-100 rounded-lg p-6"
          >
            <h3 className="text-[32px] font-bold mb-4 text-[#4C4C4C]">2024</h3>
            <p className="text-gray-600">
              Now in 2024, we are over 300 strong, delivering over 100,000 successful projects. We're scaling faster, matching 
              world-class African talents with global companies that trust us.
            </p>
          </motion.div>

          {/* Presently */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-100 rounded-lg p-6"
          >
            <h3 className="text-[24px] font-bold mb-1 text-[#4C4C4C]">PRESENTLY</h3>
            <p className="text-gray-600">
              All Talentz continues to build on this legacy of growth and success. With each project, we are empowering 
              talents across Africa and helping businesses around the globe achieve new heights. And this is only the beginning!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileMilestone; 