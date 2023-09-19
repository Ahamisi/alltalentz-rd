import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navigation = () => {
    const pathname = usePathname();

   return <>
     <li className={pathname === '/' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/our-watchlist' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="/our-watchlist">Services</Link>
          </li>
          <li className={pathname === '/about' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname === '/news' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="https://alltalentz.substack.com/archive" target="_blank">Insights</Link>
          </li>
          {/* <li className={pathname === '/news' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="/news">Insights</Link>
          </li> */}
          
          <li className={pathname === '/faq' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary md:text-[#FEF5E9]'}>
            <Link href="/faq">FAQs</Link>
          </li>
          {/* Add More Dropdown Here */}
   </>
};

export default Navigation;
