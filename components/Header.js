"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Navigation from './Navigation';
import { useRouter } from 'next/navigation';
import Btn from "@/components/Btn";
import MobileMenu from './MobileMenu';



const Header = ({active='home'}) => {
  const route = useRouter()

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen((prevState) => !prevState);
    };


  return (
    // <header className='bg-transparent absolute sm:relative z-50 w-full py-[30px] sm:py-0 md:w-[95%]'>
    // <header className='md:w-[95%] md:ml-auto bg-gradient-to-b from-black to-black'>

    <header className='max-w-7xl md:mx-auto'>

        <nav className="py-4 flex items-center justify-between bg-transparent md:px-[20px] lg:px-0" style={{ zIndex: 10 }} >
      {/* Logo */}
      <div className="text-white text-2xl font-bold cursor-pointer items-center" >
        <div onClick={() => route.push('/')}>
        <svg className="w-[120px] h-[30px] md:w-[150px] md:h-[40px]" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1340_395)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 39.6093L3.99697 37.1121C4.1468 37.0058 4.27837 36.9281 4.43592 36.8087L7.47201 34.5933C7.78427 34.3771 8.03643 34.1873 8.33285 33.969C8.62887 33.7508 8.90417 33.5687 9.19613 33.3472C10.5576 32.3152 12.1819 31.2304 13.5714 30.1903C13.7663 30.0445 14.2922 29.6193 14.4867 29.5672V21.9693H8.34097C7.58083 21.9693 7.71564 21.7005 7.39486 22.5081L0.5 39.6093H0.5ZM7.86426 20.2687H16.2351L17.969 28.8908C18.0632 29.388 18.0709 29.2398 18.3669 29.5016L22.5274 33.0866C22.6326 33.1847 22.6858 33.2584 22.797 33.3476L24.4879 34.7868C24.8537 35.128 25.1907 35.4396 25.5907 35.7528L29.1758 38.8519C29.3272 38.9932 29.9124 39.5157 30.063 39.556C30.0431 39.3153 29.9469 39.1772 29.8706 38.952L29.2761 37.1573C28.9809 36.3677 28.7348 35.5337 28.4668 34.7277C28.2069 33.9454 27.9316 33.1696 27.6588 32.3499L25.2216 25.1238C24.9435 24.2865 24.6681 23.5103 24.4006 22.706L23.599 20.2687C25.2756 20.2687 26.9563 20.2577 28.6329 20.2695C29.445 20.2752 29.5002 20.0015 30.3379 19.4293L34.7696 16.2227C35.2995 15.8301 37.5093 14.325 37.6916 14.0525C36.1693 14.0525 34.7083 13.9996 33.1357 13.9996H0.5536C0.632375 14.2957 1.96018 15.3178 2.31427 15.6343C2.92579 16.1804 3.51214 16.6707 4.14031 17.2034L4.59428 17.5984C4.76848 17.7682 4.86715 17.8411 5.04338 17.9983L5.49654 18.3937C5.60252 18.4837 5.62485 18.4809 5.73286 18.5815L7.32136 19.9636C7.46267 20.0972 7.60601 20.2691 7.86467 20.2691L7.86426 20.2687ZM11.8907 12.2456H20.8443C20.7188 11.7064 18.717 6.14108 18.3341 4.98615L17.5792 2.82085C17.4866 2.54026 17.42 2.34153 17.3169 2.07438L16.8178 0.609131C16.6899 0.703203 16.7139 0.746371 16.6404 0.90886L12.1936 11.4861C12.0929 11.7398 11.9991 12.0196 11.8911 12.2452L11.8907 12.2456Z" fill="#FFB300"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M47.4904 14.1527H47.7519C47.7519 14.9448 47.9566 15.8867 48.0869 16.7024C48.2339 17.6228 48.3793 18.4491 48.5182 19.2864L49.3213 24.3834H45.921C45.9344 23.7705 46.1915 22.4885 46.2942 21.8719L47.1201 16.7977C47.2314 15.9918 47.4904 15.0552 47.4904 14.1527ZM41.082 32.2533C45.4861 32.2533 44.5587 32.8235 45.0058 30.1552C45.1276 29.4291 45.3404 28.3532 45.3976 27.6625H49.8439C49.9905 28.2941 50.0478 28.8362 50.1607 29.5745C50.2658 30.2631 50.3962 30.8907 50.4656 31.4987C50.5964 32.6508 50.8802 32.2533 54.2907 32.2533C53.5512 29.0695 52.5925 23.45 51.9246 20.0675C51.2059 16.4304 50.3617 11.21 49.5828 7.85718H45.6595C45.6595 8.68754 45.2868 10.0392 45.1243 10.8618C44.9217 11.8885 44.7516 12.8699 44.5372 13.9454C44.2343 15.4648 41.0824 31.4221 41.0824 32.2533H41.082Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M90.7796 29.4981V25.1696H94.0491V29.367H93.2646C92.2381 29.367 91.7772 29.4981 90.7796 29.4981ZM87.51 18.3495C87.51 22.2281 86.8051 21.4975 90.3869 21.4975C90.9903 21.4975 90.7791 20.76 90.7791 19.2674H94.0487V22.6777C86.5436 22.6777 87.2481 21.967 87.2481 29.4981C87.2481 31.1352 87.5839 32.4311 89.4574 32.3594C90.9627 32.302 92.7818 31.8336 94.0487 31.7278V32.2523H97.5798V18.7425C97.5798 17.4291 97.0584 16.5125 95.7489 16.5125H89.3405C88.1962 16.5125 87.5096 17.2011 87.5096 18.3487L87.51 18.3495Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M109.742 19.1359H112.881V22.8084H109.742V19.1359ZM106.211 18.4798V30.2845C106.211 31.4346 106.883 32.2519 108.042 32.2519H114.581C116.948 32.2519 116.412 29.7241 116.412 27.0054H112.881V29.4973H109.742V25.3003H115.104C115.425 25.3003 116.412 24.3103 116.412 23.9886V18.3487C116.412 17.2011 115.725 16.5125 114.581 16.5125H108.042C106.883 16.5125 106.211 17.3298 106.211 18.4798Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M122.56 17.0376V16.5131H118.898V32.2525H122.56V19.661L125.83 19.5299V32.2525H129.099C129.401 32.2525 129.492 32.1613 129.492 31.8591V19.2676C129.492 14.5669 125.948 16.9622 122.56 17.038V17.0376Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M74.1699 11.1353H78.0937V32.2523H81.7555V11.1353H85.8096V7.8562H74.1699V11.1353Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M140.476 19.5293H145.184L142.612 24.8193C142.271 25.497 140.084 29.9233 140.084 30.2845V32.2519H149.5V29.235H144.4C144.648 28.1689 149.5 19.2711 149.5 18.4798V16.5125H140.477V19.5293H140.476Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M132.761 16.5129H131.061C131.061 20.2249 130.61 19.6609 132.761 19.6609V30.4161C132.761 31.5637 133.448 32.2523 134.592 32.2523H138.777C138.777 28.4389 139.372 29.1044 136.423 29.1044V19.6604C139.214 19.6604 138.646 20.308 138.646 16.5125H136.423V12.5777C136.423 12.2755 136.332 12.1843 136.03 12.1843H132.761V16.5129Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M62.2695 8.2496V31.8589C62.2695 32.1611 62.3605 32.2523 62.6618 32.2523H65.9314V7.8562H62.6618C62.3605 7.8562 62.2695 7.94742 62.2695 8.2496Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M100.064 32.2523H103.334C103.635 32.2523 103.726 32.1611 103.726 31.8589V8.2496C103.726 7.94742 103.635 7.8562 103.334 7.8562H100.064V32.2523Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M56.123 32.2523H59.6541V7.8562H56.123V32.2523Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_1340_395">
          <rect width="149" height="39" fill="white" transform="translate(0.5 0.609131)"/>
          </clipPath>
          </defs>
          </svg>

        </div>


      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex text-white text-lg lg:gap-7   font-normal">

        {/* <ul className="hidden md:flex text-white text-lg md:gap-7 lg:gap-[35px]  font-normal"> */}
          <Navigation/>
        </ul>
      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-lg"
          onClick={toggleMobileMenu}
          aria-label="Mobile Menu Toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* CTA Button */}
      {/* <Btn text="Meet with us" border={true} link="https://calendly.com/akwaowowillie" target="_blank" otherCSS="hidden lg:block"/> */}
      <Btn text="Apply to Bootcamp" border={true} link="/bootcamp" otherCSS="hidden lg:block"/>

      {/* <Button text='Get Started' onClick="" /> */}
      
 
      
        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu}>
            <ul className="space-y-2 text-primary text-lg">
                <Navigation />
            </ul>
            </MobileMenu>
        )}
        </nav>
    </header>
  )
}

export default Header
