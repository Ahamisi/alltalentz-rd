"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

type IndustryLink = {
  label: string;
  href: string;
  icon: string;
};

const industries: IndustryLink[] = [
  { label: "Tech", href: "/hire/tech", icon: "/v26-images/dropdown-svgs/tech.svg" },
  {
    label: "Healthcare",
    href: "/hire/healthcare",
    icon: "/v26-images/dropdown-svgs/healthcare.svg",
  },
  {
    label: "Finance",
    href: "/hire/finance",
    icon: "/v26-images/dropdown-svgs/finance.svg",
  },
  {
    label: "Construction",
    href: "/hire/construction",
    icon: "/v26-images/dropdown-svgs/construction.svg",
  },
  { label: "Legal", href: "/hire/legal", icon: "/v26-images/dropdown-svgs/legal.svg" },
  {
    label: "Pest Control",
    href: "/hire/pest-control",
    icon: "/v26-images/dropdown-svgs/pest-control.svg",
  },
];

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Our Global Talentz", href: "/global-talentz" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "Blogs", href: "/blog" },
  { label: "FAQs", href: "/faq" },
];

const simpleLinks = [
  { label: "Home", href: "/" },
  { label: "Our Solutions", href: "/solutions" },
  { label: "Agency", href: "/agency" },
];

/** Shared typography for top-level nav links and dropdown triggers. */
const navItemClass =
  "text-[16px] leading-[30px] tracking-[-0.06em] font-normal text-[#121212]";

/* -------------------------------------------------------------------------- */
/*                              Shared sub-parts                              */
/* -------------------------------------------------------------------------- */

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)} aria-label="All Talentz home">
      <Image
        src="/logo.svg"
        alt="All Talentz"
        width={160}
        height={42}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

function IndustryGrid({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="grid grid-cols-1 gap-3 rounded-[16px] border-[2px] border-[#B6B6B6] bg-[#E7E7E7] p-4 sm:grid-cols-2 sm:divide-x sm:divide-[#B6B6B6]">
      {[industries.slice(0, 3), industries.slice(3)].map((column, colIndex) => (
        <li key={colIndex} className={cn(colIndex === 1 && "sm:pl-6")}>
          <ul className="flex flex-col gap-3">
            {column.map((industry) => (
              <li key={industry.label}>
                <NavigationMenuLink
                  render={
                    <Link
                      href={industry.href}
                      onClick={onNavigate}
                      className="group inline-flex w-fit items-center gap-1.5 rounded-[8px] bg-white px-[12px] py-[4px] transition-all hover:ring-1 hover:ring-secondary/40"
                    />
                  }
                >
                  <Image
                    src={industry.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="size-8 shrink-0 object-contain group-hover:animate-icon-bounce motion-reduce:group-hover:animate-none"
                  />
                  <span className="text-sm font-normal text-[#121212]">
                    {industry.label}
                  </span>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function LinkList({
  links,
  onNavigate,
}: {
  links: { label: string; href: string }[];
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-3 rounded-[16px] border-[2px] border-[#B6B6B6] bg-[#E7E7E7] p-4">
      {links.map((link) => (
        <li key={link.label}>
          <NavigationMenuLink
            render={
              <Link
                href={link.href}
                onClick={onNavigate}
                className="inline-flex w-fit items-center rounded-[8px] bg-white px-[12px] py-[4px] text-sm font-normal text-[#121212] transition-all hover:ring-1 hover:ring-secondary/40"
              />
            }
          >
            {link.label}
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">
        <Logo />

        {/* Desktop navigation */}
        <NavigationMenu className="hidden lg:flex" align="start">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                render={
                  <Link
                    href="/"
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3 transition-colors hover:bg-muted",
                      navItemClass
                    )}
                  />
                }
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemClass}>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <LinkList links={companyLinks} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemClass}>Hire Talentz</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-140 max-w-[90vw] lg:max-w-[410px] pb-2 pr-2">
                  <IndustryGrid />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                render={
                  <Link
                    href="/solutions"
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3 transition-colors hover:bg-muted",
                      navItemClass
                    )}
                  />
                }
              >
                Our Solutions
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                render={
                  <Link
                    href="/agency"
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3 transition-colors hover:bg-muted",
                      navItemClass
                    )}
                  />
                }
              >
                Agency
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemClass}>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <LinkList links={resourceLinks} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            render={<Link href="/get-talentz" />}
            className="h-11 rounded-none bg-[#F99621] px-[63px] py-[23px] text-base font-semibold text-white hover:bg-[#F99621] hover:text-black"
          >
            Get Talentz
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu" />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-sm">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <MobileNav onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Mobile menu                                 */
/* -------------------------------------------------------------------------- */

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-4 pb-6">
      {simpleLinks.map((link) => (
        <SheetClose
          key={link.label}
          render={
            <Link
              href={link.href}
              onClick={onNavigate}
              className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
            />
          }
        >
          {link.label}
        </SheetClose>
      ))}

      <MobileAccordion title="Company">
        <div className="flex flex-col gap-1 pl-2">
          {companyLinks.map((link) => (
            <SheetClose
              key={link.label}
              render={
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </div>
      </MobileAccordion>

      <MobileAccordion title="Hire Talentz">
        <div className="grid grid-cols-2 gap-2 py-2">
          {industries.map((industry) => (
            <SheetClose
              key={industry.label}
              render={
                <Link
                  href={industry.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 transition-colors hover:bg-muted"
                />
              }
            >
              <Image
                src={industry.icon}
                alt=""
                width={24}
                height={24}
                className="size-5 shrink-0 object-contain"
              />
              <span className="text-sm font-medium">{industry.label}</span>
            </SheetClose>
          ))}
        </div>
      </MobileAccordion>

      <MobileAccordion title="Resources">
        <div className="flex flex-col gap-1 pl-2">
          {resourceLinks.map((link) => (
            <SheetClose
              key={link.label}
              render={
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </div>
      </MobileAccordion>

      <SheetClose
        render={
          <Button
            render={<Link href="/get-talentz" onClick={onNavigate} />}
            className="mt-4 h-12 w-full rounded-lg bg-secondary text-base font-semibold text-black hover:bg-secondary/90"
          />
        }
      >
        Get Talentz
      </SheetClose>
    </nav>
  );
}

function MobileAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
      >
        {title}
        <ChevronDownIcon
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}
