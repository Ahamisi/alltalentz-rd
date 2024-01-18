import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const [isServicesOpen, setServicesOpen] = useState(false);

  const toggleServices = () => {
    setServicesOpen(!isServicesOpen);
  };

  return (
    <>
      <li
        className={
          pathname === '/'
            ? 'text-secondary hover:text-[#FEF5E9]'
            : 'text-black hover:text-secondary lg:text-[#FEF5E9]'
        }
      >
        <Link href="/">Home</Link>
      </li>
      <li
        className={
          pathname === '/about'
            ? 'text-secondary hover:text-[#FEF5E9]'
            : 'text-black hover:text-secondary lg:text-[#FEF5E9]'
        }
      >
        <Link href="/about">About</Link>
      </li>
      <li
        className="relative group"
        onMouseEnter={toggleServices}
        onMouseLeave={toggleServices}
      >
        <span
          className={
            (pathname === '/request-talent' || pathname === '/our-watchlist') &&
            'text-secondary hover:text-[#FEF5E9] group-hover:text-[#FEF5E9]'
          }
        >
          Services{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 inline-block text-[#FEF5E9] transform transition-transform ${
              isServicesOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 5.293a1 1 0 011.414 0L10 10.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <ul
          className={`absolute mt-2 space-y-2 bg-black text-white border rounded-lg shadow-lg border-none w-[200px] ${
            isServicesOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link href="/request-talent">
              <div className="block px-4 py-2 hover:bg-[#F99621] hover:text-black transition-colors">
                Find Talent
              </div>
            </Link>
          </li>
          <li>
            <Link href="/our-watchlist">
              <div className="block px-4 py-2 hover:bg-[#F99621] hover:text-black transition-colors">
                Join Talent
              </div>
            </Link>
          </li>
        </ul>
      </li>
      <li
        className={
          pathname === '/news'
            ? 'text-secondary hover:text-[#FEF5E9]'
            : 'text-black hover:text-secondary lg:text-[#FEF5E9]'
        }
      >
        <Link href="https://blog.alltalentz.com" target="_blank">
          Blog
        </Link>
      </li>
      <li
        className={
          pathname === '/faq'
            ? 'text-secondary hover:text-[#FEF5E9]'
            : 'text-black hover:text-secondary lg:text-[#FEF5E9]'
        }
      >
        <Link href="/faq">FAQs</Link>
      </li>
      <li
        className={
          pathname === 'https://alltalentzacademy.com'
            ? 'text-secondary hover:text-[#FEF5E9]'
            : 'text-black hover:text-secondary lg:text-[#FEF5E9]'
        }
      >
        <Link href="https://alltalentzacademy.com">Academy</Link>
      </li>
    </>
  );
};

export default Navigation;
