'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Navbar links must force a full page load so Next.js does NOT intercept the click.
// Next.js App Router intercepts same-origin <a> clicks for client-side nav → RSC fetch storm on Netlify.
// Hero "Find Talent" works because it's a plain <a> that sometimes isn't in the intercepted tree.
// We use preventDefault + window.location.href so the router never sees the click → one request.
const Navigation = ({ addBootcamp = false, theme = 'dark' }) => {
  const pathname = usePathname();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showTalentDropdown, setShowTalentDropdown] = useState(false);
  const [aboutTimeout, setAboutTimeout] = useState(null);
  const [serviceTimeout, setServiceTimeout] = useState(null);
  const [talentTimeout, setTalentTimeout] = useState(null);

  // Force full page load for same-origin links so Next.js router never intercepts (no RSC storm).
  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || href.startsWith('http') || e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    window.location.href = href;
  };

  // Close dropdowns when pathname changes (navigation occurred)
  useEffect(() => {
    setShowAboutDropdown(false);
    setShowServiceDropdown(false);
    setShowTalentDropdown(false);
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
                <a href="/about" className={getDropdownItemClassName('/about')} onClick={handleNavClick}>About Us</a>
                <a href="/success-stories" className={getDropdownItemClassName('/success-stories')} onClick={handleNavClick}>Success Stories</a>
                <a href="/why-africa" className={getDropdownItemClassName('/why-africa')} onClick={handleNavClick}>Why Africa Talents</a>
                <a href="/contact-us" className={getDropdownItemClassName('/contact-us')} onClick={handleNavClick}>Contact</a>
                <a href="/faq" className={getDropdownItemClassName('/faq')} onClick={handleNavClick}>FAQs</a>
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
                <a href="/pricing-model" className={getDropdownItemClassName('/pricing-model')} onClick={handleNavClick}>Our Solutions</a>
                <a href="/services" className={getDropdownItemClassName('/services')} onClick={handleNavClick}>All Services</a>
                <a href="/tech-talents" className={getDropdownItemClassName('/tech-talents')} onClick={handleNavClick}>Tech Talents</a>
                <a href="/healthcare-talents" className={getDropdownItemClassName('/healthcare-talents')} onClick={handleNavClick}>Healthcare Talents</a>
                <a href="/finance-talents" className={getDropdownItemClassName('/finance-talents')} onClick={handleNavClick}>Finance Talents</a>
                <a href="/remediation-talents" className={getDropdownItemClassName('/remediation-talents')} onClick={handleNavClick}>Remediation Talents</a>
                <a href="/legal-talents" className={getDropdownItemClassName('/legal-talents')} onClick={handleNavClick}>Legal Talents</a>
              </div>
            </div>
          )}
        </div>
      </li>
      
      <li className={getLinkClassName('/outsourcing')}>
        <a href="/outsourcing" onClick={handleNavClick}>Agency</a>
      </li>

      <li className={getLinkClassName('https://alltalentzacademy.com')}>
        <a href="https://alltalentzacademy.com" rel="noopener noreferrer">Academy</a>
      </li>

      <li className={getLinkClassName('/news')}>
        <a href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer">Blog</a>
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
                      <a href="/professional-development-programme" className={getDropdownItemClassName('/professional-development-programme')} onClick={handleNavClick}>Join our PDP</a>
                      <a href="/our-watchlist" className={getDropdownItemClassName('/our-watchlist')} onClick={handleNavClick}>Join Watchlist</a>
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
