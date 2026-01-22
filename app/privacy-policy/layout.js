// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Privacy Policy',
  description: 'Find answers to your questions | All Talentz Workforce & Career Privacy Policy.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="canonical" href="https://alltalentz.com/privacy-policy" />
        </head>
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
