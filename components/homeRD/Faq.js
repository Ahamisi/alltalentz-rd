"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-xl text-black">{question}</span>
        <span className={`ml-4 transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M11.0104 2.6748C15.8772 2.6748 19.8225 6.62013 19.8225 11.4869C19.8225 16.3537 15.8772 20.2991 11.0104 20.2991C6.14357 20.2991 2.19824 16.3537 2.19824 11.4869C2.19824 6.62013 6.14357 2.6748 11.0104 2.6748Z" fill="#1D1D1D"/>
            <path d="M7.89939 8.86986C7.64129 8.61176 7.64129 8.1933 7.89939 7.9352C8.15749 7.6771 8.57595 7.6771 8.83405 7.9352L11.0104 10.1115L13.1867 7.9352C13.4448 7.6771 13.8632 7.6771 14.1213 7.9352C14.3794 8.1933 14.3794 8.61176 14.1213 8.86987L11.4777 11.5135C11.2196 11.7716 10.8011 11.7716 10.543 11.5135L7.89939 8.86986Z" fill="#1D1D1D"/>
            <path d="M7.89939 12.3947C7.64129 12.1366 7.64129 11.7182 7.89939 11.4601C8.15749 11.2019 8.57595 11.2019 8.83405 11.4601L11.0104 13.6364L13.1867 11.4601C13.4448 11.2019 13.8632 11.2019 14.1213 11.4601C14.3794 11.7182 14.3794 12.1366 14.1213 12.3947L11.4777 15.0384C11.2196 15.2965 10.8011 15.2965 10.543 15.0384L7.89939 12.3947Z" fill="#1D1D1D"/>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = ({ 
    title = "Frequently Asked Questions",
    description = "Find answers to common questions about our services",
    faqs = [
      {
        question: "What services does All Talentz provide?",
        answer: "All Talentz provides a comprehensive range of services including estimating, project management, and consulting for restoration and construction projects."
      },
      {
        question: "How can I get started with All Talentz?",
        answer: "Getting started is easy! Simply reach out through our contact form or give us a call, and our team will guide you through the process."
      }
    ]
  }) => {
  const [openIndex, setOpenIndex] = useState(null);



  return (
    <section className="relative bg-white py-20 bg-[url('/redesign-25/backgrounds/frame-pattern-2.svg')] bg-center bg-cover bg-no-repeat overflow-hidden px-4 md:px-0">

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left side - Title and CTA */}
          <div className="md:w-1/3">
            <h2 className="text-[40px] font-medium italic mb-6 text-black">
              {title}
            </h2>
            <a href="/faq" className="text-[#E5B47B] hover:underline">
              {description}
            </a>
          </div>

          {/* Right side - FAQ items */}
          <div className="md:w-2/3">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
