"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const CBT = () => {
  const router = useRouter();

  const totalDuration = 2 * 60 * 1000;
  const redThreshold = 1 * 60 * 1000;

  const [remainingTime, setRemainingTime] = useState(totalDuration);

  const closeTestAndRedirect = () => {
    // Add your code here to close the test if needed
    // For example, you might want to trigger some action to close the test

    // Redirect to the homepage
    router.push("https://alltalentz.com");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);

      if (remainingTime <= 0) {
        clearInterval(timer);
        closeTestAndRedirect();
      }
    }, 1000);

    // Load the external script containing the test
    const script = document.createElement("script");
    script.src = "/scripts/index.js";
    script.async = true;
    document.head.appendChild(script);

    // Clean up the timer and remove the script element when the component unmounts
    return () => {
      clearInterval(timer);
      document.head.removeChild(script);
    };
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / (1000 * 60));
  const seconds = Math.floor((remainingTime / 1000) % 60);

  const isRed = remainingTime <= redThreshold;

  return (
    <>
      {/* <section className="relative bg-cover bg-center bg-no-repeat text-[#4C4C4C] py-[70px] bg-white px-[30px] md:px-0" style={{ backgroundImage: "url('/our-values-bg.svg')" }}>
        <h3>Hey</h3>
      </section> */}
        <div class="bg-[#F99621] text-center py-4 lg:px-4 absolute top-0">
            <div class="p-2 bg-black items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span class="flex rounded-full bg-orange-500 uppercase px-2 py-1 text-xs font-bold mr-3">Important</span>
                <span class="font-semibold mr-2 text-left flex-auto">Hey there test taker, please ensure you click the submit button before the timer runs out. We dont automatically submit for you !</span>
                <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
            </div>
        </div>

      <div
        className={`fixed top-4 right-4 text-white font-bold text-2xl ${
          isRed ? "bg-red-500" : "bg-blue-500"
        } px-4 py-2 rounded-lg`}
      >
        {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
    </>
  );
};

export default CBT;
