"use client"
import React, { useState } from 'react';
import Btn from "@/components/Btn";

const ContactForm = ({ services = [] }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: [], // Initialize as an empty array
        redirect: false
    });

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.company) newErrors.company = "Company is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.service) newErrors.service = "Service is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                Let's help you find talents.
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                Kindly complete the form below, and we will respond as soon as possible
            </p>

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
                            <option value="" disabled selected className="text-gray-500">
                                Talents needed*
                            </option>
                            {services.map((service) => (
                                <option key={service} value={service} className="text-black py-2">
                                    {service}
                                </option>
                            ))}
                        </select>
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
    );
};

export default ContactForm;
