"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import MobileMenu from "./MobileMenu";
import NavigationBootcamp from "./NavigationBootcamp";
import AllTalentzLogo from "./AllTalentzLogo";

interface HeaderProps {
  active?: string;
  type?: string;
  theme?: string;
}

const Header = ({ active = "home", type = "", theme = "dark" }: HeaderProps) => {
  const route = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header
      className={`${type == "bootcamp" ? "lg:w-[79%] px-4 md:px-0" : "lg:w-[95%]"} md:mx-auto`}
    >
      <nav
        className={`py-4 px-2 flex items-center ${type == "bootcamp" ? "justify-between lg:justify-normal" : "justify-between"}  bg-transparent md:px-[20px]`}
        style={{ zIndex: 10 }}
      >
        {/* Logo */}
        <div className="text-white text-2xl font-bold cursor-pointer items-center">
          <div onClick={() => route.push("/")}>
            <AllTalentzLogo />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex items-center text-white ${type == "bootcamp" ? "text-lg gap-[54px] lg:ml-[20%]" : "whitespace-nowrap lg:text-base lg:gap-4 xl:text-lg xl:gap-7"}   font-normal`}
        >
          {type == "bootcamp" ? <NavigationBootcamp /> : <Navigation theme={theme} />}
        </ul>
        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center">
          <button
            className={`${theme == "light" ? "text-black text-lg" : "text-white text-lg"}`}
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

        {/* Join Talent Pool (commented out — replaced with Hire Talent)
        {type !== "bootcamp" && (
          <Btn
            text="Join Talent Pool"
            border={true}
            link="/professional-development-programme"
            otherCSS="hidden lg:block"
          />
        )}
        */}
        {type !== "bootcamp" && (
          <Btn
            text="Join our PDP"
            border={true}
            link="/professional-development-programme"
            otherCSS="hidden lg:block whitespace-nowrap lg:!text-base lg:!px-4 lg:!py-2 xl:!text-[20px] xl:!px-[30px] xl:!py-[15px]"
          />
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu}>
            {type == "bootcamp" ? (
              <ul className="space-y-2 text-primary text-lg">
                <NavigationBootcamp />
              </ul>
            ) : (
              <Navigation addBootcamp={true} isMobile={true} />
            )}
          </MobileMenu>
        )}
      </nav>
    </header>
  );
};

export default Header;
