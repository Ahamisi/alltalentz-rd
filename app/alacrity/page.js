"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import { useRouter } from 'next/navigation';

import Link from "next/link";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSearchParams } from 'next/navigation'
import Header from "@/components/Header";



export default function RequestTalent() {

    const route = useRouter()
    const [selectedServices, setSelectedServices] = useState([]);
    const [redirect, setRedirect] = useState(false)
    const services = [
      'Estimators ',
      'Administrative Assistants ',
      'Virtual Assistants ',
      'Telemarketing Assistant ',
      'Digital Marketers',
      'Account Receivables ',
      'Designers / Software Developers ',
      'Quick book Specialists ',
      'Compliance Specialists',

    ];
    // Check if a specific query parameter exists in the URL
    const searchParams = useSearchParams()
    const search = searchParams.get('popup')


    // const handleServiceToggle = (service,event) => {
    //     if (selectedServices.includes(service)) {
    //       setSelectedServices(selectedServices.filter((s) => s !== service));
    //     } else {
    //       setSelectedServices([...selectedServices, service]);
    //     }
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         "service" : value,
    //     }));
    // };
    

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // Perform an action based on the query parameter
        if (search === 'true') {
            setIsOpen(true)
            // Do something when the query parameter is 'someValue'
        }else{
            setIsOpen(false)
        }

    }, [])
    
  

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: [], // Initialize as an empty array
        redirect: false
      });
      
      const handleServiceToggle = (service) => {
        if (selectedServices.includes(service)) {
          setSelectedServices(selectedServices.filter((s) => s !== service));
        } else {
          setSelectedServices([...selectedServices, service]);
        }
      
        const updatedService = selectedServices.includes(service)
          ? formData.service.filter((s) => s !== service)
          : [...formData.service, service];

        //   console.log(selectedServices,updatedService,'dojl')
      
        setFormData((prevData) => ({
          ...prevData,
          service: updatedService,
        }));
      };
      

      const [isLoading, setIsLoading] = useState(false);



      const [errors, setErrors] = useState({});


    const [isSubmitted, setIsSubmitted] = useState(false);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "service") {
            // Handle multiple selections
            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
            setFormData(prevData => ({
                ...prevData,
                [name]: selectedOptions
            }));
        } else {
            // Handle other inputs normally
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };



    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) {
        newErrors.fullName = "Full Name is required";
        }
        if (!formData.email) {
        newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        }
        if (!formData.company) {
        newErrors.company = "Company is required";
        }
        if (!formData.phone) {
        newErrors.phone = "Phone is required";
        }
        if (!formData.service) {
        newErrors.service = "Service is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (validateForm()) {
            try {
                setIsLoading(true);
                setFormData((prevData) => ({
                    ...prevData,
                    service: formData.service.join(', ')
                }));

                await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                console.log("Email sent successfully!");
                setIsSubmitted(true);

            } catch (error) {
                console.error("Failed to send email:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("Form has errors");
        }
    };

    
      


 

  return (
    <>

    
<section>
<PageHeader bgImage="/alltalentz-white-frame.svg">
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
            <div className="max-w-7xl mx-auto py-16 lg:flex relative items-center px-6">
                {/* Content Columns */}
                <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                    {/* Text Column */}
                    <div className="lg:w-1/2 pr-8">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-black">
                            Your Gateway to find Exceptional Remote <span className="text-[#F99621]">Talents.</span>
                        </h1>

                        <p className="text-lg mb-8 text-black">
                            At All Talentz, we connect businesses with top-tier global talents. From Administrative support, to creative and technical roles, we provide world-class professionals, ready to help your business thrive, while saving you up to 75% on your overhead cost.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link href="https://calendly.com/mnwoseh/" className="bg-[#F99621] text-black px-8 py-3  font-medium">
                                Meet with us!
                            </Link>
                            <img src="/alacrity-logo.png" alt="Alacrity Solutions" className="h-12" />
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="lg:w-1/2 relative mt-12 lg:mt-0">
                        <img 
                            src="/social-media-talentz-alltalentz.png" 
                            alt="Remote Worker" 
                            className="relative z-10 rounded-lg w-full h-auto max-w-[500px]"
                        />
                    </div>
                </div>
            </div>
        
    </PageHeader>
</section>            






    <section
        className="relative bg-white py-16 px-6 bg-cover bg-center"
        style={{ backgroundImage: 'url(/alltalentz-white-frame.svg)' }}
    >
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Contact Info */}
                <div className="lg:w-1/2 bg-black rounded-3xl p-12 text-white">
                    <p className="text-[#F99621] mb-2">Get in Touch</p>
                    <h2 className="text-3xl font-bold mb-12">We will like to hear from you</h2>

                    {/* Mail Section */}
                    <div className="mb-12">
                        <div className="flex items-start gap-4">
                            <img src="/icons/Mailbox.svg" alt="Mail" className="w-8 h-8" />
                            <div>
                                <h3 className="text-xl mb-2">Send us a Mail</h3>
                                <p className="text-white-800 opacity-70 mb-1">Our friendly team is here to help. Send us a mail;</p>
                                <a href="mailto:info@alltalentz.com" className="text-white">info@alltalentz.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Visit Us Section */}
                    <div className="mb-12">
                        <div className="flex items-start gap-4">
                            <img src="/icons/Home.svg" alt="Location" className="w-8 h-8" />
                            <div>
                                <h3 className="text-xl mb-2">Visit Us</h3>
                                <p className="text-white-800 opacity-70 mb-2">Say hello to us at our head office</p>
                                <p className="mb-2">2020 Brice Rd, Reynolds-burg, OH 43068, United States (USA)</p>
                                <p>151 Herbert Macaulay Way, Yaba, Lagos. (Nigeria)</p>
                            </div>
                        </div>
                    </div>

                    {/* Phone Section */}
                    <div>
                        <div className="flex items-start gap-4">
                            <img src="/icons/Phone.svg" alt="Phone" className="w-8 h-8" />
                            <div>
                                <h3 className="text-xl mb-2">Phone</h3>
                                <p className="text-white-800 opacity-70 mb-2">Mon - Fri from 8am-5pm</p>
                                <p className="mb-1">USA: +1 614-502-1440</p>
                                <p>Nigeria: +1 614-502-1440</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="lg:w-1/2">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Let's help you find talents.</h2>
                    <p className="text-gray-600 mb-8 text-center">Kindly complete the form below, and we will respond as soon as possible</p>

                    {isSubmitted ? (
                        <div className="p-4 rounded-lg bg-[#FDDEBA] text-center mt-6 w-full m-0">
                            <div className="flex items-center justify-center">
                                <img src="/star-shine.svg" alt="Alltalentz Shine"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                            <p className="text-gray-600">We will keep you updated via email.</p><br/>
                            <Btn link="https://calendly.com/akwaowowillie" target="_blank" text="Meet With Us" className="mt-6" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your full name*"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:border-[#F99621]"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:border-[#F99621]"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Company*"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:border-[#F99621]"
                                />
                                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone number*"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:border-[#F99621]"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div className="relative">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:border-[#F99621] appearance-none bg-white cursor-pointer text-gray-500"
                                >
                                    <option value="" disabled selected className="text-gray-500">Talents needed*</option>
                                    {services.map((service) => (
                                        <option key={service} value={service} className="text-black py-2">
                                            {service}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                                {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#F99621] text-black font-semibold py-4 rounded-lg hover:bg-opacity-90 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg 
                                        className="animate-spin h-5 w-5 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z"
                                        />
                                    </svg>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    </section>


 


    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>




    
    </>
  )
}