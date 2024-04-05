"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";


import React, { useState } from 'react';
import Modal from 'react-modal';

export default function Watchlist() {


 

  return (
    <>
    
    <section>
    <PageHeader about={true}>
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}

        <div className="max-w-7xl mx-auto justify-center align-middle md:flex relative h-[100%] items-center px-[20px] md:px-4  ">
                {/* First Column (60% width) */}
                <div className="md:w-[40%] pr-6">

                <h2 className="text-3xl md:text-[60px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white">
                Explore. Learn <span className="text-secondary">Excel.</span>

                  </h2>
              
                  <div className="flex md:block flex-column mt-6 md:mt-0">
                    <Btn text="Login" otherCSS="md:mt-6 mt-[10px]"/>
                  </div>

                    
               

                </div>

                {/* Second Column (40% width) */}
                <div className="hidden md:block md:w-[60%] h-[60%] mt-8 md:mt-0">
                    <img
                        src="/our-talents.png"
                        alt="Our Talents at Alltalentz"
                        className="h-[450px] w-auto mx-auto"
                    />
                </div>
            </div>

        {/* </div> */}
        
    </PageHeader>
    </section>






 


    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>




    
    </>
  )
}
