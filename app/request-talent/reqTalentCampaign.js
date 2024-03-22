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

                // Send email using Nodemailer
                await fetch("/api/contact", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                });
          
                // console.log('sending'); return;
    
                // Reset the form
                // resetForm();
          
                // Show success message or redirect to a thank you page
                console.log("Email sent successfully!");

                redirect ? route.push('https://calendly.com/akwaowowillie') : setShowConfetti(true);

                
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

    
      


 

  return (
    <>

    
    <section
      className={`relative bg-cover bg-center bg-no-repeat mt-[0px] px-[20px] md:px-0 lg:px-0 bg-[#FFFFFF] `}
    >            {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
        <Header theme="light"/>


            <div className={`flex items-center justify-center h-[100%] `}>
                <div className="max-w-6xl mx-auto  py-12 md:flex relative h-fit items-center mt-6 md:mt-0 px-[20px] md:px-4 ">
                    {/* First Column (60% width) */}
                    {/* mx-auto px-4 py-12 md:flex */}
                    <div className="md:w-5/10 pr-6 md:w-full lg:mt-[5%]">


                <h2 className="text-2xl md:text-[65px] md:font-[700] md:leading-[70px] font-bold mb-6 text-black text-left">
                Save up to <span className="text-secondary">75%</span><br/> on your empoyee payroll budget!
                </h2>

                <div className="flex items-left flex-col space-y-[40px]">
                    <a href="#formInter" className="flex space-x-[17px] gap-[17px] py-[16px] px-[30px] md:px-[52px] rounded-[32px] items-center border-[2px] font-bold border-black text-black hover:bg-black hover:text-white md:w-[60%] md:ml-[90px]">
                        <div>
                            <img src="/special-events/tampa-build-expo.png" className="h-[50px]"/>
                        </div>
                        February 7 - 8, 2024
                    </a>

                         
                    <div className="w-full">
                    <p className="text-black text-sm md:text-lg text-justify">
                        Get 50% off your first month payment when you sign up at <span className="text-black font-bold text-center"><br/>Tampa Build Expo 2024.</span>
                    </p>
                    </div>
                </div>
               
               <div className="flex md:block flex-column mt-6 md:mt-0">

               </div>

                        {/* <button onClick={toggleModal} className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold">Get Started</button>&nbsp;&nbsp; */}
                        {/* <Link href="https://calendly.com/mnwoseh" className="request-button bg-black border-secondary border-2 text-secondary px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90">Meet With Us</Link> */}

                      
                    </div>

                    {/* Second Column (40% width) */}
                    <div className="hidden lg:block md:w-5/10 mt-8 md:mt-0">
                        <img
                            src="/special-events/tampa-mask.png"
                            alt="Tampa Build Expo"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-[-10%] left-0">
                <img src="star-vector-left.svg"/>
            </div>
            <div className="absolute top-[-20%] right-0 hidden lg:block">
                <img src="star-vector-top.svg"/>
            </div>
    </section>






    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[40px] md:px-0">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
       <div className="mb-[42px]">
            <h3 className="text-[#F99621] text-[35px] text-center font-normal">Some talent offers you can get from us!</h3>
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
                                        <img src="/star-shine.svg"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                                    <p className="text-gray-600">We will keep you updated via email.</p><br/>
                                    <Btn link="https://calendly.com/akwaowowillie" target="_blank" text="Meet With Us" className="mt-6" />
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


 


    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>




    
    </>
  )
}