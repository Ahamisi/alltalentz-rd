// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: "Why Africa Talents",
  description: "Your Gateway to Africa's Leading Remote Professionals | Superior Workforce Value",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="canonical" href="https://alltalentz.com/why-africa" />
          <meta
            property="og:image"
            content="/alltalentz-homebg.jpg"
          />
          <meta name="google-site-verification" content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo" />
          <meta name="description" content="Learn more about Alltalentz and what we do | Your Gateway to Africa's Leading Remote Professionals | Superior Workforce Value" />
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
