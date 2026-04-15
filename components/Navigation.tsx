"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

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
  const aboutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serviceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const talentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdowns when pathname changes (navigation occurred)
  useEffect(() => {
    setShowAboutDropdown(false);
    setShowServiceDropdown(false);
    setShowTalentDropdown(false);
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    if (serviceTimeoutRef.current) clearTimeout(serviceTimeoutRef.current);
    if (talentTimeoutRef.current) clearTimeout(talentTimeoutRef.current);
  }, [pathname]);

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setShowAboutDropdown(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setShowAboutDropdown(false);
    }, 150);
  };

  const handleServiceMouseEnter = () => {
    if (serviceTimeoutRef.current) clearTimeout(serviceTimeoutRef.current);
    setShowServiceDropdown(true);
  };

  const handleServiceMouseLeave = () => {
    serviceTimeoutRef.current = setTimeout(() => {
      setShowServiceDropdown(false);
    }, 150);
  };

  const handleTalentMouseEnter = () => {
    if (talentTimeoutRef.current) clearTimeout(talentTimeoutRef.current);
    setShowTalentDropdown(true);
  };

  const handleTalentMouseLeave = () => {
    talentTimeoutRef.current = setTimeout(() => {
      setShowTalentDropdown(false);
    }, 150);
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
            Company
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showAboutDropdown ? "rotate-180" : ""}`}
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
            <div className="pb-1">
              <Link href="/about-us" className={mobileSubLink("/about-us")}>
                About Us
              </Link>
              <Link
                href="/why-african-talents"
                className={mobileSubLink("/why-african-talents")}
              >
                Why African Talent
              </Link>
              <Link
                href="/success-stories"
                className={mobileSubLink("/success-stories")}
              >
                Success Stories
              </Link>
              <Link
                href="/contact-us"
                className={mobileSubLink("/contact-us")}
              >
                Contact Us
              </Link>
              <Link href="/faq" className={mobileSubLink("/faq")}>
                FAQs
              </Link>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showServiceDropdown && (
            <div className="pb-1">
              <Link
                href="/hiring-services"
                className={mobileSubLink("/hiring-services")}
              >
                Hiring Services
              </Link>
              <Link
                href="/hire-tech-talents"
                className={mobileSubLink("/hire-tech-talents")}
              >
                Hire Tech Talents
              </Link>
              <Link
                href="/hire-healthcare-talents"
                className={mobileSubLink("/hire-healthcare-talents")}
              >
                Hire Healthcare Talents
              </Link>
              <Link
                href="/hire-finance-talents"
                className={mobileSubLink("/hire-finance-talents")}
              >
                Hire Finance Talents
              </Link>
              <Link
                href="/hire-remediation-talents"
                className={mobileSubLink("/hire-remediation-talents")}
              >
                Hire Remediation Talents
              </Link>
              <Link
                href="/hire-legal-talents"
                className={mobileSubLink("/hire-legal-talents")}
              >
                Hire Legal Talents
              </Link>
            </div>
          )}
        </div>

        <div className="border-b border-gray-100">
          <Link href="/outsource-with-agency" className={mobileLink}>
            Agency
          </Link>
        </div>
        <div className="border-b border-gray-100">
          <Link href="/pricing-model" className={mobileLink}>
            Pricing Model
          </Link>
        </div>
        <div className="border-b border-gray-100">
          <a href="https://alltalentzacademy.com" className={mobileLink} rel="noopener noreferrer">
            Academy
          </a>
        </div>
        <div className="border-b border-gray-100">
          <a
            href="https://blog.alltalentz.com"
            className={mobileLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showTalentDropdown && (
              <div className="pb-1">
                <Link
                  href="/professional-development-programme"
                  className={mobileSubLink("/contact-us")}
                >
                  Join our PDP
                </Link>
                <Link
                  href="/our-watchlist"
                  className={mobileSubLink("/our-watchlist")}
                >
                  Join Watchlist
                </Link>
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
            Company
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
                <Link
                  href="/about-us"
                  className={getDropdownItemClassName("/about-us")}
                >
                  About Us
                </Link>
                <Link
                  href="/why-african-talents"
                  className={getDropdownItemClassName("/why-african-talents")}
                >
                  Why African Talent
                </Link>
                <Link
                  href="/success-stories"
                  className={getDropdownItemClassName("/success-stories")}
                >
                  Success Stories
                </Link>
                <Link
                  href="/contact-us"
                  className={getDropdownItemClassName("/contact-us")}
                >
                  Contact Us
                </Link>
                <Link
                  href="/faq"
                  className={getDropdownItemClassName("/faq")}
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
                {/* <Link
                  href="/pricing-model"
                  className={getDropdownItemClassName("/pricing-model")}
                >
                  Our Solutions
                </Link> */}
                <Link
                  href="/hiring-services"
                  className={getDropdownItemClassName("/hiring-services")}
                >
                  Hiring services
                </Link>
                <Link
                  href="/hire-tech-talents"
                  className={getDropdownItemClassName("/hire-tech-talents")}
                >
                  Hire Tech Talents
                </Link>
                <Link
                  href="/hire-healthcare-talents"
                  className={getDropdownItemClassName("/hire-healthcare-talents")}
                >
                  Hire Healthcare Talents
                </Link>
                <Link
                  href="/hire-finance-talents"
                  className={getDropdownItemClassName("/hire-finance-talents")}
                >
                  Hire Finance Talents
                </Link>
                <Link
                  href="/hire-remediation-talents"
                  className={getDropdownItemClassName("/hire-remediation-talents")}
                >
                  Hire Remediation Talents
                </Link>
                <Link
                  href="/hire-legal-talents"
                  className={getDropdownItemClassName("/hire-legal-talents")}
                >
                  Hire Legal Talents
                </Link>
              </div>
            </div>
          )}
        </div>
      </li>

      <li className={getLinkClassName("/outsource-with-agency")}>
        <Link href="/outsource-with-agency">
          Agency
        </Link>
      </li>

      <li className={getLinkClassName("/pricing-model")}>
        <Link href="/pricing-model">
          Pricing Model
        </Link>
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
                      <Link
                        href="/professional-development-programme"
                        className={getDropdownItemClassName("/professional-development-programme")}
                      >
                        Join our PDP
                      </Link>
                      <Link
                        href="/our-watchlist"
                        className={getDropdownItemClassName("/our-watchlist")}
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
