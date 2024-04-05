import './globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'AllTalentz',
  description: 'Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <meta
          property="og:image"
          content="/alltalentz-homebg.jpg"
        />
      
    <body className={montserrat.className}>
      <SocialMedia/>

      <main className=''>
        {/* <Header/> */}
        {children}
      </main>
    </body>
    
  </html>
  )
}
