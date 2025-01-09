"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const ClientVideos = ({ 
  title = "Some Words from our Clients",
  description = "Here are some video clips from our Clients",
  videos = [
    {
      id: 1,
      videoUrl: "https://youtu.be/example1",
      videoId: "example1"
    },
    {
      id: 2,
      videoUrl: "https://youtu.be/example2",
      videoId: "example2"
    }
  ]
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to extract video ID from YouTube URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Get current video ID
  const currentVideoId = getYouTubeVideoId(videos[currentSlide].videoUrl);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-[#4C4C4C]"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[#4C4C4C] mb-12"
        >
          {description}
        </motion.p>

        <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&playsinline=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={`https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Video Navigation Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsPlaying(false);
              }}
              className={`w-6 h-6 rounded-full transition-colors duration-300 ${
                index === currentSlide 
                  ? 'bg-[#FFB300] scale-110' 
                  : 'bg-black hover:bg-black/80'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientVideos;
