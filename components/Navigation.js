import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navigation = () => {
    const pathname = usePathname();

   return <>
     <li className={pathname === '/' ? 'text-secondary' : 'text-black md:text-[#FEF5E9]'}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/our-watchlist' ? 'text-secondary' : 'text-black md:text-[#FEF5E9]'}>
            <Link href="/our-watchlist">Services</Link>
          </li>
          <li className={pathname === '/about' ? 'text-secondary' : 'text-black md:text-[#FEF5E9]'}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname === '/news' ? 'text-secondary' : 'text-black md:text-[#FEF5E9]'}>
            <Link href="/news">Insights</Link>
          </li>
          <li className={pathname === '/request-talent' ? 'text-secondary' : 'text-black md:text-[#FEF5E9]'}>
            <Link href="/request-talent">Contact</Link>
          </li>
          {/* Add More Dropdown Here */}
   </>
};

export default Navigation;
