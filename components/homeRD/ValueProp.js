"use client"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {useEffect, React} from "react"

const ValueProp = () => {
  const { ref, inView } = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section ref={ref} className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[40px] md:px-0">
      <motion.div
        className="container mx-auto py-12"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Value Proposition Header */}
        <motion.h2 className="text-3xl text-[#4C4C4C] md:text-[55px] leading-[65px] font-semibold text-center mb-8" variants={itemVariants}>
          Our Value Proposition
        </motion.h2>

        {/* Grid Layout */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-[70%] md:mx-auto" variants={itemVariants}>
          {/* First Column, First Row */}
          <motion.div className="flex flex-col items-left md:mb-[53px]" variants={itemVariants}>
            <div>
              {/* Icon */}
              <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M51.579 51.472C67.0123 36.0387 73.2679 17.2719 65.5512 9.55525C57.8346 1.83858 39.0678 8.09418 23.6345 23.5275C8.20123 38.9609 1.94565 57.7276 9.6623 65.4443C17.3789 73.161 36.1457 66.9054 51.579 51.472Z" fill="#282828"/>
                <path opacity="0.3" d="M23.6339 51.4725C8.20062 36.0391 1.94504 17.2724 9.66168 9.55569C17.3783 1.83902 36.1451 8.09461 51.5784 23.528C67.0117 38.9613 73.2672 57.7281 65.5506 65.4447C57.8339 73.1614 39.0672 66.9058 23.6339 51.4725Z" fill="#282828"/>
                <path d="M45.4189 37.5C45.4189 41.8147 41.9212 45.3125 37.6064 45.3125C33.2917 45.3125 29.7939 41.8147 29.7939 37.5C29.7939 33.1853 33.2917 29.6875 37.6064 29.6875C41.9212 29.6875 45.4189 33.1853 45.4189 37.5Z" fill="#282828"/>
                </svg>

            </div>
            <h3 className="text-xl font-semibold mt-4 text-[#4B4B4D]">Highly-Skilled Employees</h3>
            <p className="text-[#4B4B4D]">Our remote talent are trained and certified in the latest skills, techniques and proficient in the software required.</p>
          </motion.div>

          {/* Second Column, First Row */}
          <motion.div className="flex flex-col items-left" variants={itemVariants}>
            <div>
              {/* Icon */}
                <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M56.2518 20.4941L50.5342 14.7765L50.5342 14.7765C45.7044 9.94671 43.2895 7.53182 40.1564 6.63325C37.0232 5.73467 33.6955 6.50261 27.04 8.03848L23.202 8.92419C17.6027 10.2163 14.8031 10.8624 12.886 12.7795C10.9688 14.6966 10.3228 17.4963 9.03063 23.0955L8.14492 26.9336C6.60905 33.589 5.84112 36.9168 6.73969 40.0499C7.63827 43.1831 10.0532 45.598 14.883 50.4278L20.6006 56.1454C29.0037 64.5485 33.2052 68.75 38.4262 68.75C43.6472 68.75 47.8487 64.5485 56.2518 56.1454C64.6549 47.7423 68.8564 43.5408 68.8564 38.3198C68.8564 33.0987 64.6549 28.8972 56.2518 20.4941Z" fill="#282828"/>
                    <path d="M34.9402 44.7764C32.8372 42.6733 32.855 39.6559 34.1127 37.2645C33.4842 36.3516 33.5759 35.0922 34.3878 34.2802C35.1967 33.4713 36.4499 33.3773 37.3621 33.9983C38.4242 33.4339 39.5911 33.1354 40.7539 33.1464C42.0483 33.1586 43.0877 34.2177 43.0755 35.5121C43.0633 36.8065 42.0041 37.8459 40.7097 37.8336C40.1569 37.8284 39.4303 38.0765 38.8072 38.6997C37.5961 39.9107 37.9147 41.1217 38.2548 41.4618C38.5949 41.8019 39.8059 42.1204 41.0169 40.9094C43.467 38.4593 47.6973 37.6461 50.4082 40.3569C52.5112 42.46 52.4933 45.4774 51.2357 47.8688C51.8642 48.7818 51.7725 50.0412 50.9606 50.8531C50.1515 51.6622 48.8979 51.756 47.9857 51.1346C46.5579 51.8934 44.9336 52.1778 43.3851 51.8595C42.1171 51.599 41.3005 50.3599 41.5611 49.0919C41.8216 47.824 43.0607 47.0074 44.3286 47.268C44.8822 47.3817 45.7748 47.2001 46.5412 46.4336C47.7522 45.2226 47.4337 44.0116 47.0936 43.6715C46.7535 43.3314 45.5425 43.0129 44.3315 44.2239C41.8813 46.6741 37.6511 47.4872 34.9402 44.7764Z" fill="#282828"/>
                    <path d="M31.4223 32.166C33.8631 29.7252 33.8631 25.7679 31.4223 23.3272C28.9816 20.8864 25.0243 20.8864 22.5835 23.3272C20.1427 25.7679 20.1427 29.7252 22.5835 32.166C25.0243 34.6068 28.9816 34.6068 31.4223 32.166Z" fill="#282828"/>
                </svg>

            </div>
            <h3 className="text-xl font-semibold mt-4 text-[#4B4B4D]">Affordable Cost</h3>
            <p className="text-[#4B4B4D]">Save up to 70% on cost when you use our remote talent which leads to considerable savings on cost of operations.</p>
          </motion.div>

          {/* Third Column, First Row */}
          <motion.div className="flex flex-col items-left" variants={itemVariants}>
            <div>
              {/* Icon */}
                <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M69.3564 37.5C69.3564 54.7589 55.3653 68.75 38.1064 68.75C20.8475 68.75 6.85645 54.7589 6.85645 37.5C6.85645 20.2411 20.8475 6.25 38.1064 6.25C55.3653 6.25 69.3564 20.2411 69.3564 37.5Z" fill="#282828"/>
                    <path d="M33.1462 26.5559L33.6583 25.6374C35.6374 22.087 36.627 20.3118 38.1064 20.3118C39.5859 20.3118 40.5755 22.087 42.5546 25.6374L43.0667 26.5559C43.6291 27.5648 43.9103 28.0693 44.3487 28.4021C44.7872 28.7349 45.3332 28.8585 46.4254 29.1056L47.4197 29.3306C51.2629 30.2001 53.1845 30.6349 53.6417 32.1051C54.0989 33.5753 52.7889 35.1072 50.1688 38.171L49.4909 38.9637C48.7464 39.8343 48.3741 40.2696 48.2067 40.8082C48.0392 41.3468 48.0955 41.9276 48.208 43.0892L48.3105 44.1468C48.7066 48.2346 48.9047 50.2785 47.7078 51.1871C46.5109 52.0957 44.7116 51.2673 41.1132 49.6105L40.1823 49.1818C39.1597 48.711 38.6484 48.4756 38.1064 48.4756C37.5645 48.4756 37.0532 48.711 36.0306 49.1818L35.0996 49.6105C31.5012 51.2673 29.702 52.0957 28.5051 51.1871C27.3082 50.2785 27.5063 48.2346 27.9024 44.1468L28.0049 43.0892C28.1174 41.9276 28.1737 41.3468 28.0062 40.8082C27.8388 40.2696 27.4665 39.8343 26.7219 38.9637L26.0441 38.171C23.424 35.1072 22.114 33.5753 22.5712 32.1051C23.0283 30.6349 24.95 30.2001 28.7932 29.3306L29.7875 29.1056C30.8797 28.8585 31.4257 28.7349 31.8642 28.4021C32.3026 28.0692 32.5838 27.5648 33.1462 26.5559Z" fill="#282828"/>
                </svg>
            </div>
            <h3 className="text-xl font-semibold mt-4 text-[#4B4B4D]">Vetted & Reliable Employees</h3>
            <p className="text-[#4B4B4D]">Our remote talent are vetted and verified by us, and we provide ongoing support and feedback to ensure quality and satisfaction.</p>
          </motion.div>

          {/* Fourth Column, First Row */}
          <motion.div className="flex flex-col items-left" variants={itemVariants}>
            <div>
              {/* Icon */}
                <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.8024 49.8816C45.2005 50.6777 44.8541 51.6449 44.0413 52.0074L14.661 65.1095C9.98654 67.1941 5.1379 62.5652 7.4533 58.2285L17.3034 39.7794C18.0695 38.3445 18.0695 36.6555 17.3034 35.2206L7.4533 16.7715C5.13789 12.4348 9.98654 7.80592 14.661 9.8905L25.6745 14.802C26.996 15.3913 28.072 16.4208 28.7191 17.715L44.8024 49.8816Z" fill="#282828"/>
                    <path opacity="0.5" d="M49.1491 48.0954C49.523 48.8433 50.4194 49.1642 51.183 48.8237L66.2535 42.103C70.3902 40.2582 70.3902 34.7444 66.2535 32.8996L38.4481 20.4998C37.1084 19.9024 35.7582 21.3136 36.4142 22.6256L49.1491 48.0954Z" fill="#282828"/>
                </svg>

            </div>
            <h3 className="text-xl font-semibold mt-4 text-[#4B4B4D]">Contribute to Success</h3>
            <p className="text-[#4B4B4D]">Our talent understand the job and are solutions-oriented; ultimately, they contribute to your success.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ValueProp;
