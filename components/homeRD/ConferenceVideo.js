"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const ClientVideos = ({ 
  title = "Take a first glance about all Talentz",
  description = "Here are some video clips from our Clients",
  videos = [
    { 
      id: 1, 
      videoUrl: 'https://youtu.be/p5F-iGADZRI',
      videoId: 'p5F-iGADZRI'
    },
    { 
      id: 2, 
      videoUrl: 'https://www.youtube.com/embed/ze9eSdRedt0',
      videoId: 'ze9eSdRedt0'
    },
    // ... other videos
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
    <section className="py-20 px-4 bg-white">
      {/* Header */}
      <div className="text-center mb-12 text-black">
        <h2 className="text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-400">
          {description}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="relative rounded-[24px] overflow-hidden bg-[#FFEFA633] aspect-video">
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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FFB300] hover:bg-[#FFB300]/90 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[#FFB300]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientVideos;
