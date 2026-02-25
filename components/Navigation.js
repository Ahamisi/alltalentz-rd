'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({ addBootcamp = false, theme = 'dark' }) => {
  const pathname = usePathname();
  const router = useRouter();
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
  const talentPaths = ['/bootcamp', '/professional-development-programme', '/our-watchlist', '/talent-pool'];
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

  // Programmatic navigation for dropdown items to avoid Netlify prefetch/navigation
  // request storms (thousands of canceled requests). Left-click: single router.push;
  // middle/ctrl/cmd-click: let default behavior open in new tab.
  const handleDropdownNav = (e, href) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    router.push(href);
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
                <Link href="/about" prefetch={false} className={getDropdownItemClassName('/about')} onClick={(e) => handleDropdownNav(e, '/about')}>About Us</Link>
                <Link href="/success-stories" prefetch={false} className={getDropdownItemClassName('/success-stories')} onClick={(e) => handleDropdownNav(e, '/success-stories')}>Success Stories</Link>
                <Link href="/why-africa" prefetch={false} className={getDropdownItemClassName('/why-africa')} onClick={(e) => handleDropdownNav(e, '/why-africa')}>Why Africa Talents</Link>
                <Link href="/contact-us" prefetch={false} className={getDropdownItemClassName('/contact-us')} onClick={(e) => handleDropdownNav(e, '/contact-us')}>Contact</Link>
                <Link href="/faq" prefetch={false} className={getDropdownItemClassName('/faq')} onClick={(e) => handleDropdownNav(e, '/faq')}>FAQs</Link>
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
                <Link href="/pricing-model" prefetch={false} className={getDropdownItemClassName('/pricing-model')} onClick={(e) => handleDropdownNav(e, '/pricing-model')}>Our Solutions</Link>
                <Link href="/services" prefetch={false} className={getDropdownItemClassName('/services')} onClick={(e) => handleDropdownNav(e, '/services')}>All Services</Link>
                <Link href="/tech-talents" prefetch={false} className={getDropdownItemClassName('/tech-talents')} onClick={(e) => handleDropdownNav(e, '/tech-talents')}>Tech Talents</Link>
                <Link href="/healthcare-talents" prefetch={false} className={getDropdownItemClassName('/healthcare-talents')} onClick={(e) => handleDropdownNav(e, '/healthcare-talents')}>Healthcare Talents</Link>
                <Link href="/finance-talents" prefetch={false} className={getDropdownItemClassName('/finance-talents')} onClick={(e) => handleDropdownNav(e, '/finance-talents')}>Finance Talents</Link>
                <Link href="/remediation-talents" prefetch={false} className={getDropdownItemClassName('/remediation-talents')} onClick={(e) => handleDropdownNav(e, '/remediation-talents')}>Remediation Talents</Link>
                <Link href="/legal-talents" prefetch={false} className={getDropdownItemClassName('/legal-talents')} onClick={(e) => handleDropdownNav(e, '/legal-talents')}>Legal Talents</Link>
              </div>
            </div>
          )}
        </div>
      </li>
      
      <li className={getLinkClassName('/outsourcing')}>
        <Link href="/outsourcing" prefetch={false}>Agency</Link>
      </li>

      <li className={getLinkClassName('https://alltalentzacademy.com')}>
        <Link href="https://alltalentzacademy.com" rel="noopener noreferrer" prefetch={false}>
          Academy
        </Link>
      </li>

      <li className={getLinkClassName('/news')}>
        <Link href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer" prefetch={false}>
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
                      <Link href="/professional-development-programme" prefetch={false} className={getDropdownItemClassName('/professional-development-programme')} onClick={(e) => handleDropdownNav(e, '/professional-development-programme')}>Join our PDP</Link>
                      <Link href="/our-watchlist" prefetch={false} className={getDropdownItemClassName('/our-watchlist')} onClick={(e) => handleDropdownNav(e, '/our-watchlist')}>Join Watchlist</Link>
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
