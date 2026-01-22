"use client"
import React from 'react';
import SubFooter from './SubFooter';
import Link from 'next/link';
import Btn from './Btn';
import Script from 'next/script';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';



const MainFooter = ({hideSub=false,brochure=false,meetWithUs=false}) => {
    const { ref, inView } = useInView();

    const containerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeInOut' }
      }
    };



  return (
    <>
        {
            !hideSub && <SubFooter brochure={brochure} meetWithUs={meetWithUs}/>
        }



        
            <motion.div
        className="bg-[#131313] py-12"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >                {/* First Row */}
                <div className="max-w-7xl mx-auto px-3">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                        {/* Left side - Menu sections */}
                        <div className="flex flex-col md:flex-row gap-8 flex-1">
                            <div>
                                <h4 className="text-white font-bold text-xl mb-4">Company</h4>
                                <ul className="text-white">
                                    <li className="mb-[12px]"><Link href="faq" className="hover:text-secondary font-light">FAQs</Link></li>
                                    <li className="mb-[12px]"><Link href="our-watchlist" className="hover:text-secondary font-light">Careers</Link></li>
                                    <li className="mb-[12px]"><Link href="about" className="hover:text-secondary font-light">About Us</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xl mb-4">Support</h4>
                                <ul className="text-white">
                                    <li className="mb-[12px]"><Link href="bootcamp" className="hover:text-secondary font-light">Jobs</Link></li>
                                    <li className="mb-[12px]"><Link href="bootcamp" className="hover:text-secondary font-light">Community</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xl mb-4">Legal</h4>
                                <ul className="text-white">
                                    <li className="mb-[12px]"><Link href="privacy-policy" className="hover:text-secondary font-light">Privacy Policy</Link></li>
                                    <li className="mb-[12px]"><Link href="privacy-policy" className="hover:text-secondary font-light">Terms &amp; Conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                    
                        {/* Right side - Newsletter */}
                        <div className="flex-shrink-0 w-full md:w-auto md:min-w-[400px]">
                            <h4 className="text-white font-bold text-xl mb-4 md:text-right">Receive latest news</h4>
                            <form>
                              <div className='flex flex-col lg:flex-row gap-4 justify-end'>
                              <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="py-2 px-4 text-[#4C4C4C] rounded-md focus:outline-none focus:ring focus:border-primary w-full lg:w-[60%]"
                                />
                                <Btn text="Subscribe" target="_blank" link="https://blog.alltalentz.com" type="submit" otherCSS=""/>
                              </div>
                            </form>
                            <p className="text-white mt-4 text-sm font-light">
                              By entering your email address, you confirming that you are agree to subscribe into our newsletter
                            </p>
                        </div>
                    </div>
                </div>

                {/* second Row */}
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                        {/* Address Section */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div>
                                <h4 className="text-white font-semibold mb-4">Address</h4>
                                <ul className="text-white">
                                    <li>United States</li>
                                    <li>2020 Brice Road, Suite 180, Reynoldsburg, OH 43068</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">&nbsp;</h4>
                                <ul className="text-white">
                                    <li>Nigeria</li>
                                    <li>151 Herbert Macaulay Way, Yaba, Lagos.</li>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Certification Badges */}
                        <div className="flex flex-wrap gap-4 items-center justify-end md:min-w-[400px]">
                            <Link href="https://www.iafcertsearch.org/certification/vD5DJrOP2lgDH3m3YPIqgqtH" target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="/certs/iso-badge.png" 
                                    alt="ISO 27001 Certified" 
                                    className="h-20 w-auto object-contain"
                                />
                            </Link>
                            <Link href="https://www.iafcertsearch.org/certification/vD5DJrOP2lgDH3m3YPIqgqtH" target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="/certs/AssurancePoint.png" 
                                    alt="Assurance Point Certified" 
                                    className="h-20 w-auto object-contain"
                                />
                            </Link>
                            <Link href="https://www.greatplacetowork.com/" target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="/gptw-badge-alltalentz.svg" 
                                    alt="Great Place to Work Certified" 
                                    className="h-20 w-auto object-contain"
                                />
                            </Link>
                        </div>
                    </div>
                </div>    

                {/* Divider Line */}
                <div className="border-t border-[#373435] my-8 w-full"></div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* third Row */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
                            <div>
                                <img src="/all-talents-footer.svg" alt="Footer Logo" />
                            </div>
                            <div className="text-white text-center md:text-left text-sm">
                                © {new Date().getFullYear()} All Talentz LLC. All rights reserved.
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-[30px] md:min-w-[400px]">
                            {/* Add your social media icons here */}
                            <Link href="https://instagram.com/all_talentz" target='_blank'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18.2561" cy="17.7708" r="14.6511" fill="#F99621"/>
                                <path d="M18.256 10.5639C20.6032 10.5639 20.8813 10.5728 21.8082 10.6151C22.6653 10.6542 23.1307 10.7974 23.4405 10.9178C23.8508 11.0773 24.1437 11.2678 24.4513 11.5754C24.7589 11.883 24.9494 12.1758 25.1088 12.5862C25.2292 12.8959 25.3724 13.3614 25.4115 14.2185C25.4538 15.1454 25.4628 15.4234 25.4628 17.7706C25.4628 20.1178 25.4538 20.3959 25.4115 21.3228C25.3724 22.1799 25.2292 22.6453 25.1088 22.9551C24.9494 23.3654 24.7589 23.6583 24.4513 23.9659C24.1437 24.2735 23.8508 24.464 23.4405 24.6234C23.1307 24.7438 22.6653 24.887 21.8082 24.9261C20.8814 24.9684 20.6034 24.9774 18.256 24.9774C15.9086 24.9774 15.6307 24.9684 14.7038 24.9261C13.8467 24.887 13.3813 24.7438 13.0715 24.6234C12.6612 24.464 12.3684 24.2735 12.0608 23.9659C11.7532 23.6583 11.5626 23.3654 11.4032 22.9551C11.2828 22.6453 11.1396 22.1799 11.1005 21.3228C11.0582 20.3959 11.0492 20.1178 11.0492 17.7706C11.0492 15.4234 11.0582 15.1454 11.1005 14.2185C11.1396 13.3614 11.2828 12.8959 11.4032 12.5862C11.5626 12.1758 11.7531 11.883 12.0608 11.5754C12.3684 11.2678 12.6612 11.0773 13.0715 10.9178C13.3813 10.7974 13.8467 10.6542 14.7038 10.6151C15.6308 10.5728 15.9088 10.5639 18.256 10.5639ZM18.256 8.97998C15.8686 8.97998 15.5692 8.9901 14.6316 9.03288C13.696 9.07556 13.0569 9.22417 12.4978 9.44146C11.9197 9.66611 11.4295 9.96669 10.9407 10.4554C10.452 10.9441 10.1515 11.4344 9.92685 12.0124C9.70952 12.5716 9.56091 13.2106 9.51823 14.1463C9.47545 15.0839 9.46533 15.3832 9.46533 17.7706C9.46533 20.158 9.47545 20.4574 9.51823 21.395C9.56091 22.3307 9.70952 22.9697 9.92685 23.5288C10.1515 24.1069 10.452 24.5971 10.9407 25.0859C11.4295 25.5746 11.9197 25.8751 12.4978 26.0998C13.0569 26.3171 13.696 26.4657 14.6316 26.5084C15.5692 26.5512 15.8686 26.5613 18.256 26.5613C20.6434 26.5613 20.9428 26.5512 21.8804 26.5084C22.8161 26.4657 23.4551 26.3171 24.0142 26.0998C24.5923 25.8751 25.0825 25.5746 25.5713 25.0859C26.06 24.5971 26.3605 24.1069 26.5852 23.5288C26.8025 22.9697 26.9511 22.3307 26.9938 21.395C27.0366 20.4574 27.0467 20.158 27.0467 17.7706C27.0467 15.3832 27.0366 15.0839 26.9938 14.1463C26.9511 13.2106 26.8025 12.5716 26.5852 12.0124C26.3605 11.4344 26.06 10.9441 25.5713 10.4554C25.0825 9.96669 24.5923 9.66611 24.0142 9.44146C23.4551 9.22417 22.8161 9.07556 21.8804 9.03288C20.9428 8.9901 20.6434 8.97998 18.256 8.97998Z" fill="#131313"/>
                                <path d="M18.2602 13.2607C15.7671 13.2607 13.7461 15.2818 13.7461 17.7748C13.7461 20.2679 15.7671 22.289 18.2602 22.289C20.7533 22.289 22.7744 20.2679 22.7744 17.7748C22.7744 15.2818 20.7533 13.2607 18.2602 13.2607ZM18.2602 20.7051C16.6419 20.7051 15.33 19.3932 15.33 17.7748C15.33 16.1565 16.6419 14.8446 18.2602 14.8446C19.8785 14.8446 21.1904 16.1565 21.1904 17.7748C21.1904 19.3932 19.8785 20.7051 18.2602 20.7051Z" fill="#131313"/>
                                <path d="M24.0072 13.0793C24.0072 13.6619 23.5349 14.1342 22.9523 14.1342C22.3698 14.1342 21.8975 13.6619 21.8975 13.0793C21.8975 12.4967 22.3698 12.0244 22.9523 12.0244C23.5349 12.0244 24.0072 12.4967 24.0072 13.0793Z" fill="#131313"/>
                            </svg>
                            </Link>

                            <Link href="https://twitter.com/AllTalentz" target='_blank'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18.4187" cy="17.7708" r="14.6511" fill="#F99621"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.2093 12.1365C26.5629 12.4237 25.8673 12.617 25.1377 12.7044C25.8826 12.2578 26.4545 11.5511 26.7235 10.709C26.0273 11.1227 25.2544 11.4222 24.4334 11.5845C23.7753 10.8836 22.8371 10.4453 21.8004 10.4453C19.8086 10.4453 18.1936 12.0603 18.1936 14.0522C18.1936 14.3346 18.2258 14.6101 18.2873 14.8743C15.2893 14.7243 12.6318 13.288 10.8527 11.1057C10.5421 11.6384 10.3645 12.2578 10.3645 12.9188C10.3645 14.17 11.0004 15.274 11.969 15.921C11.3772 15.9022 10.8216 15.7399 10.3347 15.4697V15.5149C10.3347 17.2629 11.5787 18.7203 13.2278 19.0526C12.9254 19.1346 12.6066 19.1791 12.2778 19.1791C12.0452 19.1791 11.819 19.1563 11.5987 19.1141C12.0575 20.5469 13.3901 21.59 14.9682 21.6193C13.7341 22.5862 12.1788 23.1634 10.4888 23.1634C10.1969 23.1634 9.9098 23.1464 9.62793 23.1124C11.2242 24.1356 13.1199 24.7333 15.1569 24.7333C21.7911 24.7333 25.419 19.2372 25.419 14.4712C25.419 14.3147 25.4161 14.1588 25.4085 14.0047C26.114 13.4949 26.7258 12.8597 27.2093 12.1365Z" fill="#131313"/>
                                </svg>
                            </Link>

                            <Link href="https://www.linkedin.com/company/all-talentz/" target='_blank'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="17.5828" cy="18.0276" r="14.6511" fill="#F99621"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7556 10.91C13.7556 11.8221 13.0611 12.5602 11.975 12.5602C10.9313 12.5602 10.2368 11.8221 10.2583 10.91C10.2368 9.95352 10.9313 9.23688 11.9958 9.23688C13.0611 9.23688 13.7348 9.95352 13.7556 10.91ZM10.3456 24.488V13.8639H13.6474V24.4873H10.3456V24.488Z" fill="#131313"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2943 17.2545C16.2943 15.9294 16.2507 14.7996 16.207 13.8654H19.075L19.2274 15.3209H19.2926C19.7271 14.6472 20.8132 13.627 22.5729 13.627C24.7451 13.627 26.3745 15.0609 26.3745 18.1881V24.4895H23.0726V18.6019C23.0726 17.2324 22.5951 16.2988 21.4002 16.2988C20.4875 16.2988 19.9448 16.9288 19.7278 17.5366C19.6405 17.7542 19.5975 18.0578 19.5975 18.3627V24.4895H16.2957V17.2545H16.2943Z" fill="#131313"/>
                            </svg>

                            </Link>



                        



                            <Link href="https://www.facebook.com/Alltalentz" target='_blank'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="17.7444" cy="17.7708" r="14.6511" fill="#F99621"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.6379 12.6117C21.1813 12.5204 20.5645 12.4522 20.1767 12.4522C19.1264 12.4522 19.0582 12.9088 19.0582 13.6394V14.94H21.6835L21.4547 17.6341H19.0582V25.8286H15.7711V17.6341H14.0815V14.94H15.7711V13.2736C15.7711 10.991 16.8439 9.7124 19.5374 9.7124C20.4732 9.7124 21.1582 9.84939 22.0483 10.032L21.6379 12.6117Z" fill="#131313"/>
                                </svg>
                            </Link>
                            {/* Add more social media icons as needed */}
                        </div>
                    </div>
                </div>    
            </motion.div>




    </>
  );
  
};

export default MainFooter;
