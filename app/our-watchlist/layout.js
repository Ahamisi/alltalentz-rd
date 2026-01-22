// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Our Watchlist',
  description: 'Join All Talentz and begin your remote global career adventure today.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="canonical" href="https://alltalentz.com/our-watchlist" />
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
