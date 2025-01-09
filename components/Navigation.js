import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({addBootcamp = false, theme = 'dark' }) => {
    const pathname = usePathname();
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [showTalentDropdown, setShowTalentDropdown] = useState(false);

    const aboutPaths = ['/about', '/success-stories', '/why-africa'];
    const talentPaths = ['/bootcamp', '/our-watchlist', '/talent-pool'];
    const isAboutActive = aboutPaths.includes(pathname);
    const isTalentActive = talentPaths.includes(pathname);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.about-dropdown')) {
          setShowAboutDropdown(false);
        }
        if (!event.target.closest('.talent-dropdown')) {
          setShowTalentDropdown(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const getLinkClassName = (path) => {
      if (theme === 'light') {
        return path === pathname ? 'text-secondary' : 'text-black hover:text-secondary lg:text-[#282828]';
      } else {
        return path === pathname ? 'text-secondary hover:text-secondary' : 'text-black hover:text-secondary lg:text-[#FEF5E9]';
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
        <li className="relative about-dropdown">
          <button 
            onClick={() => setShowAboutDropdown(!showAboutDropdown)}
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
          
          {/* Dropdown Menu */}
          {showAboutDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
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
          )}
        </li>

        {/* <li className={getLinkClassName('/pricing-model')}>
          <Link href="/pricing-model">Services</Link>
        </li> */}
        <li className={getLinkClassName('/outsourcing')}>
          <Link href="/outsourcing">Agency</Link>
        </li>
        <li className={getLinkClassName('/news')}>
          <Link href="https://blog.alltalentz.com" target="_blank">Blog</Link>
        </li>

        <li className={getLinkClassName('https://alltalentzacademy.com')}>
          <Link href="https://alltalentzacademy.com">Academy</Link>
        </li>
        <li className={getLinkClassName('/contact-us')}>
          <Link href="/contact-us">Contact</Link>
        </li>

        {
          theme !== 'light' && 
          <>
            <li className={getLinkClassName('/faq')}>
              <Link href="/faq">FAQs</Link>
            </li>
            {addBootcamp && 
              <li className="relative talent-dropdown">
                <button 
                  onClick={() => setShowTalentDropdown(!showTalentDropdown)}
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
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      href="/bootcamp" 
                      className={getDropdownItemClassName('/bootcamp')}
                    >
                      Join Bootcamp
                    </Link>
                    <Link 
                      href="/our-watchlist" 
                      className={getDropdownItemClassName('/our-watchlist')}
                    >
                      Join Watchlist
                    </Link>
                  
                  </div>
                )}
              </li>
            }
          </>
        }
      </>
    );
};

export default Navigation;
