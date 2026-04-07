"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Navbar links must force a full page load so Next.js does NOT intercept the click.
// Next.js App Router intercepts same-origin <a> clicks for client-side nav → RSC fetch storm on Netlify.
// Hero "Find Talent" works because it's a plain <a> that sometimes isn't in the intercepted tree.
// We use preventDefault + window.location.href so the router never sees the click → one request.
interface NavigationProps {
  addBootcamp?: boolean;
  theme?: string;
  isMobile?: boolean;
}

const Navigation = ({ addBootcamp = false, theme = "dark", isMobile = false }: NavigationProps) => {
  const pathname = usePathname();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showTalentDropdown, setShowTalentDropdown] = useState(false);
  const [aboutTimeout, setAboutTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [serviceTimeout, setServiceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [talentTimeout, setTalentTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Force full page load for same-origin links so Next.js router never intercepts (no RSC storm).
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || href.startsWith("http") || e.ctrlKey || e.metaKey || e.button === 1) return;
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

  const aboutPaths = [
    "/about-us",
    "/success-stories",
    "/why-african-talents",
    "/contact-us",
    "/faq",
  ];
  const servicePaths = [
    "/hiring-services",
    "/hire-tech-talents",
    "/hire-healthcare-talents",
    "/hire-finance-talents",
    "/hire-remediation-talents",
    "/hire-legal-talents",
  ];
  const talentPaths = [
    "/bootcamp",
    "/professional-development-programme",
    "/our-watchlist",
    "/talent-pool",
  ];
  const isAboutActive = aboutPaths.includes(pathname);
  const isServiceActive = servicePaths.includes(pathname);
  const isTalentActive = talentPaths.includes(pathname);

  const getLinkClassName = (path: string) => {
    if (theme === "light") {
      return path === pathname
        ? "text-secondary"
        : "text-black hover:text-secondary lg:text-[#282828]";
    } else {
      return path === pathname
        ? "text-secondary hover:text-secondary"
        : "text-black hover:text-secondary lg:text-[#FEF5E9]";
    }
  };

  const getDropdownItemClassName = (path: string) => {
    return `block px-4 py-2 text-sm lg:text-[12px] ${
      pathname === path ? "text-secondary bg-gray-50" : "text-gray-700 hover:bg-gray-100"
    }`;
  };

  // ── Mobile accordion layout ──────────────────────────────────────────────
  if (isMobile) {
    const mobileLink =
      "flex items-center px-5 py-3 text-base text-gray-800 hover:text-[#f99622] hover:bg-orange-50 transition-colors";
    const mobileSubLink = (path: string) =>
      `flex items-center pl-9 pr-5 py-2.5 text-sm transition-colors ${
        pathname === path
          ? "text-[#f99622] bg-orange-50 font-medium"
          : "text-gray-600 hover:text-[#f99622] hover:bg-orange-50"
      }`;
    const mobileSectionBtn = (active: boolean, open: boolean) =>
      `flex items-center justify-between w-full px-5 py-3 text-base font-medium transition-colors ${
        active ? "text-[#f99622]" : "text-gray-800 hover:text-[#f99622]"
      }`;

    return (
      <>
        {/* About accordion */}
        <div className="border-b border-gray-100">
          <button
            className={mobileSectionBtn(isAboutActive, showAboutDropdown)}
            onClick={() => setShowAboutDropdown((p) => !p)}
          >
            About
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showAboutDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showAboutDropdown && (
            <div className="pb-1">
              <a href="/about-us" className={mobileSubLink("/about-us")} onClick={handleNavClick}>About Us</a>
              <a href="/success-stories" className={mobileSubLink("/success-stories")} onClick={handleNavClick}>Success Stories</a>
              <a href="/why-african-talents" className={mobileSubLink("/why-african-talents")} onClick={handleNavClick}>Why Africa Talents</a>
              <a href="/contact-us" className={mobileSubLink("/contact-us")} onClick={handleNavClick}>Contact</a>
              <a href="/faq" className={mobileSubLink("/faq")} onClick={handleNavClick}>FAQs</a>
            </div>
          )}
        </div>

        {/* Hire Talents accordion */}
        <div className="border-b border-gray-100">
          <button
            className={mobileSectionBtn(isServiceActive, showServiceDropdown)}
            onClick={() => setShowServiceDropdown((p) => !p)}
          >
            Hire Talents
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showServiceDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showServiceDropdown && (
            <div className="pb-1">
              <a href="/hiring-services" className={mobileSubLink("/hiring-services")} onClick={handleNavClick}>Hiring Services</a>
              <a href="/hire-tech-talents" className={mobileSubLink("/hire-tech-talents")} onClick={handleNavClick}>Hire Tech Talents</a>
              <a href="/hire-healthcare-talents" className={mobileSubLink("/hire-healthcare-talents")} onClick={handleNavClick}>Hire Healthcare Talents</a>
              <a href="/hire-finance-talents" className={mobileSubLink("/hire-finance-talents")} onClick={handleNavClick}>Hire Finance Talents</a>
              <a href="/hire-remediation-talents" className={mobileSubLink("/hire-remediation-talents")} onClick={handleNavClick}>Hire Remediation Talents</a>
              <a href="/hire-legal-talents" className={mobileSubLink("/hire-legal-talents")} onClick={handleNavClick}>Hire Legal Talents</a>
            </div>
          )}
        </div>

        <div className="border-b border-gray-100">
          <a href="/outsource-with-agency" className={mobileLink} onClick={handleNavClick}>Agency</a>
        </div>
        <div className="border-b border-gray-100">
          <a href="/pricing-model" className={mobileLink} onClick={handleNavClick}>Pricing Model</a>
        </div>
        <div className="border-b border-gray-100">
          <a href="https://alltalentzacademy.com" className={mobileLink} rel="noopener noreferrer">Academy</a>
        </div>
        <div className="border-b border-gray-100">
          <a href="https://blog.alltalentz.com" className={mobileLink} target="_blank" rel="noopener noreferrer">Blog</a>
        </div>

        {addBootcamp && (
          <div className="border-b border-gray-100">
            <button
              className={mobileSectionBtn(isTalentActive, showTalentDropdown)}
              onClick={() => setShowTalentDropdown((p) => !p)}
            >
              Join Talent Pool
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showTalentDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showTalentDropdown && (
              <div className="pb-1">
                <a href="/professional-development-programme" className={mobileSubLink("/contact-us")} onClick={handleNavClick}>Join our PDP</a>
                <a href="/our-watchlist" className={mobileSubLink("/our-watchlist")} onClick={handleNavClick}>Join Watchlist</a>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  // ── Desktop hover-dropdown layout ────────────────────────────────────────
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
            className={`flex items-center gap-1 ${isAboutActive ? "text-secondary" : getLinkClassName("/about-us")}`}
          >
            About
            <svg
              className={`w-4 h-4 mt-1 transition-transform ${showAboutDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showAboutDropdown && (
            <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
              <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                <a
                  href="/about-us"
                  className={getDropdownItemClassName("/about-us")}
                  onClick={handleNavClick}
                >
                  About Us
                </a>
                <a
                  href="/success-stories"
                  className={getDropdownItemClassName("/success-stories")}
                  onClick={handleNavClick}
                >
                  Success Stories
                </a>
                <a
                  href="/why-african-talents"
                  className={getDropdownItemClassName("/why-african-talents")}
                  onClick={handleNavClick}
                >
                  Why Africa Talents
                </a>
                <a
                  href="/contact-us"
                  className={getDropdownItemClassName("/contact-us")}
                  onClick={handleNavClick}
                >
                  Contact
                </a>
                <a
                  href="/faq"
                  className={getDropdownItemClassName("/faq")}
                  onClick={handleNavClick}
                >
                  FAQs
                </a>
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
            className={`flex items-center gap-1 ${isServiceActive ? "text-secondary" : getLinkClassName("/hiring-services")}`}
          >
            Hire Talents
            <svg
              className={`w-4 h-4 mt-1 transition-transform ${showServiceDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showServiceDropdown && (
            <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
              <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                {/* <a
                  href="/pricing-model"
                  className={getDropdownItemClassName("/pricing-model")}
                  onClick={handleNavClick}
                >
                  Our Solutions
                </a> */}
                <a
                  href="/hiring-services"
                  className={getDropdownItemClassName("/hiring-services")}
                  onClick={handleNavClick}
                >
                  Hiring services
                </a>
                <a
                  href="/hire-tech-talents"
                  className={getDropdownItemClassName("/hire-tech-talents")}
                  onClick={handleNavClick}
                >
                  Hire Tech Talents
                </a>
                <a
                  href="/hire-healthcare-talents"
                  className={getDropdownItemClassName("/hire-healthcare-talents")}
                  onClick={handleNavClick}
                >
                  Hire Healthcare Talents
                </a>
                <a
                  href="/hire-finance-talents"
                  className={getDropdownItemClassName("/hire-finance-talents")}
                  onClick={handleNavClick}
                >
                  Hire Finance Talents
                </a>
                <a
                  href="/hire-remediation-talents"
                  className={getDropdownItemClassName("/hire-remediation-talents")}
                  onClick={handleNavClick}
                >
                  Hire Remediation Talents
                </a>
                <a
                  href="/hire-legal-talents"
                  className={getDropdownItemClassName("/hire-legal-talents")}
                  onClick={handleNavClick}
                >
                  Hire Legal Talents
                </a>
              </div>
            </div>
          )}
        </div>
      </li>

      <li className={getLinkClassName("/outsource-with-agency")}>
        <a href="/outsource-with-agency" onClick={handleNavClick}>
          Agency
        </a>
      </li>

      <li className={getLinkClassName("/pricing-model")}>
        <a href="/pricing-model" onClick={handleNavClick}>
          Pricing Model
        </a>
      </li>

      <li className={getLinkClassName("https://alltalentzacademy.com")}>
        <a href="https://alltalentzacademy.com" rel="noopener noreferrer">
          Academy
        </a>
      </li>

      <li className={getLinkClassName("/news")}>
        <a href="https://blog.alltalentz.com" target="_blank" rel="noopener noreferrer">
          Blog
        </a>
      </li>

      {theme !== "light" && (
        <>
          {addBootcamp && (
            <li className="relative">
              <div
                className="relative"
                onMouseEnter={handleTalentMouseEnter}
                onMouseLeave={handleTalentMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 ${isTalentActive ? "text-secondary" : getLinkClassName("/bootcamp")}`}
                >
                  Join Talent Pool
                  <svg
                    className={`w-4 h-4 mt-1 transition-transform ${showTalentDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showTalentDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-48 z-[9999]">
                    <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <a
                        href="/professional-development-programme"
                        className={getDropdownItemClassName("/professional-development-programme")}
                        onClick={handleNavClick}
                      >
                       Join our PDP
                      </a>
                      <a
                        href="/our-watchlist"
                        className={getDropdownItemClassName("/our-watchlist")}
                        onClick={handleNavClick}
                      >
                        Join Watchlist
                      </a>
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
