// components/Hero.js
"use client";
import React from 'react';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  return (
    <div className="relative bg-white">
      <div className="absolute inset-0 bg-white z-0"></div>


      <div className="relative container mx-auto px-6 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between lg:px-[80px]">
        <div className="text-center lg:text-left lg:w-1/2 py-8 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            How to close your <span className="text-[#F99621] text-4xl md:text-8xl">Digital Marketing</span> Sales Lead
          </h1>
          <div className="flex py-4 md:py-[20px] justify-center lg:justify-start">
            <a href="https://events.teams.microsoft.com/event/279aa6e0-9f31-421e-b3a8-ff11094a607a@8905187e-0732-4a0a-ae4d-83be05131105" target='_blank' className="bg-[#F99621] hover:bg-[#282828] text-[#121212] hover:text-white px-8 md:px-[63px] py-4 md:py-[23px] transition duration-300 text-sm md:text-base">
              Register Now
            </a>
          </div>
          <p className="text-base md:text-5xl text-[#4C4C4C] mt-2 font-bold">July 17th, 2024</p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end lg:items-end lg:mt-[84px] mt-8 lg:mt-0">
          <img
            src="/digital-marketing-webinar.png"
            alt="Alltalentz Digital Marketing Webinar"
            className="w-full max-w-xs md:max-w-md lg:max-w-full"
          />
        </div>
      </div>

      <div className="relative lg:mt-[-55px]">
        <div className="relative flex justify-center space-x-6 py-6 z-10 bg-[url('/skew-bg.svg')] bg-cover bg-center md:h-[348px] items-center  pb-0">
        <div className='mt-8 bg-[#F99621] p-[40px] md:p-0'>
            <CountdownTimer targetDate='2024-07-17T00:00:00' />
        </div>
        <div className=' absolute md:h-[90px] w-full bottom-0 bg-[#F99621] m-0'></div>
        </div>
      </div>
    </div>
  );
}
