import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navigation = ({addBootcamp = false, theme = 'dark' }) => {
    const pathname = usePathname();

    const getLinkClassName = (path) => {
      if (theme === 'light') {
        return path === pathname ? 'text-secondary' : 'text-black hover:text-secondary lg:text-[#282828]';
      } else {
        return path === pathname ? 'text-secondary hover:text-secondary' : 'text-black hover:text-secondary lg:text-[#FEF5E9]';
      }
    };
    
    return (
      <>
  
        <li className={getLinkClassName('/about')}>
          <Link href="/about">About</Link>
        </li>
        <li className={getLinkClassName('/request-talent')}>
          <Link href="/request-talent">Services</Link>
        </li>
        <li className={getLinkClassName('/outsourcing')}>
          <Link href="/outsourcing">Agency</Link>
        </li>
        <li className={getLinkClassName('/news')}>
          <Link href="https://blog.alltalentz.com" target="_blank">Blog</Link>
        </li>

        <li className={getLinkClassName('https://alltalentzacademy.com')}>
          <Link href="https://alltalentzacademy.com">Academy</Link>
        </li>

        {
          theme !== 'light' && 

          <>
          
          <li className={getLinkClassName('/faq')}>
          <Link href="/faq">FAQs</Link>
        </li>
        {addBootcamp && 
          <li className={`${getLinkClassName('/bootcamp')} cursor-pointer`}>
            <Link href="/bootcamp" className="cursor-pointer">Join Bootcamp</Link>
          </li>
        }
          
          </>
        }
        
      </>
    );
    
};

export default Navigation;
