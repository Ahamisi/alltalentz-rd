import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navigation = ({addBootcamp = false}) => {
    const pathname = usePathname();

   return <>
     <li className={pathname === '/' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/about' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname === '/request-talent' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/request-talent">Find Talent</Link>
          </li>
          <li className={pathname === '/our-watchlist' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/our-watchlist">Join Talent</Link>
          </li>
         
          <li className={pathname === '/news' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="https://blog.alltalentz.com" target="_blank">Blog</Link>
          </li>
          <li className={pathname === '/faq' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/faq">FAQs</Link>
          </li>
          <li className={pathname === '/academy' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/academy">Academy</Link>
          </li>
          {
            addBootcamp && 
              <li className={pathname === '/bootcamp' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
                <Link href="/bootcamp">Apply to Bootcamp</Link>
              </li>
          }
          {/* <li className={pathname === '/news' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/news">Insights</Link>
          </li> */}
          
         
          {/* Add More Dropdown Here */}
   </>
};

export default Navigation;
