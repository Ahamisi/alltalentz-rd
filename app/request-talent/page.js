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
import Script from 'next/script';



export default function RequestTalent() {

    const route = useRouter()
    const [selectedServices, setSelectedServices] = useState([]);
    const [redirect, setRedirect] = useState(false)
    const services = [
      'Estimators ',
      'Tech Talents',
      'Healthcare Talents',
      'Financial Talents',,
      'Construction and Remediation Talents',
      'Administrative Assistants ',
      'Virtual Assistants ',
      'Telemarketing Assistant ',
      'Digital Marketers',
      'Account Receivables ',
      'Designers and Software Developers ',
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

        // Add event listeners for reCAPTCHA callbacks
        const handleRecaptchaSuccess = (event) => {
            setRecaptchaToken(event.detail);
            setErrors(prev => ({ ...prev, recaptcha: null }));
        };

        const handleRecaptchaExpired = () => {
            setRecaptchaToken(null);
        };

        window.addEventListener('recaptchaSuccess', handleRecaptchaSuccess);
        window.addEventListener('recaptchaExpired', handleRecaptchaExpired);

        return () => {
            window.removeEventListener('recaptchaSuccess', handleRecaptchaSuccess);
            window.removeEventListener('recaptchaExpired', handleRecaptchaExpired);
        };

    }, [])
    
  

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: [], // Initialize as an empty array
        redirect: false
      });
      
      // Check URL hash on component mount
      useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          // First decode the URL to handle %20 and other encoded characters
          const decodedHash = decodeURIComponent(hash);
          
          // Convert hyphens to spaces and clean up the string
          const searchTerm = decodedHash
            .replace(/-/g, ' ')
            .toLowerCase()
            .trim();
          
          // Find matching service (case-insensitive and trimmed)
          const matchingService = services.find(
            service => service.trim().toLowerCase() === searchTerm
          );
          
          if (matchingService) {
            handleServiceToggle(matchingService);
          }
        }
      }, []);

      const handleServiceToggle = (service) => {
        if (selectedServices.includes(service)) {
          setSelectedServices(selectedServices.filter((s) => s !== service));
        } else {
          setSelectedServices([...selectedServices, service]);
        }
      
        const updatedService = selectedServices.includes(service)
          ? formData.service.filter((s) => s !== service)
          : [...formData.service, service];
      
        setFormData((prevData) => ({
          ...prevData,
          service: updatedService,
        }));
      };
      

      const [isLoading, setIsLoading] = useState(false);



      const [errors, setErrors] = useState({});


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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
        if (!recaptchaToken) {
        newErrors.recaptcha = "Please complete the reCAPTCHA verification";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };



    const handleSubmit = async (event) => {

        event.preventDefault();
        
        if (validateForm()) {
            try {
                setIsLoading(true);
                setFormData((prevData) =>({
                    ...prevData,
                    service : formData.service.join(', ')
                }));
                // console.log(formData,  formData.service.join(', ')); return;

                // Send email using Nodemailer with reCAPTCHA token
                await fetch("/api/contact", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...formData,
                    recaptchaToken: recaptchaToken
                  }),
                });
          
                // console.log('sending'); return;
    
                // Reset the form
                // resetForm();
          
                // Show success message or redirect to a thank you page
                console.log("Email sent successfully!");

                redirect ? route.push('https://calendly.com/mnwoseh') : setShowConfetti(true);

                
                // Add any further logic here for success actions
                // setShowConfetti(true);
              } catch (error) {
                // Handle error
                console.error("Failed to send email:", error);
                // Add any further logic here for error actions
              } finally {
                setIsSubmitted(true);
                setIsLoading(false);
              }
          
            // Set form submitted state
            setIsSubmitted(true);

        }else{
            console.log("Form has errors");
        }
    };

    // reCAPTCHA handlers
    const onRecaptchaLoad = () => {
        setRecaptchaLoaded(true);
    };

    const onRecaptchaChange = (token) => {
        setRecaptchaToken(token);
        // Clear recaptcha error when user completes it
        if (errors.recaptcha) {
            setErrors(prev => ({ ...prev, recaptcha: null }));
        }
    };

    const onRecaptchaExpired = () => {
        setRecaptchaToken(null);
    };

    
      


 

  return (
    <>
    {/* reCAPTCHA Script */}
    <Script 
        src="https://www.google.com/recaptcha/api.js" 
        onLoad={onRecaptchaLoad}
        strategy="lazyOnload"
    />
    <Script id="recaptcha-callbacks" strategy="lazyOnload">
        {`
            window.onRecaptchaSuccess = function(token) {
                window.recaptchaToken = token;
                // Trigger custom event to notify React component
                window.dispatchEvent(new CustomEvent('recaptchaSuccess', { detail: token }));
            };
            
            window.onRecaptchaExpired = function() {
                window.recaptchaToken = null;
                window.dispatchEvent(new CustomEvent('recaptchaExpired'));
            };
        `}
    </Script>

    
<section>
<PageHeader>
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
            <div className="max-w-6xl mx-auto py-12 lg:flex relative h-fit mt-0 items-center px-[20px] md:px-4 ">
                {/* First Column (60% width) */}
                <div className="md:w-6/10 pr-6 md:w-full">
                <h2 className="text-2xl md:text-[60px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white">
                Slash your payroll cost by over <span className="text-secondary">75%</span>

                  </h2>

                  {/* <div className="text-center flex justify-center">
                    <img src="/special-events/gaylord-levelup.png" className="h-auto md:h-[130px]"/>
                  </div> */}
                    
                   

                 
                </div>

                {/* Second Column (40% width) */}
                <div className="hidden lg:block md:w-4/10 mt-8 md:mt-0">
                    <img
                        src="/star-payroll-alltalentz.png"
                        alt="All Talents Star"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        
    </PageHeader>
</section>            






    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[40px] md:px-0">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
       <div className="mb-[42px]">
            <h3 className="text-[#F99621] text-[35px] text-center font-normal">Some talent offers you can get from us!</h3>
            <p className="text-gray-600 text-center mt-4 text-lg">
                👆 Click on one or more services below to select what you need
            </p>
       </div>
        <div className="bg-[#F8F8F8] py-7">

        <div className="available-services md:w-[50%] mx-auto">
            {services.map((service) => (
                <span
                    key={service}
                    className={`service-option ${
                    selectedServices.includes(service) ? 'selected' : ''
                    }`}
                    onClick={(e) => handleServiceToggle(service, e)}
                >
                    {service}
                </span>
                ))}

        </div>

        </div>

        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C] " id="formInter">
       
          <div className={`modal-content w-[100] overflow-y-auto ${isSubmitted ? 'w-full pt-7' : 'bg-white md:w-[60%] p-3 mx-auto'}`}>
                           

                            {isSubmitted ? (
                                <div className=" p-4 rounded-lg bg-[##FDDEBA] text-center mt-6 bg-white w-full m-0">
                                    <div className="flex items-center justify-center">
                                        <img src="/star-shine.svg" alt="Alltalentz Shine"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                                    <p className="text-gray-600">We will keep you updated via email.</p><br/>
                                    <Btn link="https://calendly.com/mnwoseh" target="_blank" text="Meet With Us" className="mt-6" />
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} className="text-[#A6A6A6]" >
                                                            <h2 className="text-[25px] font-normal text-center mb-8 text-[#4C4C4C]">Kindly fill this form to help us
find you the right talent</h2>

                                <div className="mb-8">
                                {/* <label className="block text-gray-700 font-semibold mb-1">Full Name</label> */}
                                <input
                                    type="text"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.fullName ? "border-red-500" : ""
                                      }`}
                                    placeholder="Enter your full name"
                                    onChange={handleInputChange}
                                    name="fullName"
                                    value={formData.fullName}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                                )}
                                </div>
                                <div className="mb-8">
                                {/* <label className="block text-gray-700 font-semibold mb-1">Email</label> */}
                                <input
                                    type="email"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.email ? "border-red-500" : ""
                                      }`}
                                    placeholder="Enter your email"
                                    onChange={handleInputChange}
                                    name="email"
                                    value={formData.email}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email}</p>
                                )}
                                </div>
                                <div className="mb-8">
                                {/* <label className="block text-gray-700 font-semibold mb-1">Company</label> */}
                                <input
                                    type="text"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.company ? "border-red-500" : ""
                                      }`}
                                    placeholder="Enter your company name"
                                    onChange={handleInputChange}
                                    name="company"
                                    value={formData.company}
                                />
                                {errors.company && (
                                    <p className="text-red-500 text-sm">{errors.company}</p>
                                )}
                                </div>
                                <div className="mb-8">
                                {/* <label className="block text-gray-700 font-semibold mb-1">Phone</label> */}
                                <input
                                    type="tel"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.phone ? "border-red-500" : ""
                                      }`}
                                    placeholder="Enter your phone number"
                                    onChange={handleInputChange}
                                    name="phone"
                                    value={formData.phone}
                                />
                                {errors.phone && (
                                    
                                    <p className="text-red-500 text-sm">{errors.phone}</p>
                                )}
                                </div>
                                <div className="mb-8">
                                <div className="multi-select-container w-[100%] m-0">
                                    <div className="multi-select-tags">
                                        {selectedServices.map((service) => (
                                        <div
                                            key={service}
                                            className="tag"
                                            onClick={() => handleServiceToggle(service)}
                                        >
                                            {service}
                                            <span className="close-icon">×</span>
                                        </div>
                                        ))}
                                    </div>
                                    <select
                                        className="hidden-select"
                                        onChange={(e) => handleServiceToggle(e.target.value,e)}
                                        multiple
                                        value={formData.service}
                                        name="service"
                                    >
                                        {services.map((service) => (
                                        <option key={service} value={service}>
                                            {service}
                                        </option>
                                        ))}
                                    </select>
                                  
                                    </div>
                             
                                {errors.service && (
                                    <p className="text-red-500 text-sm">{errors.service}</p>
                                )}
                                </div>

                                {/* reCAPTCHA */}
                                <div className="mb-8 flex justify-center">
                                    {recaptchaLoaded && (
                                        <div 
                                            className="g-recaptcha" 
                                            data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                                            data-callback="onRecaptchaSuccess"
                                            data-expired-callback="onRecaptchaExpired"
                                        ></div>
                                    )}
                                    {errors.recaptcha && (
                                        <p className="text-red-500 text-sm mt-2 text-center">{errors.recaptcha}</p>
                                    )}
                                </div>

                            <button
                            type="submit"
                            className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90"
                            disabled={isLoading}
                            onClick={() => {setRedirect(false)}}

                            >
                            {isLoading && redirect == false ? (
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
                            </button>&nbsp;
                            <button
                            type="submit"
                            className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90"
                            disabled={isLoading}
                            onClick={() => {setRedirect(true)}}
                            >
                            {isLoading && redirect == true  ? (
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
                                "Meet With Us"
                            )}
                            </button>

                            {/* <Link href="https://calendly.com/mnwoseh" className="request-button bg-secondary text-black px-[43px] py-[16px] mt-[10px] font-bold hover:bg-opacity-90">Meet With Us</Link> */}


                                {/* <button type="submit" className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90">Submit</button> */}
                            </form>
                            )}
                        </div>
        </div>      
    </section>


 


    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>




    
    </>
  )
}