"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import instagramIcon from "@iconify-icons/mdi/instagram";
import twitterIcon from "@iconify-icons/mdi/twitter";
import linkedinIcon from "@iconify-icons/mdi/linkedin";
import facebookIcon from "@iconify-icons/mdi/facebook";
import { CERTIFICATIONS } from "@/lib/certifications";

type FooterLink = { label: string; href: string; external?: boolean };

type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Global Talentz", href: "/global-talentz" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Hire Talentz", href: "/request-talent" },
      { label: "Our Solutions", href: "/solutions" },
      { label: "Agency", href: "/agency" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Get Talentz", href: "/get-talentz" },
      { label: "Academy Portal", href: "/academy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/all_talentz", icon: instagramIcon },
  { label: "Twitter", href: "https://twitter.com/AllTalentz", icon: twitterIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/all-talentz/",
    icon: linkedinIcon,
  },
  { label: "Facebook", href: "https://www.facebook.com/Alltalentz", icon: facebookIcon },
];

const certifications = CERTIFICATIONS;

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" aria-label="All Talentz home" className="inline-flex">
            <Image
              src="/all-talents-footer.svg"
              alt="All Talentz"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <p className="text-base tracking-[-6%] italic text-white/90">Restoring Excellence Globally</p>

          <ul className="flex items-center gap-4">
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full bg-[#F99621] text-[#121212] transition-opacity hover:opacity-80"
                >
                  <Icon icon={icon} className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-20 max-w-[884px] mx-auto">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-base leading-[24px] tracking-[0%] font-bold text-[#F99621]">{column.title}</h3>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[24px] items-center py-1 text-[16px] leading-[24px] text-white tracking-[0%] transition-colors hover:text-[#F99621]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-16 flex flex-col gap-8 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-base leading-[30px] tracking-[-6%] text-white">
            &copy; {new Date().getFullYear()} All Talentz Limited
          </p>
          <p className="text-base text-white/90 tracking-[-6%]">All Rights Reserved</p>

          <ul className="flex flex-wrap items-center gap-6">
            {certifications.map((cert) => (
              <li key={cert.alt}>
                <Link href={cert.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={120}
                    height={120}
                    className="h-[72px] w-auto object-contain"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
