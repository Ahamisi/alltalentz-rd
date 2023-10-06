import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavigationBootcamp = ({addBootcamp = false}) => {
    const pathname = usePathname();

   return <>
     <li className={pathname === '/' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/about' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/about">About</Link>
          </li>
        
          <li className={pathname === '/our-watchlist' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/our-watchlist">Join Talent</Link>
          </li>
         
          <li className={pathname === '/news' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="https://alltalentz.substack.com/archive" target="_blank">Insights</Link>
          </li>
         
          <li className={pathname === '/academy' ? 'text-secondary hover:text-[#FEF5E9]' : 'text-black hover:text-secondary lg:text-[#FEF5E9]'}>
            <Link href="/academy">Academy</Link>
          </li>
          
         
          {/* Add More Dropdown Here */}
   </>
};

export default NavigationBootcamp;
