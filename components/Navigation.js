'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({ addBootcamp = false, theme = 'dark' }) => {
  const pathname = usePathname();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showTalentDropdown, setShowTalentDropdown] = useState(false);
  const [aboutTimeout, setAboutTimeout] = useState(null);
  const [serviceTimeout, setServiceTimeout] = useState(null);
  const [talentTimeout, setTalentTimeout] = useState(null);

  // Close dropdowns when pathname changes (navigation occurred)
  useEffect(() => {
    setShowAboutDropdown(false);
    setShowServiceDropdown(false);
    setShowTalentDropdown(false);
    // Clear any pending timeouts
    if (aboutTimeout) clearTimeout(aboutTimeout);
    if (serviceTimeout) clearTimeout(serviceTimeout);
    if (talentTimeout) clearTimeout(talentTimeout);
  }, [pathname]);

  const handleAboutMouseEnter = () => {
    if (aboutTimeout) clearTimeout(aboutTimeout);
    setShowAboutDropdown(true);
  };

  const handleAboutMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowAboutDropdown(false);
    }, 150);
    setAboutTimeout(timeout);
  };

  const handleServiceMouseEnter = () => {
    if (serviceTimeout) clearTimeout(serviceTimeout);
    setShowServiceDropdown(true);
  };

  const handleServiceMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowServiceDropdown(false);
    }, 150);
    setServiceTimeout(timeout);
  };

  const handleTalentMouseEnter = () => {
    if (talentTimeout) clearTimeout(talentTimeout);
    setShowTalentDropdown(true);
  };

  const handleTalentMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowTalentDropdown(false);
    }, 150);
    setTalentTimeout(timeout);
  };

  const aboutPaths = ['/about', '/success-stories', '/why-africa', '/contact-us', '/faq'];
  const servicePaths = ['/services', '/tech-talents', '/healthcare-talents', '/finance-talents', '/remediation-talents', '/legal-talents'];
  const talentPaths = ['/bootcamp', '/our-watchlist', '/talent-pool'];
  const isAboutActive = aboutPaths.includes(pathname);
  const isServiceActive = servicePaths.includes(pathname);
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
          onMouseEnter={handleAboutMouseEnter}
          onMouseLeave={handleAboutMouseLeave}
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
            <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
              <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
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
                <Link 
                  href="/contact-us" 
                  className={getDropdownItemClassName('/contact-us')}
                >
                  Contact
                </Link>
                <Link 
                  href="/faq" 
                  className={getDropdownItemClassName('/faq')}
                >
                  FAQs
                </Link>
              </div>
            </div>
          )}
        </div>
      </li>

      {/* Service Dropdown */}
      <li className="relative">
        <div
          className="relative"
          onMouseEnter={handleServiceMouseEnter}
          onMouseLeave={handleServiceMouseLeave}
        >
          <button 
            className={`flex items-center gap-1 ${isServiceActive ? 'text-secondary' : getLinkClassName('/services')}`}
          >
            Services
            <svg 
              className={`w-4 h-4 mt-1 transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showServiceDropdown && (
            <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
              <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                <Link 
                  href="/pricing-model" 
                  className={getDropdownItemClassName('/pricing-model')}
                >
                 Our Solutions
                </Link>
                <Link 
                  href="/services" 
                  className={getDropdownItemClassName('/services')}
                >
                 All Services
                </Link>
                <Link 
                  href="/tech-talents" 
                  className={getDropdownItemClassName('/tech-talents')}
                >
                  Tech Talents
                </Link>
                <Link 
                  href="/healthcare-talents" 
                  className={getDropdownItemClassName('/healthcare-talents')}
                >
                  Healthcare Talents
                </Link>
                <Link 
                  href="/finance-talents" 
                  className={getDropdownItemClassName('/finance-talents')}
                >
                  Finance Talents
                </Link>
                <Link 
                  href="/remediation-talents" 
                  className={getDropdownItemClassName('/remediation-talents')}
                >
                  Remediation Talents
                </Link>
                <Link 
                  href="/legal-talents" 
                  className={getDropdownItemClassName('/legal-talents')}
                >
                  Legal Talents
                </Link>
              </div>
            </div>
          )}
        </div>
      </li>
      
      <li className={getLinkClassName('/outsourcing')}>
        <Link href="/outsourcing">Agency</Link>
      </li>

      <li className={getLinkClassName('https://alltalentzacademy.com')}>
        <Link href="https://alltalentzacademy.com" rel="noopener noreferrer">
          Academy
        </Link>
      </li>

      <li className={getLinkClassName('/news')}>
        <Link href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer">
          Blog
        </Link>
      </li>

      {theme !== 'light' && (
        <>
          
          {addBootcamp && (
            <li className="relative">
              <div
                className="relative"
                onMouseEnter={handleTalentMouseEnter}
                onMouseLeave={handleTalentMouseLeave}
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
                  <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
                    <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
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
