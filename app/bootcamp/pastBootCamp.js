"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";



import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

export default function BootCamp() {

  const [isMobile, setIsMobile] = useState(false);





  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time
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

  const bootcampImg1 = isMobile ? "/bootcamp-mobile.jpg" : "/bootcamp-banner.jpg";



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



  
        // Add a countdown timer before redirection
        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 0) {
              clearInterval(countdownInterval);
              console.log("done");
              route.push("https://alltalentz.com/cbt");
              return prevCountdown; // Countdown should not change when it reaches 0
            } else if (prevCountdown > 0) {
              return prevCountdown - 1;
            }
          });
        }, 1000);
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
  

 

  return (
    <>
    
    <section
      className={`relative h-auto lg:pb-12 bg-cover bg-center bg-no-repeat mt-[0px]  md:px-0 lg:px-0 bg-black font-montserrat`}
      
    >
      <Header type="bootcamp" />

      <div className={`flex h-[100%] flex-col`}>
        
        <div style={{ backgroundImage: `url(${bootcampImg1})`,  }} className="bg-contain bg-no-repeat h-[500px] md:h-[300px] lg:h-[380px] xl:h-[500px] w-full cursor-pointer md:bg-center" onClick={toggleModal}>
        </div>

      <div className="hidden">
      <div className="flex lg:flex-wrap flex-col lg:flex-row w-[100%] lg:w-[80%] mx-auto lg:hidden">
          <div className="w-full lg:w-1/2 p-6 items-center justify-center h-auto lg:pl-0  lg:h-[580px]">
          <div className="md:w-full flex flex-col gap-[30px] mt-[40px] lg:mt-[40px] xl:mt-[80px]">
                
                    <img src={bootcampImg} className="h-[287px] w-[327px] sm:h-auto sm:w-auto"/>
                    <p className="text-[#FEF5E9] text-md md:text-[20px]">
                     Join the ALL TALENTZ Estimate writing bootcamp and embark on a transformative journey over the next 3 months.
                     </p>
                  
                    <div className="flex md:block flex-column">
                       <Btn action={toggleModal} text="Apply Now" otherCSS=""/>
                    </div>

                    <div className="text-white">
                      <h6 className="text-[16px] lg:text-[25px] font-bold leading-[30px]">
                        Application opens
                      </h6>
                      <h6 className="text-[16px] md:text-[25px] font-bold leading-[30px]">
                        22nd January
                      </h6>
                      <p className="text-[16px] font-bold leading-[30px] text-[#F99621] mt-2px">**Applicant must have completed NYSC</p>
                    </div>

                    {/* <Btn action={toggleModal} text="Get Started" otherCSS="md:mt-6"/> */}
                    {/* <button onClick={toggleModal} className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold">Get Started</button> */}
                        
                      
                </div>

          </div>

          <div className="w-full lg:w-1/2 lg:p-4  lg:block">
            <div className="bg-cover bg-center h-64 sm:h-auto">
              <div className="h-full flex items-center justify-center ">
                <div className="relative lg:absolute lg:h-[500px] lg:w-[600px]  xl:h-[530px] right-0 xl:w-[750px] bottom-[-20px]">
                  <img src="/bootcamp-hero.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



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
                            {isSubmitted ? (
                               <div className=" p-4 rounded-lg bg-[##FDDEBA] text-center mt-6 bg-white w-full m-0">
                                    <div className="flex items-center justify-center">
                                        <img src="/star-shine.svg"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                                    <p className="text-gray-600">Wait while we redirect you to the test portal in {countdown} seconds.</p><br/>

                                    
                                    <Btn link="https://alltalentz.com/cbt" target="_blank" text="Take Test Now" className="mt-6" />
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="text-[#A6A6A6]">
                            <h2 className="text-lg font-normal text-center mb-8 text-[#939393]">Kindly fill this form and upload your CV to keep yourself in the loop</h2>

                                <div className="mb-8">
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
                                {/* <label className="block text-gray-700 font-semibold mb-1">yoe</label> */}
                                <input
                                    type="number"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.yoe ? "border-red-500" : ""
                                      }`}
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
                                {/* <label className="block text-gray-700 font-semibold mb-1">yoe</label> */}
                                <input
                                    type="text"
                                    className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                        errors.career ? "border-red-500" : ""
                                      }`}
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
                                  onChange={handleFileChangeNysc}
                                  className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                    errors.cv ? "border-red-500" : ""
                                  }`}
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
                                  onChange={handleFileChange}
                                  className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                    errors.cv ? "border-red-500" : ""
                                  }`}
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
    </section>
       


        





    <section className="md-padding relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[60px] bg-white  px-[30px] md:px-0 " style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  max-w-5xl mt-[25px] font-montserrat">
            {/* Value Item 1 */}
            <div className="flex flex-col p-[24px] gap-[20px]">
              <div className="text-4xl mr-4 text-[#4C4C4C] text-center">
              <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <path d="M24.1366 43.9894L27.5867 47.2779C28.5547 48.2005 29.1035 49.4868 29.1035 50.8329C29.1035 52.855 30.7223 54.4942 32.7191 54.4942H44.2379C46.2348 54.4942 47.8535 52.855 47.8535 50.8329C47.8535 49.4868 48.4024 48.2005 49.3703 47.2779L52.8204 43.9894C57.6367 39.3636 60.3262 33.2866 60.3533 26.9687L60.3535 26.7033C60.3535 15.9085 50.5597 7.02588 38.4785 7.02588C26.3973 7.02588 16.6035 15.9085 16.6035 26.7033L16.6037 26.9687C16.6309 33.2866 19.3204 39.3636 24.1366 43.9894Z" fill="#F99621"/>
                </g>
                <path fillRule="evenodd" clipRule="evenodd" d="M29.8848 59.2406C29.8848 57.9298 30.9341 56.8672 32.2285 56.8672H44.7285C46.0229 56.8672 47.0723 57.9298 47.0723 59.2406C47.0723 60.5514 46.0229 61.614 44.7285 61.614H32.2285C30.9341 61.614 29.8848 60.5514 29.8848 59.2406ZM31.9681 67.152C31.9681 65.8412 33.0174 64.7786 34.3119 64.7786H42.6452C43.9396 64.7786 44.9889 65.8412 44.9889 67.152C44.9889 68.4628 43.9396 69.5254 42.6452 69.5254H34.3119C33.0174 69.5254 31.9681 68.4628 31.9681 67.152Z" fill="#1C274C"/>
              </svg>

              </div>
              <div>
              <h3 className="text-2xl mb-2 f text-[#060606] font-bold">What you will learn</h3>
                <div>
                  <ul className="text-[16px] font-bold text-[#060606]  list-disc leading-[28px] ">
                    <li>The art of precise estimate writing.</li>
                    <li>Mastering industry specific tools and software.</li>
                    <li>Essential communication skills for success.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Value Item 2 */}
            <div className="flex flex-col p-[24px] gap-[20px]">
              <div className="text-4xl mr-4 text-[#4C4C4C] text-center">
              <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M6.37305 38.2759C6.37305 23.5445 6.37305 16.1788 10.9495 11.6023C15.526 7.02588 22.8917 7.02588 37.623 7.02588C52.3544 7.02588 59.7201 7.02588 64.2966 11.6023C68.873 16.1788 68.873 23.5445 68.873 38.2759C68.873 53.0073 68.873 60.373 64.2966 64.9494C59.7201 69.5259 52.3544 69.5259 37.623 69.5259C22.8917 69.5259 15.526 69.5259 10.9495 64.9494C6.37305 60.373 6.37305 53.0073 6.37305 38.2759Z" fill="#F99621"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M21.7287 35.9321H6.37379C6.37305 36.692 6.37305 37.473 6.37305 38.2759C6.37305 39.0788 6.37305 39.8598 6.37379 40.6196H31.3336C31.3835 40.6202 31.4335 40.6205 31.4836 40.6205H31.8823C30.8239 45.0993 26.8002 48.4321 21.998 48.4321C20.7036 48.4321 19.6543 49.4815 19.6543 50.7759C19.6543 52.0703 20.7036 53.1196 21.998 53.1196C27.8106 53.1196 32.8429 49.7787 35.2793 44.9123V69.5251C36.0392 69.5259 36.8202 69.5259 37.623 69.5259C38.4259 69.5259 39.2069 69.5259 39.9668 69.5251V44.9123C42.4032 49.7787 47.4354 53.1196 53.248 53.1196C54.5425 53.1196 55.5918 52.0703 55.5918 50.7759C55.5918 49.4815 54.5425 48.4321 53.248 48.4321C48.4459 48.4321 44.4222 45.0993 43.3638 40.6205H43.7634C43.8135 40.6205 43.8635 40.6202 43.9134 40.6196H68.8723C68.873 39.8598 68.873 39.0788 68.873 38.2759C68.873 37.473 68.873 36.692 68.8723 35.9321H53.5183C54.6147 34.5623 55.4339 32.9467 55.8807 31.1596C57.5628 24.4315 51.4684 18.3371 44.7402 20.0191C42.9527 20.466 41.3368 21.2855 39.9668 22.3823V7.02662C39.2069 7.02588 38.4259 7.02588 37.623 7.02588C36.8202 7.02588 36.0392 7.02588 35.2793 7.02662V22.3815C33.9095 21.2851 32.2939 20.4659 30.5068 20.0191C23.7786 18.3371 17.6842 24.4315 19.3663 31.1596C19.813 32.9467 20.6323 34.5623 21.7287 35.9321ZM35.2793 35.9321H31.365C27.8344 35.879 24.7726 33.4579 23.9138 30.0227C23.09 26.7276 26.0748 23.7429 29.3699 24.5666C32.805 25.4254 35.2262 28.4872 35.2793 32.0178V35.9321ZM43.882 35.9321H39.9677V32.1364L39.9673 32.0433C40.0092 28.502 42.4337 25.4275 45.8771 24.5666C49.1722 23.7429 52.157 26.7276 51.3332 30.0227C50.4744 33.4579 47.4125 35.879 43.882 35.9321Z" fill="#F99621"/>
              </svg>


              </div>
              <div>
              <h3 className="text-2xl mb-2  text-[#060606]  font-bold">What’s in it for you</h3>
                <div>
                  <ul className="text-[16px] font-bold text-[#060606]  list-disc leading-[28px] ">
                    <li>Competitive compensation during the bootcamp</li>
                    <li>Opportunity to secure a permanent position with our entry level salary.</li>
                    <li>Mentorship and guidance from industry experts.</li>
                  </ul>
                </div>
              </div>
            </div>

         

          </div>

        </div>      
    </section>


 


    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter hideSub={true}/>
    </section>




    
    </>
  )
}
