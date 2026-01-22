"use client"
import React, { useState } from 'react';
import Script from 'next/script';
import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import { generateFAQSchema } from "@/components/SchemaMarkup";



export default function Faq() {

    const faqData = [
        {
          question: 'What is All Talentz?',
          answer:
            'All Talentz connects Employers with highly skilled remote workers from Africa at a low cost. Our service is flexible and helps you grow your business with the right talent for your needs.',
        },
        {
          question: 'Is All Talentz a Job board?',
          answer:
            "All Talentz is more than a job board. It is a platform that connects you with the best Talents for your specific needs. Whether you are looking for talent in a certain industry, skill, or role, we have a curated pool of qualified professionals ready to work with you. You don't have to waste time browsing through resumes or posting ads. Just tell us what you need and we will match you with the right talent.",
        },
        {
            question: 'Can I find any type of Remote Talent here?',
            answer:
              'At All Talentz, we offer a range of Talents for various needs, such as Administrative, Digital, Software development and Marketing roles. If you need Talents for other roles that are not listed on our website, you can contact us for a customised role and we will find a suitable professional for you.',
        },
        {
            question: 'My needs aren’t fully remote, more of a hybrid; what do I do?',
            answer:
              'All Talentz only provides remote workers for various businesses at the moment. However, we can discuss your hybrid needs and might be able to work with you on an Immigration visa for  on-site talent that suits your specific situation.',
        },
        {
            question: 'Is there someone I can talk to for a customised solution?',
            answer:
              'Yes! You can schedule a meeting with a representative here. We are available to help you out with your custom needs.',
        },
        {
            question: 'I have requested Talent and have not heard back, what do I do?',
            answer:
              'We apologize for any inconvenience caused by the delay in our response. This is a very uncommon situation and we are working hard to prevent it from happening again. Please contact us once more and we will do our best to assist you promptly.',
        },
        {
            question: ' have applied to join the Talent pool but I have not heard back, what do I do?',
            answer:
              'We apologize for any inconvenience caused by the delay in our response. Hiring managers are usually very busy. Please contact us once more and we will do our best to assist you promptly. And remember, kindness always wins.',
        },
        {
            question: 'I scheduled a meeting with an All Talentz representative but I missed the meeting, what do I do?',
            answer:
              'If you missed a meeting with an All Talentz representative, you can reschedule for another meeting at the next available time. Our representatives are quite understanding and are ever ready to help you.',
        },
        {
            question: 'How reliable are the services All Talentz provides?',
            answer:
              'Our reviews and ratings speak for themselves! We have a 5-star rating all around and our current clients give us a 5-star rating month-on-month.',
        },
        {
            question: 'Do I need an account to use All Talentz?',
            answer:
              'You do not need an account to use All Talentz. When you get on the website, you can fill the form and provide your details and we will reach out to you. Alternatively, you could schedule a meeting with a representative on our website.',
        },

        // Add more FAQ data here
      ];
    
      const [activeIndex, setActiveIndex] = useState(null);
    
      const toggleFaq = (index) => {
        if (activeIndex === index) {
          setActiveIndex(null);
        } else {
          setActiveIndex(index);
        }
      };

      const faqSchema = generateFAQSchema(faqData);
    


  return (
    <main className="relative overflow-hidden overflow-y-hidden" >
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
    
    <section>
        <PageHeader showBg={false}>

          {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
        <div className="max-w-6xl mx-auto justify-center align-middle md:flex relative h-[100%] items-center px-[20px] md:px-4 ">
                {/* First Column (60% width) */}
                <div className="md:w-[40%] pr-6">

                <h2 className="text-3xl md:text-[55px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white ">
                    FAQ 
                </h2>
                    
                <p className="text-white  text-sm md:text-md">
                Wondering how to get the best-value solution for your workforce needs? or are you looking to begin your journey to a global career? Check out the most commonly asked questions and answers below
                </p>

                </div>

                {/* Second Column (40% width) */}
                <div className="hidden md:block md:w-[60%] h-[60%] mt-8 md:mt-0">
                    <img
                        src="/faq.png"
                        alt="FAQ Alltalentz"
                        className="h-[450px] w-auto mx-auto"
                    />
                </div>
            </div>


            {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
          
            {/* </div> */}
            
        </PageHeader>
    </section>






    <section className="relative bg-cover bg-center bg-no-repeat py-[60px] md:py-[128px] bg-white px-[40px] md:px-0 " >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          
            <div className="w-[100%] md:w-[70%] mx-auto mt-[30px]">
                

            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`mb-[40px]  ${
                  activeIndex === index ? 'pb-13' : ''
                }`}
              >
                <div className="border-b border-[#555555]">
                <h3
                  className="flex justify-between items-center font-bold cursor-pointer py-[8px]"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="ml-2">
                    {activeIndex === index ? (

                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M4.56955 6.53416C4.09766 7.2065 4.09766 9.20499 4.09766 13.202V15.1704C4.09766 22.2179 9.39636 25.638 12.7209 27.0902C13.6227 27.4842 14.0736 27.6812 15.3477 27.6812C16.6217 27.6812 17.0726 27.4842 17.9745 27.0902C21.299 25.638 26.5977 22.2179 26.5977 15.1704V13.202C26.5977 9.20499 26.5977 7.2065 26.1258 6.53416C25.6539 5.86183 23.7747 5.2186 20.0165 3.93214L19.3005 3.68705C17.3414 3.01645 16.3619 2.68115 15.3477 2.68115C14.3334 2.68115 13.3539 3.01645 11.3948 3.68705L10.6788 3.93214C6.92056 5.2186 5.04145 5.86183 4.56955 6.53416Z" fill="#1C274C"/>
                            <path d="M19.0977 16.1187C19.6154 16.1187 20.0352 15.6989 20.0352 15.1812C20.0352 14.6634 19.6154 14.2437 19.0977 14.2437H11.5977C11.0799 14.2437 10.6602 14.6634 10.6602 15.1812C10.6602 15.6989 11.0799 16.1187 11.5977 16.1187H19.0977Z" fill="#1C274C"/>
                        </svg>
                
                    ) : (
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M4.25119 6.7534C3.7793 7.42574 3.7793 9.42423 3.7793 13.4212V15.3896C3.7793 22.4372 9.078 25.8572 12.4025 27.3095C13.3043 27.7034 13.7552 27.9004 15.0293 27.9004C16.3034 27.9004 16.7543 27.7034 17.6561 27.3095C20.9806 25.8573 26.2793 22.4372 26.2793 15.3896V13.4212C26.2793 9.42423 26.2793 7.42574 25.8074 6.7534C25.3355 6.08106 23.4564 5.43784 19.6982 4.15138L18.9821 3.90629C17.0231 3.23569 16.0435 2.90039 15.0293 2.90039C14.0151 2.90039 13.0355 3.23569 11.0765 3.90629L10.3604 4.15138C6.6022 5.43784 4.72309 6.08106 4.25119 6.7534Z" fill="#1C274C"/>
                            <path d="M15.9668 11.6504C15.9668 11.1326 15.5471 10.7129 15.0293 10.7129C14.5115 10.7129 14.0918 11.1326 14.0918 11.6504L14.0918 14.4629H11.2793C10.7615 14.4629 10.3418 14.8827 10.3418 15.4004C10.3418 15.9182 10.7615 16.3379 11.2793 16.3379H14.0918V19.1504C14.0918 19.6682 14.5115 20.0879 15.0293 20.0879C15.5471 20.0879 15.9668 19.6682 15.9668 19.1504V16.3379H18.7793C19.2971 16.3379 19.7168 15.9182 19.7168 15.4004C19.7168 14.8827 19.2971 14.4629 18.7793 14.4629H15.9668L15.9668 11.6504Z" fill="#1C274C"/>
                        </svg>   
                    )}
                  </span>
                </h3>
                </div>
                
                {activeIndex === index && (
                    <div className="py-[14px]">
                         <p className="font-normal pt-13 pb-13">{faq.answer}</p>
                    </div>
                )}
              </div>
            ))}


               
            </div>
        </div>      
    </section>


 


    <section className='px-[10px] md:px-0 bg-[#131313]'>
      <MainFooter/>
    </section>




    
    </main>
  )
}
