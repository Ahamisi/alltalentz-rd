"use client";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import TrainingApproach from "@/components/homeRD/TrainingApproach";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import Faq from "@/components/homeRD/Faq";
import { useState } from "react";
import Modal from "react-modal";

export default function BootCamp() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const bootcampVideos = [
    {
      id: 1,
      videoUrl: "https://youtu.be/lg97MSTAepc",
    },
    {
      id: 2,
      videoUrl: "https://youtu.be/rLBx8RZl9YU",
    },
    {
      id: 3,
      videoUrl: "https://youtu.be/nY32P9n6XSs",
    },
    {
      id: 4,
      videoUrl: "https://youtu.be/EHcDdGuOhSg",
    },
    {
      id: 5,
      videoUrl: "https://youtu.be/RXTCpHs8lC8",
    },
  ];

  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Welcome to <span className="text-[#F99621]">All Talentz</span>{" "}
              <span className="text-white">professional development programme.</span>
            </h1>

            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Are you ready to level up your career? All Talentz Professional Development Program
              offers intensive 90-days training programs led by industry experts. Whether you're a
              recent graduate or a seasoned professional, our flexible online and in-person format
              provides a smooth and convenient learning experience for our participants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#F99621] text-black px-8 py-4 rounded font-bold hover:bg-opacity-90 transition-all"
              >
                Apply to our PDP
              </button>

              <a
                href="#bootcampVideos"
                className="bg-white bg-opacity-10 text-white px-8 py-4 rounded font-bold hover:bg-opacity-20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch video
              </a>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="hidden lg:block lg:w-[55%] pl-12 relative">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#F99621] opacity-10"></div>
            <div className="relative z-8">
              <Image
                src="/redesign-25/estimator-bootcamp.png"
                alt="Student learning"
                width={450}
                height={600}
                className="w-auto h-[600px]"
              />
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Applications closed modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Applications Closed"
        className="modal !p-0 !rounded-none shadow-2xl w-[95%] md:w-[580px] overflow-y-auto max-h-[92vh]"
        overlayClassName="overlay"
      >
        <div className="p-10 flex flex-col items-center text-center gap-4 bg-white">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">😔</div>
          <h1 className="text-xl font-bold text-gray-900">Applications Closed</h1>
          <p className="text-gray-500 text-sm max-w-xs">
            The professional development programme application period is over. Please be on the lookout for the next cycle.
          </p>
          <button onClick={toggleModal} className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
            Close
          </button>
        </div>
      </Modal>

      <TrainingApproach />

      <section id="bootcampVideos">
        <ConferenceVideo
          title="PDP Testimonials"
          description="Watch our students transform into industry professionals."
          videos={bootcampVideos}
        />
      </section>

      <Faq
        title="PDP FAQs"
        description="Common questions about our professional development program"
        faqs={[
          {
            question: "How long is the professional development program?",
            answer:
              "Our professional development program is an intensive 90-day program designed to transform you into an industry-ready professional.",
          },
          {
            question: "What are the prerequisites for joining?",
            answer:
              "While no specific experience is required, candidates should have a strong work ethic and basic computer skills.",
          },
        ]}
      />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter hideSub={true} />
      </section>
    </main>
  );
}
