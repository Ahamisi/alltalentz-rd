import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import ClientCarousel from "@/components/ClientSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
export default function Home() {
   
 

  return (
    <>
    
    <Hero/>
    {/* our value proposition */}
    <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[15px] md:px-0" style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#4C4C4C]">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Our Value Proposition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl pt-[70px]">
            {/* Value Item 1 */}
            <div className="flex flex-col">
              <div className="text-4xl mr-4 text-[#4C4C4C]">
              <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M51.9725 51.472C67.4058 36.0387 73.6614 17.2719 65.9448 9.55525C58.2281 1.83858 39.4614 8.09418 24.0281 23.5275C8.59479 38.9609 2.33921 57.7276 10.0559 65.4443C17.7725 73.161 36.5392 66.9054 51.9725 51.472Z" fill="#282828"/>
                <path opacity="0.3" d="M24.0275 51.4725C8.59417 36.0391 2.33859 17.2724 10.0552 9.55569C17.7719 1.83902 36.5386 8.09461 51.9719 23.528C67.4052 38.9613 73.6608 57.7281 65.9441 65.4447C58.2275 73.1614 39.4608 66.9058 24.0275 51.4725Z" fill="#282828"/>
                <path d="M45.8125 37.5C45.8125 41.8147 42.3147 45.3125 38 45.3125C33.6853 45.3125 30.1875 41.8147 30.1875 37.5C30.1875 33.1853 33.6853 29.6875 38 29.6875C42.3147 29.6875 45.8125 33.1853 45.8125 37.5Z" fill="#282828"/>
              </svg>

              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Highly-Skilled Employees</h3>
                <p className="text-lg">
                  Our remote talent are trained and certified in the latest skills, techniques and proficient in the software required.
                </p>
              </div>
            </div>

            {/* Value Item 2 */}
            <div className="flex flex-col">
              <div className="text-4xl mr-4 text-[#4C4C4C]">
                <svg width="76" height="75" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M56.6454 20.4941L50.9278 14.7765L50.9277 14.7765C46.098 9.94671 43.6831 7.53182 40.5499 6.63325C37.4168 5.73467 34.089 6.50261 27.4336 8.03848L23.5955 8.92419C17.9963 10.2163 15.1966 10.8624 13.2795 12.7795C11.3624 14.6966 10.7163 17.4963 9.42419 23.0955L8.53848 26.9336C7.00261 33.589 6.23467 36.9168 7.13325 40.0499C8.03182 43.1831 10.4467 45.598 15.2765 50.4278L20.9941 56.1454C29.3972 64.5485 33.5987 68.75 38.8198 68.75C44.0408 68.75 48.2423 64.5485 56.6454 56.1454C65.0485 47.7423 69.25 43.5408 69.25 38.3198C69.25 33.0987 65.0485 28.8972 56.6454 20.4941Z" fill="#282828"/>
                  <path d="M35.3338 44.7764C33.2307 42.6733 33.2486 39.6559 34.5062 37.2645C33.8777 36.3516 33.9694 35.0922 34.7813 34.2802C35.5903 33.4713 36.8435 33.3773 37.7556 33.9983C38.8177 33.4339 39.9847 33.1354 41.1475 33.1464C42.4419 33.1586 43.4813 34.2177 43.469 35.5121C43.4568 36.8065 42.3977 37.8459 41.1033 37.8336C40.5505 37.8284 39.8239 38.0765 39.2007 38.6997C37.9897 39.9107 38.3082 41.1217 38.6483 41.4618C38.9884 41.8019 40.1994 42.1204 41.4105 40.9094C43.8606 38.4593 48.0908 37.6461 50.8017 40.3569C52.9047 42.46 52.8869 45.4774 51.6292 47.8688C52.2578 48.7818 52.1661 50.0412 51.3541 50.8531C50.545 51.6622 49.2914 51.756 48.3792 51.1346C46.9515 51.8934 45.3272 52.1778 43.7786 51.8595C42.5107 51.599 41.6941 50.3599 41.9546 49.0919C42.2152 47.824 43.4543 47.0074 44.7222 47.268C45.2758 47.3817 46.1683 47.2001 46.9347 46.4336C48.1458 45.2226 47.8273 44.0116 47.4872 43.6715C47.147 43.3314 45.9361 43.0129 44.725 44.2239C42.2749 46.6741 38.0446 47.4872 35.3338 44.7764Z" fill="#282828"/>
                  <path d="M31.8159 32.166C34.2567 29.7252 34.2567 25.7679 31.8159 23.3272C29.3751 20.8864 25.4178 20.8864 22.9771 23.3272C20.5363 25.7679 20.5363 29.7252 22.9771 32.166C25.4178 34.6068 29.3751 34.6068 31.8159 32.166Z" fill="#282828"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Affordable Cost</h3>
                <p className="text-lg">
                Save up to 70% on cost when you use our remote talent which leads to considerable savings on cost of operations.
                </p>
              </div>
            </div>

            {/* Value Item 3 */}
            <div className="flex flex-col">
              <div className="text-4xl mr-4 text-[#4C4C4C]">
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M68.75 37.5C68.75 54.7589 54.7589 68.75 37.5 68.75C20.2411 68.75 6.25 54.7589 6.25 37.5C6.25 20.2411 20.2411 6.25 37.5 6.25C54.7589 6.25 68.75 20.2411 68.75 37.5Z" fill="#282828"/>
                  <path d="M32.5398 26.5559L33.0518 25.6374C35.031 22.087 36.0205 20.3118 37.5 20.3118C38.9795 20.3118 39.969 22.087 41.9482 25.6374L42.4602 26.5559C43.0226 27.5648 43.3038 28.0693 43.7423 28.4021C44.1807 28.7349 44.7268 28.8585 45.8189 29.1056L46.8132 29.3306C50.6565 30.2001 52.5781 30.6349 53.0353 32.1051C53.4925 33.5753 52.1824 35.1072 49.5624 38.171L48.8845 38.9637C48.14 39.8343 47.7677 40.2696 47.6002 40.8082C47.4327 41.3468 47.489 41.9276 47.6016 43.0892L47.7041 44.1468C48.1002 48.2346 48.2983 50.2785 47.1013 51.1871C45.9044 52.0957 44.1052 51.2673 40.5068 49.6105L39.5758 49.1818C38.5532 48.711 38.042 48.4756 37.5 48.4756C36.958 48.4756 36.4468 48.711 35.4242 49.1818L34.4932 49.6105C30.8948 51.2673 29.0956 52.0957 27.8987 51.1871C26.7018 50.2785 26.8998 48.2346 27.2959 44.1468L27.3984 43.0892C27.511 41.9276 27.5673 41.3468 27.3998 40.8082C27.2323 40.2696 26.86 39.8343 26.1155 38.9637L25.4377 38.171C22.8176 35.1072 21.5075 33.5753 21.9647 32.1051C22.4219 30.6349 24.3436 30.2001 28.1868 29.3306L29.1811 29.1056C30.2732 28.8585 30.8193 28.7349 31.2577 28.4021C31.6962 28.0692 31.9774 27.5648 32.5398 26.5559Z" fill="#282828"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Vetted & Reliable Employees</h3>
                <p className="text-lg">
                  Our remote talent are vetted and verified by us, and we provide ongoing support and feedback to ensure quality and satisfaction.
                </p>
              </div>
            </div>

            {/* Value Item 4 */}
            <div className="flex flex-col">
              <div className="text-4xl mr-4 text-[#4C4C4C]">
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.196 49.8816C44.594 50.6777 44.2477 51.6449 43.4348 52.0074L14.0546 65.1095C9.3801 67.1941 4.53145 62.5652 6.84686 58.2285L16.697 39.7794C17.4631 38.3445 17.463 36.6555 16.697 35.2206L6.84686 16.7715C4.53145 12.4348 9.3801 7.80592 14.0546 9.8905L25.0681 14.802C26.3895 15.3913 27.4656 16.4208 28.1127 17.715L44.196 49.8816Z" fill="#282828"/>
                  <path opacity="0.5" d="M48.5426 48.0954C48.9165 48.8433 49.8129 49.1642 50.5766 48.8237L65.6471 42.103C69.7838 40.2582 69.7838 34.7444 65.6471 32.8996L37.8416 20.4998C36.5019 19.9024 35.1517 21.3136 35.8077 22.6256L48.5426 48.0954Z" fill="#282828"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Contribute to Success</h3>
                <p className="text-lg">
                Our talent understand the job and are solutions-oriented; ultimately, they contribute to your success.
                </p>
              </div>
            </div>
          </div>
        </div>      
    </section>



    {/* our offerings */}
    <section className="relative bg-cover bg-center bg-no-repeat py-[128px] bg-[#0E0E0E]">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">
          Our range of vetted remote employees cut <br/>across varied business needs and niches.
          </h2>
          <div className="text-[#A5A5A5] px-[15px] md:px-0">
            <Offerings/>
          </div>
        </div>      
    </section>


    {/* svg home wrapper */}
    <section className="relative bg-cover bg-center bg-no-repeat py-[68px] bg-[#0E0E0E]" style={{backgroundImage: "url('/rest-home.svg')"}}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}



        <div className=" text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Clients that <span className="text-secondary">trust</span> us!</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            All Talentz provides employee recruitment services for over 30 Puroclean Franchises in the US and we have created job opportunities for 50 remote employees across Nigeria since we commenced operations in March 2022.
            </p>
            <ClientCarousel/>
            {/* <Clients/> */}
          </div>
        </div>





        <div className="py-16 text-white px-[15px] md:px-0">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Left Part */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4"> The All Talentz Conference</h2>
              <p className="text-lg mb-6">
              The All-Talentz Conference is an annual event/retreat where all talents in All-Talentz go through a re-orientation in excellence and service delivery.
              </p>
              <button className="bg-transparent text-secondary py-3 text-xl rounded-full items-center flex p-0">
                View More &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              </button>
            </div>

            {/* Right Part */}
            <div className="md:w-1/2">
              <video width="100%" controls poster="/video-cover.png">
                <source src="/video/all-talent.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>





      <div className="py-16 bg-[#4C4C4C] rounded-[32px] text-white text-center w-[100%] md:w-[80%] mx-auto mt-[90px] ">
        <div className="max-w-6xl flex flex-col md:flex-row justify-center">
          {/* Left Column */}
          <div className="mb-8 md:mb-0 md:mr-8 px-[40px] flex flex-col flex-1">

            <img
              src="/quality-talents.png" 
              alt="Image 1"
              className="rounded-[12px] border-12 border-white w-[317px] h-[169px] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-secondary">Quality Talent At A Bargain</h3>
            <p className="text-md">Flexible labour that scales with your company. We employ the talent, therefore there are no payroll costs, benefit costs, or high overhead costs that accrue to you.</p>
          </div>

          {/* Right Column */}
          <div className="px-[40px] flex flex-col flex-1">
            <img
              src="/top-tier-talent.png" 
              alt="Image 2"
              className="rounded-[12px] border-12 border-white w-[317px] h-[169px] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-secondary">Top-Tier Talent From Day 1</h3>
            <p className="text-md">Our talents are on the money, and we're determined to meet your company's demands and keep them in line with best practices. If you are not satisfied with our Talent after 30 days, we'll replace them.</p>
          </div>
        </div>
      </div>







    {/* find talents in 3 steps */}


      <div className="py-16 bg-white rounded-[32px] text-[#4C4C4C] text-center w-[100%] md:w-[80%] mx-auto mt-[90px] bg-cover bg-center" style={{ backgroundImage: "url('/orange-clients.svg')" }}>
          <div className="max-w-6xl mx-auto text-center">
            {/* Header and Description */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Talents in 3 Steps!</h2>
            <p className="text-lg mb-12">
            We make finding your talent easy by curating the best match for your unique needs.
            </p>

            {/* Three Columns */}
            <div className="flex flex-col md:flex-row justify-between gap-[42px] w-[90%] mx-auto">
              {/* Column 1 */}
              <div className="flex flex-col items-center bg-secondary p-[40px] flex-1">

                <svg width="131" height="130" viewBox="0 0 131 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7701 28.5588C12.9467 28.0146 15.1524 29.338 15.6966 31.5147L17.7655 39.7906C21.0687 53.0033 31.4778 63.2473 44.7132 66.3541H87.5887C98.9151 66.3541 108.449 74.8318 109.772 86.0807L113.29 115.984C113.552 118.212 111.958 120.231 109.73 120.493C107.502 120.755 105.483 119.161 105.221 116.933L101.703 87.03C100.861 79.873 94.7951 74.4791 87.5887 74.4791H43.8094L43.3741 74.3824C26.9333 70.7289 13.9679 58.1002 9.88314 41.7612L7.81415 33.4853C7.26998 31.3086 8.59339 29.1029 10.7701 28.5588Z" fill="#282828"/>
                  <path opacity="0.5" d="M44.2554 74.4791V97.5C44.2554 107.714 44.2554 112.821 47.4284 115.994C50.6014 119.167 55.7083 119.167 65.922 119.167C76.1358 119.167 81.2427 119.167 84.4157 115.994C87.5887 112.821 87.5887 107.714 87.5887 97.5V74.4791H44.2554Z" fill="#282828"/>
                  <ellipse cx="65.922" cy="32.5" rx="21.6667" ry="21.6667" fill="#282828"/>
                </svg>

                <h3 className="text-xl font-semibold mb-2">Client Reaches Out</h3>
                <p className="text-lg">We have a wide range of Talent just right for you at your fingertips.</p>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col items-center bg-secondary p-[40px] flex-1">
                <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M77.01 18.9564C69.3129 15.3479 60.687 15.3479 52.9899 18.9564L16.7463 35.9482C10.918 38.6807 9.39844 46.3857 12.1877 51.7111L12.1877 78.5417C12.1877 80.7853 14.0065 82.6042 16.2502 82.6042C18.4938 82.6042 20.3127 80.7853 20.3127 78.5417V57.8069L52.9904 73.1269C60.6875 76.7355 69.3133 76.7355 77.0105 73.1269L113.254 56.1351C121.138 52.439 121.138 39.6446 113.254 35.9485L77.01 18.9564Z" fill="#1C274D"/>
                  <path opacity="0.5" d="M27.0835 60.9812L52.9904 73.1269C60.6875 76.7355 69.3133 76.7355 77.0105 73.1269L102.917 60.9814V90.0534C102.917 95.5136 100.19 100.626 95.4129 103.271C87.4593 107.676 74.7285 113.749 65.0002 113.749C55.2718 113.749 42.5411 107.676 34.5874 103.271C29.8108 100.626 27.0835 95.5136 27.0835 90.0534V60.9812Z" fill="#373737"/>
                </svg>

                <h3 className="text-xl font-semibold mb-2">Recruitment & Training</h3>
                <p className="text-lg">All Talentz provides suitable Talent after training them to suit the Job requirement.</p>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col items-center bg-secondary p-[40px] flex-1">
                <svg width="131" height="130" viewBox="0 0 131 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5">
                  <path d="M59.2254 35.6123C58.3832 31.9918 57.6698 28.9252 56.896 26.5175L92.8283 36.9406C93.0659 37.0095 93.6831 37.2821 94.537 39.5201C95.3716 41.7073 96.1262 44.9232 97.2115 49.5881L97.8612 52.3824C98.005 53.004 98.1422 53.5969 98.2886 54.1589L65.7232 45.1396L64.0787 44.2029C61.7522 42.8779 61.3244 42.5698 61.0236 42.1499C60.6884 41.6821 60.4862 41.0314 59.8266 38.1964L59.2254 35.6123Z" fill="#131313"/>
                  <path d="M77.7778 54.0988L104.903 61.6114L106.547 62.548C110.375 64.728 112.954 66.2066 114.635 67.5533C116.244 68.8427 116.521 69.6124 116.545 70.2678C116.57 70.9575 116.319 71.8231 114.772 73.3741C113.18 74.9705 110.702 76.821 107.061 79.5259L104.9 81.1316C103.878 81.8887 102.953 82.5742 102.176 83.3409L65.3166 72.649L67.2593 71.2054C70.6751 68.6675 73.4848 66.5799 75.3953 64.664C77.3845 62.6693 78.8517 60.4209 78.7458 57.5343C78.6983 56.2389 78.3452 55.1079 77.7778 54.0988Z" fill="#131313"/>
                  <path d="M61.6994 77.2396L99.683 88.2579C99.5251 89.0235 99.3993 89.8461 99.2632 90.736L98.8243 93.588C98.4065 96.3008 97.79 98.7169 97.135 100.764C95.9812 104.37 95.6857 104.871 94.8187 105.369C94.4462 105.583 94.0953 105.676 93.3609 105.594C92.4616 105.493 91.3093 105.168 89.3428 104.597L57.9556 95.4926C58.3324 94.6988 58.6309 93.8491 58.8835 92.9844C59.6699 90.2928 60.2358 86.6177 60.9336 82.0855L61.3409 79.4411C61.4857 78.5005 61.6 77.7897 61.6994 77.2396Z" fill="#131313"/>
                  </g>
                  <path d="M40.2014 32.8939C43.3023 29.4341 45.4256 27.076 47.1389 25.6499C48.8739 24.2057 49.4406 24.3542 49.6162 24.4052C49.8537 24.4741 50.471 24.7467 51.3249 26.9847C52.1595 29.1718 52.914 32.3877 53.9994 37.0527L54.6491 39.847C55.1541 42.0296 55.5736 43.8428 56.6203 45.3039C57.6992 46.8098 59.2656 47.6987 61.0517 48.7124L61.3979 48.9092L63.3353 50.0126C67.1627 52.1925 69.7422 53.6711 71.4228 55.0178C73.032 56.3073 73.3088 57.077 73.3328 57.7323C73.3581 58.422 73.1065 59.2877 71.5599 60.8387C69.9679 62.4351 67.4896 64.2855 63.8492 66.9905L61.688 68.596C59.9679 69.8708 58.5222 70.9423 57.5897 72.5409C56.6776 74.1044 56.3976 75.9347 56.051 78.201L55.6122 81.0525C54.8746 85.8421 54.358 89.1588 53.6843 91.4649C53.3052 92.7626 52.9445 93.4866 52.6401 93.9001C52.0531 93.682 51.2713 93.3635 50.3485 92.9215C48.1538 91.8702 45.1804 90.1287 42.135 87.3894L40.4423 85.8667L40.368 85.7999C39.5019 85.0208 38.732 84.3281 38.0349 83.7997C37.281 83.2282 36.4678 82.7331 35.4725 82.4444C33.7129 81.934 31.9012 82.274 29.9477 82.6406L29.5259 82.7195L27.3567 83.1219C23.0628 83.9184 20.1848 84.443 18.1201 84.4816C16.1374 84.5186 15.7206 84.0912 15.4977 83.78C15.1862 83.3452 14.8956 82.5028 15.3794 80.1303C15.8611 77.7683 16.9449 74.6181 18.5182 70.0712L19.4506 67.3771C20.2021 65.2117 20.8032 63.4799 20.7361 61.6522C20.6686 59.8114 19.9344 58.1521 19.028 56.1038L17.9033 53.5557C16.0037 49.2513 14.7007 46.2831 14.052 44.0134C13.4101 41.767 13.6097 40.8568 13.9326 40.3033C14.2006 39.844 14.6858 39.355 16.6405 39.1135C18.6974 38.8595 21.5964 38.9738 25.9258 39.158L28.1132 39.2511L28.526 39.2692C30.5131 39.3576 32.3324 39.4385 34.0213 38.6922C35.6643 37.9662 36.9066 36.5757 38.3319 34.9803L38.6288 34.6484L40.2014 32.8939Z" fill="#131313"/>
                </svg>

                <h3 className="text-xl font-semibold mb-2">Onboarding & Handover</h3>
                <p className="text-lg">All Talentz onboards Talent with necessary work tools and introduces Talent to new clients to commence work​​.</p>
              </div>
            </div>
          </div>
        </div>



        <div className="max-w-6xl mx-auto my-16 grid gap-6 grid-cols-1 sm:grid-cols-2 text-[#363636]">
          <div className="bg-white shadow-lg rounded-lg py-10 px-[80px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/find-talents-bg.svg"}}>
            <h3 className="text-2xl font-bold mb-4">Find Talents</h3>
            <p className="text-lg mb-6">Let us help you meet your talent needs</p>
            <button className="bg-transparent border-secondary border-2 text-secondary py-2 px-4">
              Request Talents
            </button>
          </div>
            

          <div className="bg-white shadow-lg rounded-lg py-10 px-[80px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/find-talents-bg.svg"}}>
            <h3 className="text-2xl font-bold mb-4">Join Talents</h3>
            <p className="text-lg mb-6">
              Join our talent pool for future opportunities</p>
              <button className="bg-transparent border-secondary border-2 text-secondary py-2 px-4">
              Apply
            </button>
          </div>
      </div>










        {/* <div className="relative inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">
          Our range of vetted remote employees cut <br/>across varied business needs and niches.
          </h2>
          <div className="text-[#A5A5A5]">
            <Offerings/>
          </div>
        </div>     */}







    </section>




        {/* testimonial */}
    <section className="relative bg-cover bg-center bg-no-repeat text-[#282828] py-[70px] bg-secondary" style={{ backgroundImage: "url('/abs-orange.svg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#282828]">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Reviews from our Partners
          </h2>
            <div className="w-[80%] md:w-auto md:max-w-6xl mx-auto flex flex-col md:flex-row items-center">
              <TestimonialSlider/>
            </div>
              
            
        </div>      
    </section>



    <section>
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
