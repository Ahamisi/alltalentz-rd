// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Services | AllTalentz',
  description: 'AllTalentz delivers expert, vetted talent solutions tailored to the unique demands of Technology, Healthcare, Finance, and Remediation. Scale your operations with our trained professionals.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="canonical" href="https://alltalentz.com/healthcare-talents" />
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
