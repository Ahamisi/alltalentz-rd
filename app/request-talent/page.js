"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";

import React, { useState } from 'react';
import Modal from 'react-modal';


export default function RequestTalent() {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
      });

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
                resetForm();
          
                // Show success message or redirect to a thank you page
                console.log("Email sent successfully!");
                
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


    
    <section>
        <PageHeader>
            {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
                <div className="max-w-6xl mx-auto px-4 py-12 md:flex relative h-fit mt-0 items-center ">
                    {/* First Column (60% width) */}
                    <div className="md:w-6/10 pr-6 md:w-full">
                        <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">
                        Welcome to a world of <span className="text-secondary">amazing talents</span> to help scale your operations
                        </h2>
                        <p className="text-white text-md">
                        Prepare to be amazed by the incredible talents that can take your operations to the next level! You have come to the right place to find the best solutions for your needs. Whether you are looking for experts, innovators, or collaborators, you will find them here. Don't miss this opportunity to work with the most amazing talents in the world!
                        </p>
                        <button onClick={toggleModal} className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold">Get Started</button>
                        
                        <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        contentLabel="Service Request Form"
                        className="modal shadow-md w-[80%] md:w-[50%] overflow-y-scroll"
                        overlayClassName="overlay"
                        >
                        <div className="modal-content p-3 w-[100] md:w-[80%] mx-auto overflow-y-auto">
                            <button onClick={toggleModal} className="absolute top-2 right-2 text-dark bg-[#4C4C4C] p-3 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </button>
                            <img src="/logo.svg" alt="Logo" className="mx-auto mb-8 h-12" />
                            <h2 className="text-lg font-normal text-center mb-8 text-[#939393]">Please fill this form to help us find you the right talent</h2>
                            {isSubmitted ? (
                            <div className="success-message text-green-500 mb-4">Form submitted successfully!</div>
                            ) : (
                            <form onSubmit={handleSubmit} className="text-[#A6A6A6]">
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
                                <select
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.service ? "border-red-500" : ""
                                      }`}
                                    onChange={handleInputChange}
                                    value={formData.service}
                                    name="service"
                                    placeholder="Enter your phone number"
                                >
                                    <option value="" disabled>Select a service</option>
                                    <option value="Estimators">Estimators</option>
                                    <option value="Virtual Assistants">Virtual Assistants</option>
                                    <option value="Social Media Strategist">Social Media Strategist</option>
                                    <option value="Administrative Assistants">Administrative Assistants</option>
                                    <option value="Telemarketing Assistant">Telemarketing Assistant</option>
                                    <option value="Designers /Software Developers">Designers /Software Developers</option>
                                    <option value="Quick book Specialists">Quick book Specialists</option>
                                    <option value="Account Receivables">Account Receivables</option>
                                    <option value="Others">Others</option>


                                    {/* Add more options as needed */}
                                </select>
                                {errors.service && (
                                    <p className="text-red-500 text-sm">{errors.service}</p>
                                )}
                                </div>

                            <button
                            type="submit"
                            className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90"
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

                                {/* <button type="submit" className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90">Submit</button> */}
                            </form>
                            )}
                        </div>
                        </Modal>
                    </div>

                    {/* Second Column (40% width) */}
                    <div className="hidden md:block md:w-4/10 mt-8 md:mt-0">
                        <img
                            src="/our-talents.png"
                            alt="All Talents Africa"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            {/* </div> */}
            
        </PageHeader>
    </section>






    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[15px] md:px-0" style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-secondary">
          All Talentz Talents offering
          </h2>
            <Offerings/>
        </div>      
    </section>


 


    <section>
      <MainFooter/>
    </section>




    
    </>
  )
}
