"use client"
import React, { useState } from 'react';
import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";



export default function Faq() {

    
      const [activeIndex, setActiveIndex] = useState(null);
    
    
    


  return (
    <>


    
    <section>
        <PageHeader>

    
            
        </PageHeader>
    </section>






    <section className="relative bg-cover bg-center bg-no-repeat py-[60px] md:py-[128px] bg-white px-[40px] md:px-0 " >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          
            <div className="w-[100%] md:w-[70%] mx-auto mt-[30px]">
                

              <div
                className={`mb-[40px] pb-13`}
              >
                <div className="border-b border-[#555555]">
                <h3
                  className="flex justify-between items-center font-bold cursor-pointer py-[8px]"
                >
                  Privacy Policy
                </h3>
                </div>
                
                    <div className="py-[14px]">
                         <p className="font-normal pt-13 mb-13">
                          This privacy policy (this "Privacy Policy") explains how personal information is collected, used, stored, and disclosed by All Talentz Limited, (All Talentz," "We," "Us," and "Our"). This Privacy Policy applies to Users (individually referred to as "You") of our websites, and other online services to which this Privacy Policy is posted (collectively, our "Services").
                        </p><br/>

                        <p className="font-normal pt-13 mb-13">
                          This Privacy Policy is part of our Terms of Use. By accessing or using our Services, you agree to this Privacy Policy and our Terms of Use. The provisions contained in this Privacy Policy supersede all previous notices and statements regarding our privacy practices with respect to our Services. If you do not agree to every provision of this Privacy Policy and our Terms of Use, you may not access or use our Services.
                        </p><br/>

                        <div className="mb-13">
                          <h2 className="font-bold">Application of this Privacy Policy</h2>
                          <p className="font-normal pt-13 mb-13">This Privacy Policy applies to your use of (regardless of means of access) our Services. You may access or use our Services through a desktop, laptop, mobile phone, tablet, or other consumer electronic device (each, a "Device").</p>
                        </div><br/>



                       

                        <div className="mb-13">
                          <h1 className="font-bold">Information We Collect</h1><br/>
                          <h2 className="font-bold">Information You Provide Us</h2>
                          <p className="font-normal pt-13 mb-13">In general, you can visit Our website; <a href="https://www.alltalentz.com" className="text-[#ffb300]">www.alltalentz.com</a> without telling us who you are or revealing any information about yourself. When you create an account, contact customer support, engage in other activities like Live chat and message feature or submit an inquiry via our Services, we may collect personal information from you, which may include your name, email address, mobile phone number, and other information that identifies you (collectively, "Personal Information"). By providing your Personal Information to us, you expressly agree to our collection, use, storage, and disclosure of such information as described in this Privacy Policy.</p>
                        </div><br/>


                        <div className="mb-13">
                          <h1 className="font-bold">Information Automatically Collected</h1><br/>
                          <p className="font-normal pt-13 mb-13">We (or our service providers acting on our behalf) may collect information about your use of our Services. This information may include Personal Information as well as statistical information that does not identify you ("Analytics"). Some Analytics may be correlated with Personal Information. When Analytics are, directly or indirectly, associated or combined with Personal Information, such Analytics will be considered Personal Information for purposes of this Privacy Policy.</p><br/>
                          <p className="font-normal pt-13 mb-13">Information that we automatically collect in connection with your access or use of our Services may include:</p><br/>
                          <p className="font-normal pt-13 mb-13">Device Information: We may collect Device-specific information (such as hardware model, operating system version, unique Device identifiers, and mobile network Information, including your mobile phone number). </p><br/>
                          <p className="font-normal pt-13 mb-13">Log Information: We may record or log information from your Devices, their software, and your activity accessing or using our Services. This information may include:</p><br/>
                          <ul>
                            <li>● The Device's Internet Protocol ("IP") address</li>
                            <li>●	Identification numbers associated with your Devices.</li>
                            <li>●	Device event information, such as crashes, system activity, and hardware settings</li>
                            <li>●	Location preferences</li>
                            <li>●	System configuration information</li>
                            <li>●	Other interactions with our Services</li>
                          </ul>
                        </div><br/>



                        <div className="mb-13">
                          <h1 className="font-bold">Information Collected Through Cookies and Similar Technologies</h1><br/>
                          <p className="font-normal pt-13 mb-13">We use cookies to personalize our Services for you and to collect aggregate information about usage of our Services.</p><br/>                        
                        </div><br/>

                        <div className="mb-13">
                          <h1 className="font-bold">How We Use Information</h1><br/>
                          <p className="font-normal pt-13 mb-13">We may use Analytics as described elsewhere in this Privacy Policy and for research and commercial purposes, such as to improve our Services.</p><br/>
                          <p className="font-normal pt-13 mb-13">We may use Personal Information for the purposes described elsewhere in this Privacy Policy and internally for our general commercial purposes, including, among other things, to offer our products and services and products and services of third parties that we think you might find of interest, but only All Talentz and our third-party service providers involved in distributing the offers or providing the products or services will have access to your Personal Information. Our third-party service providers will only be permitted to use Personal Information for that intended purpose.</p><br/>                        
                          <p className="font-normal pt-13 mb-13">We may use your email address to respond to your inquiries and to provide you information about our Services. You may elect not to receive promotional emails from us either by "unsubscribing" to an email you receive from us or by contacting us as indicated below. </p><br/>                        
                        </div><br/>



                        <div className="mb-13">
                          <h1 className="font-bold">How We Share Information</h1><br/>
                          <p className="font-normal pt-13 mb-13">We do not share your Personal Information with: (1) unaffiliated companies for their everyday business purposes; or (2) any third parties so they can market to you.</p><br/>
                          <p className="font-normal pt-13 mb-13">We may share your Personal Information with unaffiliated third parties: (1) if you request or authorize it; (2) if the information is provided to help complete a transaction for you; (3) if the information is provided to: (a) comply with applicable laws, rules, regulations, governmental and quasi-governmental requests, court orders, or subpoenas; (b) enforce our Terms of Use or other agreements; or (c) protect our rights, property, or safety or the rights, property, or safety of our users or others (e.g., to a consumer reporting agency for fraud protection, etc.); (4) if the disclosure is done as part of a purchase, transfer, or sale of services or assets (e.g., in the event that substantially all of our assets are acquired by another party, your Personal Information may be one of the transferred assets); (5) if the information is provided to our third-party service providers to perform functions on our behalf (e.g., analyzing data, providing marketing assistance, providing customer service, processing orders, etc.); (6) for our everyday business purposes; or (7) as permitted by applicable law or otherwise described in this Privacy Policy. </p><br/>                        
                          <p className="font-normal pt-13 mb-13">We may disclose Analytics with third parties as described elsewhere in this Privacy Policy and for our commercial purposes.</p><br/>                        
                        </div><br/>

                        <div className="mb-13">
                          <h1 className="font-bold">Opt-Out Rights</h1><br/>
                          <p className="font-normal pt-13 mb-13">If you do not wish to receive offers or other notices from us in the future, you can "opt out" by contacting us as indicated at the end of this Privacy Policy or by following the "unsubscribe" instructions in any communication you receive from us.</p><br/>
                        </div><br/>


                  

                        <div className="mb-13">
                          <h1 className="font-bold">Accessing Your Information</h1><br/>
                          <p className="font-normal pt-13 mb-13">You must notify us of any change in your Personal Information by updating your account profile through our Services. Any changes will affect only future uses of your Personal Information.</p><br/>
                          <p className="font-normal pt-13 mb-13">Subject to applicable law, which might, from time to time, oblige us to store your Personal Information for a certain period of time, we will respect your wishes to correct inaccurate information. Otherwise, we will hold your Personal Information for as long as we believe it will help us achieve our objectives as detailed in this Privacy Policy.</p><br/>
                          <p className="font-normal pt-13 mb-13">You can ask us whether we are storing your Personal Information and you can ask to receive a copy of that Personal Information. Before sending you any Personal Information, we will ask you to provide proof of your identity. If you are not able to provide proof of your identity, we reserve the right to refuse to send you any Personal Information.</p><br/>
                        </div><br/>



                        <div className="mb-13">
                          <h1 className="font-bold">Information You Share Socially</h1><br/>
                          <p className="font-normal pt-13 mb-13">Our Services may allow you to connect and share your actions, comments, content, and information publicly or with friends. We are not responsible for maintaining the confidentiality of any information you share publicly or with friends.</p><br/>
                          <p className="font-normal pt-13 mb-13">Our Services may also allow you to connect with us on, share on, and use third-party websites, applications, and services. Please be mindful of your personal privacy needs and the privacy needs of others, as you choose whom to connect with and what to share and make public. We cannot control the privacy or security of information you choose to make public or share with others. We also do not control the privacy practices of third parties. Please contact those sites and services directly if you want to learn about their privacy practices.</p><br/>

                        </div><br/>



                        <div className="mb-13">
                          <h1 className="font-bold">Data Security</h1><br/>
                          <p className="font-normal pt-13 mb-13">We have, and require our third-party service providers that receive Personal Information from us to have, a comprehensive written information security program that contains administrative, technical, and physical safeguards for our respective physical facilities and in our respective computer systems, databases, and communications networks that are reasonably designed to protect information contained within such systems from loss, misuse, or alteration. </p><br/>
                          <p className="font-normal pt-13 mb-13">We reserve the right, in our sole discretion, to refuse to provide our Services, and to remove or edit content.</p><br/>

                        </div><br/>


                        <div className="mb-13">
                          <h1 className="font-bold">Protecting Children's Privacy</h1><br/>
                          <p className="font-normal pt-13 mb-13">Our Services are not directed to children under the age of 18. We do not knowingly collect Personal Information from children under the age of 18. If you are under the age of 18, do not use our Services or submit any information to us. If we become aware that we have collected personal information from a child without parental consent, we will delete that information promptly.</p><br/>
                        </div><br/>


                        <div className="mb-13">
                          <h1 className="font-bold">Links to Third-Party Websites</h1><br/>
                          <p className="font-normal pt-13 mb-13">When you use our Services, you may be directed to other websites that are beyond our control. We may also allow third-party websites or applications to link to our Services. We are not responsible for the privacy practices of any third parties or the content of linked websites, but we do encourage you to read the applicable privacy policies and terms and conditions of such parties and websites. This Privacy Policy only applies to our Services.</p><br/>
                        </div><br/>

                        <div className="mb-13">
                          <h1 className="font-bold">Changes to our Privacy Policy</h1><br/>
                          <p className="font-normal pt-13 mb-13">Subject to applicable law, we may revise this Privacy Policy at any time and in our sole discretion. When we revise this Privacy Policy, we will post the revised version via our Services and will update the date at the top of this Privacy Policy. The revised Privacy Policy will be effective upon posting via our Services, unless otherwise set forth therein or as otherwise required by applicable law. You are free to decide whether or not to accept a revised version of this Privacy Policy, but accepting this Privacy Policy, as revised, is required for you to continue accessing or using our Services. If you do not agree to the terms of this Privacy Policy or any revised version of this Privacy Policy, your sole recourse is to terminate your access and use of our Services. Except as otherwise expressly stated by us, your access and use of our Services is subject to the version of this Privacy Policy in effect at the time of access or use.</p><br/>
                        </div><br/>



                        <div className="mb-13">
                          <h1 className="font-bold">Contact Us</h1><br/>
                          <p className="font-normal pt-13 mb-13">If you have any questions, comments, or concerns regarding these Terms or the Services, please contact us at <a href="mailto:info@alltalentz.com" className="text-[#ffb300]">info@alltalentz.com</a> </p><br/>
                          <p className="font-normal pt-13 mb-13">By using this website, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy.</p><br/>

                        </div><br/>



                    </div>
              </div>


               
            </div>
        </div>      
    </section>


 


    <section className='px-[30px] md:px-0 bg-[#131313]'>
      <MainFooter/>
    </section>




    
    </>
  )
}
