"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import MobileMenu from "./MobileMenu";
import AllTalentzLogo from "./AllTalentzLogo";

interface HeaderHomeProps {
  active?: string;
}

const Header = ({ active = "home" }: HeaderHomeProps) => {
  const route = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="bg-transparent lg:absolute relative z-50 lg:w-[95%] lg:left-1/2 lg:-translate-x-1/2 w-full py-0 mt-5">
        <nav
          className="py-4 flex items-center justify-between bg-transparent px-[10px] md:px-[20px] lg:px-0"
          style={{ zIndex: 10 }}
        >
          {/* Logo */}
          <div className="text-white text-2xl font-bold cursor-pointer items-center">
            <div onClick={() => route.push("/")}>
              <AllTalentzLogo priority />
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center text-white whitespace-nowrap lg:text-base lg:gap-4 xl:text-lg xl:gap-7 font-normal">
            <Navigation />
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

          <Btn
            text="Join our PDP"
            border={true}
            link="/professional-development-programme"
            otherCSS="hidden lg:block whitespace-nowrap lg:!text-base lg:!px-4 lg:!py-2 xl:!text-[20px] xl:!px-[30px] xl:!py-[15px]"
          />

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu}>
              <Navigation addBootcamp={true} isMobile={true} />
            </MobileMenu>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
