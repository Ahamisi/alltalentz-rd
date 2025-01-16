"use client"
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import { useRouter } from 'next/navigation';



import React, { useState } from 'react';
import Modal from 'react-modal';

export default function Watchlist() {




  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time
  const route = useRouter()

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
  };



  const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateForm()) {
          try {
              setIsLoading(true);
              // Send email using Nodemailer
              formData.cv = selectedFile
              // console.log(formData); return;


                // Create FormData and append form fields
              const newFData = new FormData();
              newFData.append("fullName", formData.fullName);
              newFData.append("email", formData.email);
              newFData.append("yoe", formData.yoe);
              newFData.append("phone", formData.phone);
              newFData.append("career", formData.career);
              newFData.append("cv", formData.cv);


                // Send the FormData with both regular form fields and the file to the server
              await fetch("/api/watchlist", {
                method: "POST",
                body: newFData, // Use the FormData object
              });
  

            
        
              // Show success message or redirect to a thank you page
              setIsSubmitted(true);
              console.log("Email sent successfully!");
              setIsLoading(false);
               // Add a countdown timer before redirection


              //  const countdownInterval = setInterval(() => {
              //   if (countdown == 0) {
              //     clearInterval(countdownInterval);
              //     console.log("done");
              //     console.log('redirecting')
              //     window.location.href = "https://alltalentz.com/cbt";
              //   } else if (countdown > 0) {
              //     console.log("Before: ", countdown);
              //     setCountdown((countdown) => countdown - 1);
              //     console.log("After: ", countdown);

              //   }
              // }, 1000);

              const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => {
                  if (prevCountdown === 0) {
                    clearInterval(countdownInterval);
                    console.log("done");
                    route.push(
                      "https://alltalentz.com/cbt"
                    );
                    return prevCountdown; // Countdown should not change when it reaches 0
                  } else if (prevCountdown > 0) {
                    return prevCountdown - 1;
                  }
                });
              }, 1000);
              
              
              
              
              
              
              



              
              // Add any further logic here for success actions
              // setShowConfetti(true);
            } catch (error) {
              // Handle error
              console.error("Failed to send email:", error);
              // Add any further logic here for error actions
            } finally {
              // setIsSubmitted(true);
            }
        
          // Set form submitted state
          // setIsSubmitted(true);

      }else{
          console.log("Form has errors");
      }
  };



 

  return (
    <main className="relative overflow-hidden overflow-y-hidden" >
    
    <section>
    <PageHeader>
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
            <div className="max-w-6xl mx-auto py-12 lg:flex relative h-fit mt-0 items-center px-[20px] md:px-4 ">
                {/* First Column (60% width) */}
                <div className="md:w-6/10 pr-6 md:w-full">
                <h2 className="text-2xl md:text-[60px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white">
                Begin Your Journey To A <span className="text-secondary">Global Career</span>

                  </h2>
                    
                    <p className="text-white text-sm md:text-base">
                        Join us and discover the world of opportunities and growth that await you. You'll learn new skills and explore new cultures from the comfort of your home. Don't miss this chance to grow professionally and personally. Start your global adventure today!
                    </p>
                    <div className="flex md:block flex-column mt-6 md:mt-0">
                       <Btn action={toggleModal} text="Get Started" otherCSS="md:mt-6 mt-[10px]"/>
                    </div>

                    {/* <Btn action={toggleModal} text="Get Started" otherCSS="md:mt-6"/> */}
                    {/* <button onClick={toggleModal} className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold">Get Started</button> */}
                        
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
                                        <img src="/star-shine.svg" alt="Alltalentz Logo"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
                                    <p className="text-gray-600">Wait while we redirect you to the test portal in {countdown} seconds.</p><br/>

                                    
                                    <Btn link="https://alltalentz.com/cbt" target="_blank" text="Take Test Now" className="mt-6" />
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="text-[#A6A6A6]">
                                                            <h2 className="text-lg font-normal text-center mb-8 text-[#939393]">Kindly fill this form and upload your CV to keep yourself in the loop</h2>

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
                                <input
                                  type="file"
                                  name="cv"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                                    errors.cv ? "border-red-500" : ""
                                  }`}
                                />
                               
                                {errors.cv && (
                                    <p className="text-red-500 text-sm">{errors.cv}</p>
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

                {/* Second Column (40% width) */}
                <div className="hidden lg:block md:w-4/10 mt-8 md:mt-0">
                    <img
                        src="/alltalent-star.png"
                        alt="All Talents Star"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        {/* </div> */}
        
    </PageHeader>
    </section>





    <section className="md-padding relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white  px-[30px] md:px-0 " style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          <h2 className="text-2xl md:text-5xl font-bold mb-8 text-center text-secondary">
          Want To Join A Global Team?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mt-[25px]">
            {/* Value Item 1 */}
            <div className="flex flex-col items-center bg-[#E6E6E6] rounded-[12px] p-[24px]">
              <div className="text-4xl mr-4 text-[#4C4C4C] text-center">
                 <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.15233 16.648C7.4081 16.3341 8.6806 17.0976 8.99454 18.3534L10.1882 23.128C12.0939 30.7507 18.0991 36.6607 25.7349 38.4531H50.4708C57.0053 38.4531 62.5053 43.344 63.2688 49.8338L65.2984 67.0855C65.4497 68.371 64.5301 69.5358 63.2446 69.687C61.959 69.8383 60.7943 68.9187 60.643 67.6332L58.6134 50.3815C58.1277 46.2524 54.6283 43.1406 50.4708 43.1406H25.2135L24.9623 43.0848C15.4773 40.977 7.99722 33.6911 5.64064 24.2648L4.447 19.4903C4.13306 18.2345 4.89656 16.962 6.15233 16.648Z" fill="#282828"/>
                    <path opacity="0.5" d="M25.4707 43.1406V56.4219C25.4707 62.3144 25.4707 65.2607 27.3013 67.0913C29.1319 68.9219 32.0781 68.9219 37.9707 68.9219C43.8633 68.9219 46.8095 68.9219 48.6401 67.0913C50.4707 65.2607 50.4707 62.3144 50.4707 56.4219V43.1406H25.4707Z" fill="#282828"/>
                    <circle cx="37.9707" cy="18.9219" r="12.5" fill="#282828"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-center">100% Remote</h3>
              </div>
            </div>

            {/* Value Item 2 */}
            <div className="flex flex-col items-center bg-[#E6E6E6] rounded-[12px] p-[24px] ">
              <div className="text-4xl mr-4 text-[#4C4C4C] text-center">
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M53.4259 9.06972C57.8278 6.88998 60.0288 5.80011 61.516 6.78967C63.0032 7.77922 62.7918 10.1928 62.3689 15.0201L62.2595 16.269C62.1394 17.6407 62.0793 18.3266 62.2939 18.9483C62.5085 19.57 62.9735 20.0572 63.9034 21.0315L64.7501 21.9185C68.0226 25.3472 69.6589 27.0615 69.1195 28.818C68.5802 30.5746 66.2224 31.21 61.5068 32.481L60.2868 32.8098C58.9468 33.1709 58.2768 33.3515 57.7425 33.7709C57.2082 34.1903 56.8701 34.8011 56.194 36.0227L55.5784 37.1348C53.1991 41.4336 52.0094 43.583 50.1889 43.679C48.3683 43.7751 47.1225 41.7542 44.631 37.7124L43.9864 36.6668C43.2784 35.5182 42.9244 34.9439 42.3796 34.5814C41.8348 34.219 41.1609 34.1093 39.813 33.8899L38.5859 33.6902C33.8429 32.9184 31.4713 32.5324 30.8855 30.8352C30.2997 29.1381 31.8876 27.2536 35.0633 23.4848L35.8849 22.5097C36.7873 21.4387 37.2386 20.9032 37.4361 20.2598C37.6337 19.6163 37.5553 18.9377 37.3984 17.5806L37.2556 16.345C36.7036 11.5692 36.4276 9.18133 37.8861 8.03636C39.3446 6.8914 41.5717 7.74764 46.026 9.46013L47.1783 9.90317C48.4441 10.3898 49.077 10.6331 49.7439 10.5979C50.4108 10.5628 51.0362 10.253 52.2871 9.63364L53.4259 9.06972Z" fill="#282828"/>
                    <g opacity="0.5">
                    <path d="M28.7348 35.5465C19.191 41.6383 10.6929 52.6601 7.00447 62.7707C5.80774 66.0511 8.56659 68.9225 12.0853 68.9225H15.3145C15.3147 67.8261 15.5714 66.4641 15.9511 65.0343C16.3418 63.5627 16.9046 61.8673 17.6062 60.0506C19.0089 56.418 21.0038 52.2033 23.3964 48.1868C25.7804 44.1847 28.6151 40.2849 31.7246 37.3554C31.8014 37.283 31.8787 37.211 31.9563 37.1394C31.8833 37.1172 31.8112 37.0947 31.74 37.0718C30.8517 36.7859 29.7415 36.331 28.7348 35.5465Z" fill="#1C274C"/>
                    <path d="M38.0338 38.3496C37.0379 38.9588 36.0035 39.7644 34.9389 40.7673C32.2609 43.2902 29.6835 46.7918 27.4235 50.5857C25.1721 54.3652 23.2911 58.341 21.979 61.7391C21.3231 63.4377 20.8187 64.9677 20.4816 66.2372C20.1339 67.5467 20.0022 68.4405 20.002 68.9225H28.8552C28.8555 65.41 30.072 58.9046 32.2735 52.3857C33.889 47.602 36.1261 42.5316 39.0089 38.5083L38.0338 38.3496Z" fill="#1C274C"/>
                    <path d="M42.0277 42.3998C39.9161 45.6613 38.1183 49.7288 36.7146 53.8854C34.5963 60.1582 33.5431 66.121 33.5427 68.9225H37.5702C41.0889 68.9225 43.9217 66.09 44.1559 62.6094C44.5585 56.6276 45.482 51.2364 46.5366 47.4024C45.4927 46.7894 44.6856 45.9835 44.0922 45.2868C43.4077 44.4833 42.7193 43.48 42.0277 42.3998Z" fill="#1C274C"/>
                    </g>
                </svg>

              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-center">Great Employment Benefits</h3>
              </div>
            </div>

            {/* Value Item 3 */}
            <div className="flex flex-col items-center bg-[#E6E6E6] rounded-[12px] p-[24px]">
              <div className="text-4xl mr-4 text-[#4C4C4C] text-center">
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.502 29.8591C20.5018 28.5647 19.4523 27.5155 18.1579 27.5156C16.8635 27.5158 15.8143 28.5653 15.8145 29.8597L15.8151 34.5475C15.8152 35.8419 16.8647 36.8911 18.1591 36.8909C19.4535 36.8908 20.5027 35.8413 20.5026 34.5469L20.502 29.8591Z" fill="#282828"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M60.3457 28.2969C60.3457 36.9263 53.3502 43.9219 44.7207 43.9219C36.0913 43.9219 29.0957 36.9263 29.0957 28.2969C29.0957 19.6674 36.0913 12.6719 44.7207 12.6719C53.3502 12.6719 60.3457 19.6674 60.3457 28.2969ZM42.377 22.0469C42.377 20.7525 43.4263 19.7031 44.7207 19.7031C49.4669 19.7031 53.3145 23.5507 53.3145 28.2969C53.3145 33.0431 49.4669 36.8906 44.7207 36.8906C39.9745 36.8906 36.127 33.0431 36.127 28.2969C36.127 27.0025 37.1763 25.9531 38.4707 25.9531C39.7651 25.9531 40.8145 27.0025 40.8145 28.2969C40.8145 30.4542 42.5633 32.2031 44.7207 32.2031C46.8781 32.2031 48.627 30.4542 48.627 28.2969C48.627 26.1395 46.8781 24.3906 44.7207 24.3906C43.4263 24.3906 42.377 23.3413 42.377 22.0469Z" fill="#282828"/>
                    <path opacity="0.5" d="M44.7207 43.9219C53.3502 43.9219 60.3457 36.9263 60.3457 28.2969C60.3457 24.8042 59.1997 21.5792 57.2633 18.9773C59.6289 19.0499 61.5279 19.2175 63.0846 19.6045C64.7056 20.0075 65.9555 20.6484 66.9748 21.6677C69.7207 24.4136 69.7207 28.833 69.7207 37.6719C69.7207 46.5107 69.7207 50.9301 66.9748 53.676C65.2657 55.3851 62.9082 56.0304 59.2403 56.2741L62.3555 61.466C63.0214 62.576 62.6615 64.0156 61.5516 64.6816C60.4416 65.3476 59.0019 64.9877 58.336 63.8777L53.8599 56.4176C52.9529 56.4219 51.9913 56.4219 50.9707 56.4219H25.9707C24.9501 56.4219 23.9885 56.4219 23.0815 56.4176L18.6055 63.8777C17.9395 64.9877 16.4998 65.3476 15.3899 64.6816C14.2799 64.0156 13.92 62.576 14.586 61.466L17.7011 56.2741C14.0332 56.0304 11.6757 55.3851 9.96658 53.676C7.2207 50.9301 7.2207 46.5107 7.2207 37.6719C7.2207 28.833 7.2207 24.4136 9.96658 21.6677C12.7125 18.9219 17.1319 18.9219 25.9707 18.9219H32.2196C30.258 21.5333 29.0957 24.7794 29.0957 28.2969C29.0957 36.9263 36.0913 43.9219 44.7207 43.9219Z" fill="#1C274C"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-center">Better Work-Life Balance</h3>
              </div>
            </div>

          </div>
          <div className=" max-w-6xl text-center mt-[40px]">
            <p className="text-base md:text-lg md:font-bold">
            Are you ready to take your career to the next level with world class training? At All Talentz, we invest in our new and existing employees so they can deliver the best service to our amazing clientele. You can work from anywhere and still be part of a global team. Plus, you can enjoy some of the most competitive compensation and benefits in Africa. Don't miss this opportunity to join us today and start your journey to a global career!            </p>
          </div>
        </div>      
    </section>


 


    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>




    
    </main>
  )
}
