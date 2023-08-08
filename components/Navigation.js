import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navigation = () => {
    const pathname = usePathname();

    console.log(pathname,'sljljs')
   return <>
     <li className={pathname === '/' ? 'text-secondary' : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/our-watchlist' ? 'text-secondary' : ''}>
            <Link href="/our-watchlist">Services</Link>
          </li>
          <li className={pathname === '/about' ? 'text-secondary' : ''}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname === '/news' ? 'text-secondary' : ''}>
            <Link href="/news">News</Link>
          </li>
          <li className={pathname === '/request-talent' ? 'text-secondary' : ''}>
            <Link href="/request-talent">Contact</Link>
          </li>
          {/* Add More Dropdown Here */}
   </>
};

export default Navigation;
