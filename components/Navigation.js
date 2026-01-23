import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const Navigation = ({addBootcamp = false, theme = 'dark' }) => {
    const pathname = usePathname();
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [showTalentDropdown, setShowTalentDropdown] = useState(false);
    
    // Refs for dropdown containers
    const aboutDropdownRef = useRef(null);
    const talentDropdownRef = useRef(null);
    const aboutButtonRef = useRef(null);
    const talentButtonRef = useRef(null);

    const aboutPaths = ['/about', '/success-stories', '/why-africa'];
    const talentPaths = ['/bootcamp', '/our-watchlist', '/talent-pool'];
    const isAboutActive = aboutPaths.includes(pathname);
    const isTalentActive = talentPaths.includes(pathname);

    // Close dropdowns when clicking outside - using refs instead of document listeners
    useEffect(() => {
      const handleClickOutside = (event) => {
        const target = event.target;
        
        // If clicking on a Next.js Link or any anchor, let it handle navigation naturally
        // Don't interfere with navigation at all
        if (target.closest('a')) {
          // Close dropdowns but don't prevent navigation
          setShowAboutDropdown(false);
          setShowTalentDropdown(false);
          return;
        }
        
        // Check if clicking outside the about dropdown
        if (
          aboutDropdownRef.current &&
          !aboutDropdownRef.current.contains(target) &&
          aboutButtonRef.current &&
          !aboutButtonRef.current.contains(target)
        ) {
          setShowAboutDropdown(false);
        }
        
        // Check if clicking outside the talent dropdown
        if (
          talentDropdownRef.current &&
          !talentDropdownRef.current.contains(target) &&
          talentButtonRef.current &&
          !talentButtonRef.current.contains(target)
        ) {
          setShowTalentDropdown(false);
        }
      };

      // Only attach listener when dropdowns are open
      if (showAboutDropdown || showTalentDropdown) {
        // Use a small timeout to avoid interfering with link clicks
        const timeoutId = setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside);
        }, 0);
        
        return () => {
          clearTimeout(timeoutId);
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [showAboutDropdown, showTalentDropdown]);

    // Close dropdowns when pathname changes (navigation occurred)
    useEffect(() => {
      setShowAboutDropdown(false);
      setShowTalentDropdown(false);
    }, [pathname]);

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
        <li className="relative">
          <button 
            ref={aboutButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowAboutDropdown(!showAboutDropdown);
              setShowTalentDropdown(false);
            }}
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
            <div 
              ref={aboutDropdownRef}
              className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              onClick={(e) => {
                // Close dropdown when a link is clicked
                const link = e.target.closest('a');
                if (link) {
                  setShowAboutDropdown(false);
                }
              }}
            >
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

        <li className={getLinkClassName('/pricing-model')}>
          <Link href="/pricing-model">Services</Link>
        </li>
        <li className={getLinkClassName('/outsourcing')}>
          <Link href="/outsourcing">Agency</Link>
        </li>
        <li className={getLinkClassName('/news')}>
          <Link href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer">Blog</Link>
        </li>

        <li className={getLinkClassName('https://alltalentzacademy.com')}>
          <Link href="https://alltalentzacademy.com" rel="noopener noreferrer">Academy</Link>
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
              <li className="relative">
                <button 
                  ref={talentButtonRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTalentDropdown(!showTalentDropdown);
                    setShowAboutDropdown(false);
                  }}
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
                  <div 
                    ref={talentDropdownRef}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onClick={(e) => {
                      // Close dropdown when a link is clicked
                      const link = e.target.closest('a');
                      if (link) {
                        setShowTalentDropdown(false);
                      }
                    }}
                  >
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
                )}
              </li>
            }
          </>
        }
      </>
    );
};

export default Navigation;
