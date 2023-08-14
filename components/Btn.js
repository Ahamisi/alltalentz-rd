"use client"
import Link from "next/link"

const Btn = ({action, text, border=false, link=false,target, otherCSS}) => {
  return (
   <>
   {
    link ? 
    <Link href={link} target={target} className={`${border ? 'bg-transparent text-secondary border-2 border-secondary inset-0 hover:bg-secondary hover:text-black trasnition duration-200' : 'bg-secondary text-black'} mb-0 text-1xl px-[30px] md:px-[30px] py-[8px] md:py-[15px] text-[20px] ${otherCSS} `}>
        {text}
    </Link>
   : 
   <button onClick={action} className={`${border ? 'bg-transparent text-secondary border-2 border-secondary inset-0 hover:bg-secondary hover:text-black trasnition duration-200' : 'bg-secondary text-black'} mb-0 text-1xl px-[30px] md:px-[30px] py-[8px] md:py-[15px] text-[20px] ${otherCSS} `}>
   {text}
</button> 

   }
    
   </>
  )
}

export default Btn
