// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Request Talent',
  description: 'Discover Great Talent Offers and Save on Payroll with All Talentz',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
             <meta
          property="og:image"
          content="/alltalentz-homebg.jpg"
        />
        <meta name="google-site-verification" content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo" />
        <meta name="description" content="Discover Great Talent Offers and Save on Payroll with All Talentz" />

      
      
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
