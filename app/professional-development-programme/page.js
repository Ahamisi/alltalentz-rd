"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Image from "next/image";
import TrainingApproach from '@/components/homeRD/TrainingApproach';
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import ClientVideos from "@/components/homeRD/ClientVideos";
import ClientWords from "@/components/homeRD/ClientWords";
import Faq from "@/components/homeRD/Faq";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SecureTestForm from '@/components/SecureTestForm';

export default function BootCamp() {

  const [isMobile, setIsMobile] = useState(false);
  

  const [isDuplicate, setIsDuplicate] = useState(null);
  const [bootCampOver, setBootCampOver] = useState(false);





  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time
  const [showTestForm, setShowTestForm] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const route = useRouter()


  useEffect(() => {
    // Function to update the isMobile state based on screen width
    function handleResize() {
      setIsMobile(window.innerWidth <= 640); // Adjust the breakpoint as needed
    }

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  // Define the image source based on the screen size
  const bootcampImg = isMobile ? "/bootcamp-mobile.svg" : "/bootcamp.svg";

  const bootcampImg1 = isMobile ? "/bootcamp/mobile-banner-bootcamp5.jpg" : "/bootcamp/alltalentzbanne5.jpg";



  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      yoe: "",
      career: "",
      phone: "",
      cv:"",
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


  const [selectedFile, setSelectedFile] = useState(null);
  const [nyscFile, setNyscFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleFileChangeNysc = (event) => {
    setNyscFile(event.target.files[0]);
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
      if (!formData.yoe) {
      newErrors.yoe = "Experience field is required";
      }
      if (!formData.career) {
        newErrors.career = "Career field is required";
        }
      if (!formData.phone) {
      newErrors.phone = "Phone is required";
      }
      if (!selectedFile) {
        newErrors.cv = "CV upload is required";
      }
      if (!nyscFile) {
        newErrors.nysc = "NYSC upload is required";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        setIsLoading(true);
  
        // Create FormData and append form fields
        const newFData = new FormData();
        newFData.append("fullName", formData.fullName);
        newFData.append("email", formData.email);
        newFData.append("yoe", formData.yoe);
        newFData.append("phone", formData.phone);
        newFData.append("career", formData.career);
  
        // Append the selected file (cv) to the FormData and nysc
        newFData.set('cv', selectedFile);
        newFData.set('nysc', nyscFile);


        // Validate for duplicate
        const isDuplicate = await checkDuplicate(formData.email);
        setIsDuplicate(isDuplicate); // Update state based on duplicate result

        if (isDuplicate) {
          console.error("Failed to send email:", { error: "This form has already been filled." });
          setIsLoading(false);
          return;
        }else{
          console.log('no tee', isDuplicate)
        }

        
      

  
        // Send the FormData with both regular form fields and the file to the server
        await fetch("/api/bootcamp", {
          method: "POST",
          body: newFData, // Use the FormData object
        });
  
        // setIsLoading(false); return;
        // setIsSubmitted(true);
        // console.log("Email sent successfully!");

        setIsSubmitted(true);
        console.log("Email sent successfully!");
        setIsLoading(false);

        // Show instructions first, then the test form
        setTimeout(() => {
          setShowInstructions(true);
          setIsOpen(false); // Close the modal
        }, 2000);
      } catch (error) {
        // Handle error
        console.error("Failed to send email:", error);
        // Add any further logic here for error actions
      } finally {
        // setIsSubmitted(true);
      }
    } else {
      console.log("Form has errors");
    }
  };
  

  const sheetDataHandler = (sheetData) => {
    console.log("sheet data: ", sheetData);
    if(sheetData){
      setIsDuplicate(true); return;
      clearInterval(countdownInterval);
    }
  };

  const checkDuplicate = async (email) => {
    return new Promise((resolve, reject) => {
      getSheetData({
        sheetID: "1Axrmq73QMgThtUd_BT20B0GokXoA9v8QjXEVxUClhqQ",
        sheetName: "Page1",
        query: `SELECT * where B contains "${email}"`,
        callback: (sheetData) => {
          // const isDuplicate = sheetData && sheetData?.table?.rows.length > 0;
          resolve(sheetData);
        },
        errorCallback: (error) => {
          reject(error);
        }
      });
    });
  };
  

  // const checkDuplicate = async(email) => {
  //    getSheetData({
  //     sheetID: "1Axrmq73QMgThtUd_BT20B0GokXoA9v8QjXEVxUClhqQ",
  //     sheetName: "Page1",
  //     query: `SELECT * where B contains "${email}"`,
  //     callback: sheetDataHandler
  //   })
  // }


  const getSheetData = ({ sheetID, sheetName, query, callback }) => {
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const url = `${base}&sheet=${encodeURIComponent(
      sheetName
    )}&tq=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then((res) => res.text())
      .then((response) => {
        callback(responseToObjects(response));
      });
  
    function responseToObjects(res) {
      const jsData = JSON.parse(res.substring(47).slice(0, -2));
      if(jsData?.table?.rows.length > 0){
        setIsDuplicate(true)
      }
      let data = [];
      const columns = jsData.table.cols;
      const rows = jsData.table.rows;
      let rowObject;
      let cellData;
      let propName;
      for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
        rowObject = {};
        for (let c = 0, colMax = columns.length; c < colMax; c++) {
          cellData = rows[r]["c"][c];
          propName = columns[c].label;
          if (cellData === null) {
            rowObject[propName] = "";
          } else if (
            typeof cellData["v"] == "string" &&
            cellData["v"].startsWith("Date")
          ) {
            rowObject[propName] = new Date(cellData["f"]);
          } else {
            rowObject[propName] = cellData["v"];
          }
        }
        data.push(rowObject);
      }
      return (jsData?.table?.rows.length > 0);
      // return data;
    }
  };

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

  // If instructions should be shown, render instructions modal
  if (showInstructions && !showTestForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Important Instructions</h2>
              <button
                onClick={() => setShowTestForm(true)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">To have a seamless onboarding on Savewyze, kindly follow the instructions below:</h3>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">1.</span>
                  <p className="flex-1">Ensure you have your <strong>NIN slip or card</strong> in your possession</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">2.</span>
                  <p className="flex-1">Ensure you fill in your <strong>First Name and Last Name</strong> as seen on your NIN slip or card (<strong>Not your Middle Name</strong>). This makes your NIN verification process seamless</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">3.</span>
                  <p className="flex-1">Your <strong>Wyze tag</strong> is a unique handle (like a Nickname) you can decide what that should be.</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-sm text-gray-700">
                  <strong>Need help?</strong> If you have any challenges, kindly reach out to{' '}
                  <a href="mailto:info@savewyze.com" className="text-[#F99621] hover:underline font-semibold">
                    info@savewyze.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowTestForm(true)}
                className="bg-[#F99621] text-black px-8 py-3 rounded font-bold hover:bg-opacity-90 transition-all"
              >
                Continue to Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If test form should be shown, render it instead of the main content
  if (showTestForm) {
    return <SecureTestForm />;
  }

  return (
    <main className="relative overflow-hidden overflow-y-hidden" >


      <PageHeader showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Welcome to <span className="text-[#F99621]">All Talentz</span>  <span className="text-white">professional development programme.</span>
            </h1>
            
            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Are you ready to level up your career? All Talentz Professional Development Program offers 
              intensive 90-days training programs led by industry experts. 
              Whether you're a recent graduate or a seasoned professional, our 
              flexible online and in-person format provides a smooth and convenient learning experience for our participants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              
              <button 
                onClick={toggleModal}
                className="bg-[#F99621] text-black px-8 py-4 rounded font-bold hover:bg-opacity-90 transition-all"
              >
                Apply to our PDP
              </button>
              
              <a 
                href="#bootcampVideos" 
                className="bg-white bg-opacity-10 text-white px-8 py-4 rounded font-bold hover:bg-opacity-20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <img 
                src="/redesign-25/estimator-bootcamp.png" 
                alt="Student learning" 
                className="w-auto h-[600px]"
              />
            
            </div>
          </div>
        </div>
      </PageHeader>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Service Request Form"
        className="modal shadow-md w-[80%] md:w-[50%] overflow-y-scroll"
        overlayClassName="overlay"
      >
        {bootCampOver ? (
          <div className="flex flex-col items-center text-black">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#FFCC00" />
                <circle cx="35" cy="35" r="5" fill="black" />
                <circle cx="65" cy="35" r="5" fill="black" />
                <path d="M40 55 Q50 70 60 55" stroke="black" strokeWidth="2" fill="transparent" />
              </svg>
            </div>
            <h1 className="text-[22px] text-center font-bold">Oops, the professional development programme application period is over.</h1>
            <p>Please be on the lookout for the next cycle of applications...</p>
          </div>
        ) : (

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
          {isSubmitted ? (
              <div className=" p-4 rounded-lg bg-[##FDDEBA] text-center mt-6 bg-white w-full m-0">
                  <div className="flex items-center justify-center">
                      <img src="/star-shine.svg" alt="Logo"/>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                  <p className="text-gray-600">Preparing your test portal...</p>
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F99621] mx-auto"></div>
                  </div>
              </div>
          ) : (
              isDuplicate ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Error:&nbsp;</strong>
                      <span className="block sm:inline">We have already received your application. <br/>Please contact support for further assistance.</span>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="text-[#A6A6A6]">
                {/* <h2 className="text-lg font-normal text-center mb-8 text-[#939393]">Kindly fill this form and upload your CV to keep yourself in the loop</h2> */}
          
          


                <div className="mb-8">
                  <input
                    type="text"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.fullName ? "border-red-500" : ""}`}
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
                  <input
                    type="email"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.email ? "border-red-500" : ""}`}
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
                  <input
                    type="tel"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.phone ? "border-red-500" : ""}`}
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
                  <input
                    type="number"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.yoe ? "border-red-500" : ""}`}
                    placeholder="Years of Experience"
                    onChange={handleInputChange}
                    name="yoe"
                    value={formData.yoe}
                  />
                  {errors.yoe && (
                    <p className="text-red-500 text-sm">{errors.yoe}</p>
                  )}
                </div>
          
                <div className="mb-8">
                  <input
                    type="text"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.career ? "border-red-500" : ""}`}
                    placeholder="Career Field"
                    onChange={handleInputChange}
                    name="career"
                    value={formData.career}
                  />
                  {errors.career && (
                    <p className="text-red-500 text-sm">{errors.career}</p>
                  )}
                </div>
          
                <div className="mb-8">
                  <label className="block text-gray-700 mb-1">Upload CV</label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.cv ? "border-red-500" : ""}`}
                  />
                  {errors.cv && (
                    <p className="text-red-500 text-sm">{errors.cv}</p>
                  )}
                </div>
          
                <div className="mb-8">
                  <label className="block text-gray-700 mb-1">Upload NYSC Cert.</label>
                  <input
                    type="file"
                    name="nysc"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChangeNysc}
                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${errors.nysc ? "border-red-500" : ""}`}
                  />
                  {errors.nysc && (
                    <p className="text-red-500 text-sm">{errors.nysc}</p>
                  )}
                  <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mt-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>Hey there, once you click submit, you would be redirected to take a compulsory test as the final stage.</p>
                  </div>
                </div>
          
                <button
                  type="submit"
                  className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z" />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
                </form>
              
              )
          )}
      </div>
         
        )}
      </Modal>

      <div className="bg-[#F99621] py-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="mr-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ESTIMATOR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ACCOUNT RECEIVABLES SPECIALIST
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            REVIEWER
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ADMINS
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            CSR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ESTIMATOR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
        </div>
      </div>

      <TrainingApproach />

      <section id="bootcampVideos">

      <ConferenceVideo 
        title="PDP Testimonials"
        description="Watch our students transform into industry professionals."
        videos={bootcampVideos}
      />
      </section>

      {/* <ClientWords 
        title="Bootcamp Testimonials"
        description="Hear what our graduates say about their bootcamp experience"
        theme="dark"
        testimonials={[
          {
            name: "Michael Brown",
            role: "Recent Graduate",
            company: "All Talentz Bootcamp",
            quote: "The hands-on experience and expert guidance were invaluable...",
            rating: 5
          },
        ]}
      /> */}

      <Faq 
        title="PDP FAQs"
        description="Common questions about our professional development program"
        faqs={[
          {
            question: "How long is the professional development program?",
            answer: "Our professional development program is an intensive 90-day program designed to transform you into an industry-ready professional."
          },
          {
            question: "What are the prerequisites for joining?",
            answer: "While no specific experience is required, candidates should have a strong work ethic and basic computer skills."
          },
          // ... more bootcamp-specific FAQs
        ]}
      />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter hideSub={true}/>
      </section>

    



    
    </main>
  )
}
