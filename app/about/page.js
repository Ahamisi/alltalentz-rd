import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";

export default function About() {


 

  return (
    <>
    
        
    <PageHeader about={true}>
        {/* <div className="relative inset-0 h-[100%] flex flex-col items-center"> */}
        <div className="max-w-6xl mx-auto px-4 justify-center align-middle lg:flex relative h-[100%] items-center ">
                {/* First Column (60% width) */}
                <div className="lg:w-4/10 pr-6 md:w-full">

                <h2 className="text-3xl md:text-[55px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white ">
                    The Best <span className="text-secondary">Value Solution</span> for your workforce needs.
                </h2>
                    
                <p className="text-white text-md">
                    All Talentz is more than just a recruitment company; We connect you with the best remote talent in Africa. Whether you need skilled, experienced, or reliable talent, we have the perfect match for you. And the best part is, you get amazing value for your money!
                </p>

                </div>

                {/* Second Column (40% width) */}
                <div className="hidden lg:block lg:w-6/10 mt-8 md:mt-0">
                    <img
                        src="/african-maps.png"
                        alt="Header Image"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        {/* </div> */}
        
    </PageHeader>


    
    {/* our value proposition */}
    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white " style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
            <div className="max-w-6xl mx-auto px-4 md:flex items-center justify-center">
            {/* Left Column (Longer) */}
            <div className="md:w-2/3 pr-8">
                <p className="text-lg md:text-[35px] md:leading-[45px] text-center font-bold">
                Since 2022, we have been passionately empowering the best talents in Africa with rewarding and meaningful careers and matching them with different global businesses to help them scale up their operations.
                </p>
            </div>

            {/* Right Column */}
            <div className="mt-6 md:mt-0 flex flex-wrap flex-row md:flex-col gap-3 md:gap-0 mr-6">
                <div className="mb-4">
                    <div className="bg-secondary text-white rounded-lg p-4 shadow-md h-[152px] w-[152px] flex flex-col text-center justify-center transition hover:bg-black hover:text-secondary duration-200 cursor-pointer">
                    <h3 className="text-4xl font-bold">100+</h3>
                    <p className="text-sm">
                        Clients
                    </p>
                    </div>
                </div>

                <div className="mb-4">
                <div className="bg-secondary text-white rounded-lg p-4 shadow-md h-[152px] w-[152px] flex flex-col text-center justify-center transition hover:bg-black hover:text-secondary duration-200 cursor-pointer">
                    <h3 className="text-4xl font-bold">99%</h3>
                    <p className="text-sm">
                        Positive Feedbacks
                    </p>
                    </div>
                </div>
            </div>
            <div className=" md:mt-0 flex flex-wrap flex-row md:flex-col gap-3 md:gap-0 mr-6">
            <div className="mb-4">
            <div className="bg-secondary text-white rounded-lg p-4 shadow-md h-[152px] w-[152px] flex flex-col text-center justify-center transition hover:bg-black hover:text-secondary duration-200 cursor-pointer">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-sm">
                    Locations
                </p>
                </div>
            </div>

            <div className="mb-4">
            <div className="bg-secondary text-white rounded-lg p-4 shadow-md h-[152px] w-[152px] flex flex-col text-center justify-center transition hover:bg-black hover:text-secondary duration-200 cursor-pointer">
                <h3 className="text-4xl font-bold">5000+</h3>
                <p className="text-sm">
                    Quality Professionals
                </p>
                </div>
            </div>
            </div>
            </div>
        </div>      
    </section>




    {/* svg home wrapper */}
    <section className="md-padding relative bg-cover bg-center bg-no-repeat py-[128px] bg-[#0E0E0E] px-[15px] md:px-0" style={{backgroundImage: "url('/rest-home.svg')"}}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}



        <div className="py-16 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Amazing <span className="text-secondary">Team</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
                    <div className="shadow-md">
                        <img
                            src='/sadiq-isu.png'
                            alt='Sasiq Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Sadiq <br/>Isu <span className="text-[12px]">MBA</span></h3>
                        <p className="text-[16px] text-secondary">Founder & CEO</p>
                    </div>

                    <div className="shadow-md">
                        <img
                            src='/abdul-isu.png'
                            alt='Abdul Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px]"
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Abdul <br/>Isu <span className="text-[12px]">Ph.D</span></h3>
                        <p className="text-[16px] text-secondary">Co-Founder</p>
                    </div>

                    <div className="shadow-md">
                        <img
                            src='/thompson.png'
                            alt='THompson Opurum'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Thompson Opurum <span className="text-[12px]"></span></h3>
                        <p className="text-[16px] text-secondary">Director, Operations</p>
                    </div>



                    <div className="shadow-md">
                        <img
                            src='/gina-isuu.png'
                            alt='Gina Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Gina <br/>Isu </h3>
                        <p className="text-[16px] text-secondary">Director of Marketing</p>
                    </div>





                </div>  

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center mt-[60px]">


                

                    <div className="shadow-md">
                        <img
                            src='/akwaowo.png'
                            alt='Sasiq Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Akwaowo Willie <span className="text-[12px]"></span></h3>
                        <p className="text-[16px] text-secondary">Relationship Manager</p>
                    </div>


                    <div className="shadow-md">
                        <img
                            src='/kehinde-femi.png'
                            alt='Sasiq Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Kehinde Oluwafemi </h3>
                        <p className="text-[16px] text-secondary">HR Manager</p>
                    </div>

                    <div className="shadow-md">
                        <img
                            src='/haolat.png'
                            alt='Abdul Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px]"
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Haolat Ogbomo</h3>
                        <p className="text-[16px] text-secondary">HR Manager</p>
                    </div>



                    <div className="shadow-md">
                        <img
                            src='/sam-akingbade.png'
                            alt='Sasiq Isu'
                            className="mx-auto rounded-[12px] h-[403px] w-[230px] "
                        />
                        <h3 className="text-[35px] font-semibold mt-2 ">Samuel Akingbade <span className="text-[12px]"></span></h3>
                        <p className="text-[16px] text-secondary">Head of Product & Marketing</p>
                    </div>

                  




                </div>  

                

                
          </div>
        </div>


    </section>




        {/* testimonial */}
    <section className="relative bg-cover bg-center bg-no-repeat text-[#282828] py-[70px] bg-secondary" style={{ backgroundImage: "url('/abstract-contact.svg')" }}>
            <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-left">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 ">
                        <div className="flex items-center mb-2">
                            <div>
                                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.56689 67.0229C5.27248 67.0229 4.22314 68.0723 4.22314 69.3667C4.22314 70.6611 5.27248 71.7104 6.56689 71.7104H69.0669C70.3613 71.7104 71.4106 70.6611 71.4106 69.3667C71.4106 68.0723 70.3613 67.0229 69.0669 67.0229H65.9419H58.1294H53.4419V50.6167C53.4419 44.7241 53.4419 41.7779 51.6113 39.9473C49.7807 38.1167 46.8344 38.1167 40.9419 38.1167H34.6919C28.7993 38.1167 25.8531 38.1167 24.0225 39.9473C22.1919 41.7779 22.1919 44.7241 22.1919 50.6167V67.0229H17.5044H9.69189H6.56689ZM29.2231 47.4917C29.2231 46.1973 30.2725 45.1479 31.5669 45.1479H44.0669C45.3613 45.1479 46.4106 46.1973 46.4106 47.4917C46.4106 48.7861 45.3613 49.8354 44.0669 49.8354H31.5669C30.2725 49.8354 29.2231 48.7861 29.2231 47.4917ZM29.2231 56.8667C29.2231 55.5723 30.2725 54.5229 31.5669 54.5229H44.0669C45.3613 54.5229 46.4106 55.5723 46.4106 56.8667C46.4106 58.1611 45.3613 59.2104 44.0669 59.2104H31.5669C30.2725 59.2104 29.2231 58.1611 29.2231 56.8667Z" fill="#282828"/>
                                    <g opacity="0.5">
                                    <path d="M25.3169 14.6792C28.2632 14.6792 29.7363 14.6792 30.6516 15.5945C31.5669 16.5098 31.5669 17.9829 31.5669 20.9292L31.5669 26.5305C32.0568 26.7687 32.4829 27.0689 32.8613 27.4473C34.1241 28.71 34.5158 30.5037 34.6373 33.4292V38.1167C28.7811 38.1167 25.8474 38.1224 24.0225 39.9473C22.1919 41.7779 22.1919 44.7241 22.1919 50.6167V67.0229H9.69189V38.1167C9.69189 32.2241 9.69189 29.2779 11.5225 27.4473C11.9009 27.0689 12.327 26.7687 12.8169 26.5306V20.9292C12.8169 17.9829 12.8169 16.5098 13.7322 15.5945C14.6475 14.6792 16.1206 14.6792 19.0669 14.6792H19.8481V9.9917C19.8481 8.69728 20.8975 7.64795 22.1919 7.64795C23.4863 7.64795 24.5356 8.69728 24.5356 9.9917V14.6792H25.3169Z" fill="#1C274C"/>
                                    <path d="M64.8289 17.0128C63.716 15.4068 61.7543 14.6712 57.831 13.1999C50.1583 10.3227 46.322 8.88405 43.6319 10.7482C40.9419 12.6124 40.9419 16.7096 40.9419 24.904V38.1167C46.8344 38.1167 49.7807 38.1167 51.6113 39.9473C53.4419 41.7779 53.4419 44.7241 53.4419 50.6167V67.0229H65.9419V24.904C65.9419 20.7139 65.9419 18.6188 64.8289 17.0128Z" fill="#1C274C"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#131313]">United States</h3>
                        <p className="text-sm text-[#131313]">2020 Brice Road, Reynoldsburg, OH 43068</p>
                    </div>
                    <div className="p-4 ">
                        <div className="flex items-center mb-2">
                            <div>
                                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M68.1278 36.8219L65.6856 34.8682V67.0229H69.5919C70.8863 67.0229 71.9356 68.0723 71.9356 69.3667C71.9356 70.6611 70.8863 71.7104 69.5919 71.7104H7.09188C5.79747 71.7104 4.74813 70.6611 4.74813 69.3667C4.74813 68.0723 5.79747 67.0229 7.09188 67.0229H10.9981V34.8682L8.55601 36.8219C7.54524 37.6305 6.07034 37.4666 5.26172 36.4558C4.45311 35.4451 4.61698 33.9702 5.62775 33.1615L31.0212 12.8468C35.3011 9.42283 41.3826 9.42283 45.6625 12.8468L71.056 33.1615C72.0668 33.9702 72.2307 35.4451 71.422 36.4558C70.6134 37.4666 69.1385 37.6305 68.1278 36.8219ZM38.3419 21.7104C33.5957 21.7104 29.7481 25.558 29.7481 30.3042C29.7481 35.0504 33.5957 38.8979 38.3419 38.8979C43.0881 38.8979 46.9356 35.0504 46.9356 30.3042C46.9356 25.558 43.0881 21.7104 38.3419 21.7104ZM43.7976 42.2155C42.3641 42.0227 40.5739 42.0228 38.4962 42.0229H38.1876C36.1099 42.0228 34.3197 42.0227 32.8861 42.2155C31.3498 42.422 29.8771 42.8878 28.6825 44.0824C27.488 45.2769 27.0222 46.7496 26.8156 48.2859C26.6229 49.7195 26.623 51.5097 26.6231 53.5874L26.6231 67.0229H31.3106H45.3731H50.0606L50.0606 53.5874L50.0606 53.2012C50.06 51.2873 50.0488 49.6299 49.8681 48.2859C49.6616 46.7496 49.1958 45.2769 48.0012 44.0824C46.8067 42.8878 45.334 42.422 43.7976 42.2155Z" fill="#282828"/>
                                    <g opacity="0.5">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.4355 30.3042C34.4355 28.1468 36.1844 26.3979 38.3418 26.3979C40.4992 26.3979 42.248 28.1468 42.248 30.3042C42.248 32.4616 40.4992 34.2104 38.3418 34.2104C36.1844 34.2104 34.4355 32.4616 34.4355 30.3042Z" fill="#1C274C"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.4355 30.3042C34.4355 28.1468 36.1844 26.3979 38.3418 26.3979C40.4992 26.3979 42.248 28.1468 42.248 30.3042C42.248 32.4616 40.4992 34.2104 38.3418 34.2104C36.1844 34.2104 34.4355 32.4616 34.4355 30.3042Z" fill="#282828"/>
                                    </g>
                                    <path opacity="0.5" d="M38.4961 42.0231C40.5738 42.023 42.364 42.0229 43.7976 42.2156C45.3339 42.4222 46.8066 42.888 48.0012 44.0825C49.1957 45.277 49.6615 46.7497 49.868 48.2861C50.0487 49.63 50.0599 51.2874 50.0605 53.2013L50.0606 67.0231H26.6231L26.6231 53.5875C26.6229 51.5099 26.6228 49.7196 26.8156 48.2861C27.0221 46.7497 27.4879 45.277 28.6825 44.0825C29.877 42.888 31.3497 42.4222 32.886 42.2156C34.3196 42.0229 36.1098 42.023 38.1875 42.0231H38.4961Z" fill="#1C274C"/>
                                    <path opacity="0.5" d="M50.8418 9.9917H58.6543C59.5172 9.9917 60.2168 10.6913 60.2168 11.5542L60.2168 24.4903L49.2793 15.7403V11.5542C49.2793 10.6913 49.9789 9.9917 50.8418 9.9917Z" fill="#1C274C"/>
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#131313]">Nigeria</h3>
                        <p className="text-sm text-[#131313]">151 Herbert Macaulay Way, Yaba, Lagos.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                        <div>
                        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M4.4834 23.7744C4.4834 17.7338 8.68073 12.8369 13.8584 12.8369C19.0361 12.8369 23.2334 17.7338 23.2334 23.7744V42.0036H9.13456C6.5658 42.0036 4.4834 39.5741 4.4834 36.5772V23.7744Z" fill="#282828"/>
                            <path opacity="0.8" d="M23.2334 23.7744V42.0036H29.4834H31.5667H41.5524C44.0916 42.0036 46.1501 39.602 46.1501 36.6396V23.7744C46.1501 17.7338 41.9527 12.8369 36.7751 12.8369H13.8584C19.0361 12.8369 23.2334 17.7338 23.2334 23.7744Z" fill="#1C274C"/>
                            <path d="M20.1084 42.0036V46.1703C20.1084 47.0332 20.808 47.7327 21.6709 47.7327C22.5338 47.7327 23.2334 47.0332 23.2334 46.1703V42.0036H20.1084Z" fill="#1C274C"/>
                            <path d="M31.5667 42.0036H28.4417V46.1703C28.4417 47.0332 29.1413 47.7327 30.0042 47.7327C30.8672 47.7327 31.5667 47.0332 31.5667 46.1703V42.0036Z" fill="#1C274C"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.1709 33.6702C9.1709 32.8073 9.87045 32.1077 10.7334 32.1077H16.9834C17.8463 32.1077 18.5459 32.8073 18.5459 33.6702C18.5459 34.5332 17.8463 35.2327 16.9834 35.2327H10.7334C9.87045 35.2327 9.1709 34.5332 9.1709 33.6702Z" fill="#1C274C"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.535 14.0551L37.0685 13.9483C37.9346 13.7749 38.8302 13.8577 39.6532 14.1872C41.0914 14.763 42.6641 14.8706 44.1625 14.4956L44.2905 14.4636C45.3815 14.1906 46.1504 13.1765 46.1504 12.0106V7.572C46.1504 6.03489 44.7667 4.90243 43.3284 5.26236C42.5024 5.46905 41.6355 5.40976 40.8428 5.09235L40.6905 5.03139C39.3634 4.50001 37.9193 4.36652 36.5227 4.64611L35.5879 4.83324C34.4632 5.05842 33.6504 6.08112 33.6504 7.27121V21.7551C33.6504 22.5827 34.2961 23.2536 35.0927 23.2536C35.8893 23.2536 36.535 22.5827 36.535 21.7551V14.0551Z" fill="#1C274C"/>
                        </svg>

                        </div>
                        <div className="ml-4">
                        <h3 className="text-lg font-semibold text-[#131313]">+1(614) 502-1440</h3>

                            
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div>
                            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.3851 28.1682L35.334 27.2248C36.6456 25.9205 38.6904 25.6525 40.3687 26.5649L44.3489 28.7285C46.9049 30.118 47.4681 33.5234 45.4704 35.5098L42.511 38.4524C41.7585 39.2007 40.8246 39.7475 39.7509 39.8476C37.2672 40.0792 32.1571 39.9542 26.1282 36.4251L34.3851 28.1682ZM22.0726 15.9256L22.6701 15.3315C24.1421 13.8678 24.2809 11.518 22.9966 9.80251L20.3696 6.29334C18.7801 4.17008 15.7085 3.8896 13.8866 5.70114L10.6166 8.95258C9.71327 9.85083 9.1079 11.0152 9.18131 12.3069C9.31615 14.6795 10.1249 19.0138 13.6581 24.3401L22.0726 15.9256Z" fill="#282828"/>
                                <path opacity="0.6" d="M25.9726 24.2897C19.8355 18.1875 22.0578 15.9398 22.0717 15.9258L13.6572 24.3403C15.0451 26.4325 16.8534 28.6778 19.2064 31.0174C21.5808 33.3784 23.9159 35.1308 26.1273 36.4253L34.3842 28.1684C34.3842 28.1684 32.1288 30.411 25.9726 24.2897Z" fill="#1C274C"/>
                            </svg>
                        </div>
                        <div className="ml-4">
                        <h3 className="text-lg font-semibold text-[#131313]">
                            info@alltalentz.com
                            </h3>
                        </div>
                    </div>
                    
                </div>
         
            </div>
        
            
    </section>



    <section>
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
