'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({ addBootcamp = false, theme = 'dark' }) => {
  const pathname = usePathname();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showTalentDropdown, setShowTalentDropdown] = useState(false);

  // Close dropdowns when pathname changes (navigation occurred)
  useEffect(() => {
    setShowAboutDropdown(false);
    setShowTalentDropdown(false);
  }, [pathname]);

  const aboutPaths = ['/about', '/success-stories', '/why-africa'];
  const talentPaths = ['/bootcamp', '/our-watchlist', '/talent-pool'];
  const isAboutActive = aboutPaths.includes(pathname);
  const isTalentActive = talentPaths.includes(pathname);

  const getLinkClassName = (path) => {
    if (theme === 'light') {
      return path === pathname 
        ? 'text-secondary' 
        : 'text-black hover:text-secondary lg:text-[#282828]';
    } else {
      return path === pathname 
        ? 'text-secondary hover:text-secondary' 
        : 'text-black hover:text-secondary lg:text-[#FEF5E9]';
    }
  };

  const getDropdownItemClassName = (path) => {
    return `block px-4 py-2 text-sm ${
      pathname === path 
        ? 'text-secondary bg-gray-50' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  return (
    <>
      {/* About Dropdown */}
      <li className="relative">
        <div
          className="relative"
          onMouseEnter={() => setShowAboutDropdown(true)}
          onMouseLeave={() => setShowAboutDropdown(false)}
        >
          <button 
            className={`flex items-center gap-1 ${isAboutActive ? 'text-secondary' : getLinkClassName('/about')}`}
          >
            About
            <svg 
              className={`w-4 h-4 mt-1 transition-transform ${showAboutDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showAboutDropdown && (
            <div className="absolute left-0 top-full pt-2 w-48 z-50">
              <div className="bg-white rounded-md shadow-lg py-1">
                <Link 
                  href="/about" 
                  className={getDropdownItemClassName('/about')}
                >
                  About Us
                </Link>
                <Link 
                  href="/success-stories" 
                  className={getDropdownItemClassName('/success-stories')}
                >
                  Success Stories
                </Link>
                <Link 
                  href="/why-africa" 
                  className={getDropdownItemClassName('/why-africa-talentz')}
                >
                  Why Africa Talents
                </Link>
              </div>
            </div>
          )}
        </div>
      </li>

      <li className={getLinkClassName('/pricing-model')}>
        <Link href="/pricing-model">Services</Link>
      </li>
      
      <li className={getLinkClassName('/outsourcing')}>
        <Link href="/outsourcing">Agency</Link>
      </li>
      
      <li className={getLinkClassName('/news')}>
        <Link href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer">
          Blog
        </Link>
      </li>

      <li className={getLinkClassName('https://alltalentzacademy.com')}>
        <Link href="https://alltalentzacademy.com" rel="noopener noreferrer">
          Academy
        </Link>
      </li>
      
      <li className={getLinkClassName('/contact-us')}>
        <Link href="/contact-us">Contact</Link>
      </li>

      {theme !== 'light' && (
        <>
          <li className={getLinkClassName('/faq')}>
            <Link href="/faq">FAQs</Link>
          </li>
          
          {addBootcamp && (
            <li className="relative">
              <div
                className="relative"
                onMouseEnter={() => setShowTalentDropdown(true)}
                onMouseLeave={() => setShowTalentDropdown(false)}
              >
                <button 
                  className={`flex items-center gap-1 ${isTalentActive ? 'text-secondary' : getLinkClassName('/bootcamp')}`}
                >
                  Join Talent Pool
                  <svg 
                    className={`w-4 h-4 mt-1 transition-transform ${showTalentDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showTalentDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-48 z-50">
                    <div className="bg-white rounded-md shadow-lg py-1">
                      <Link 
                        href="/bootcamp" 
                        className={getDropdownItemClassName('/bootcamp')}
                      >
                        Join our PDP
                      </Link>
                      <Link 
                        href="/our-watchlist" 
                        className={getDropdownItemClassName('/our-watchlist')}
                      >
                        Join Watchlist
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )}
        </>
      )}
    </>
  );
};

export default Navigation;
