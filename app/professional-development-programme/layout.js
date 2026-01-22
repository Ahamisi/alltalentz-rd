// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Professional Development Programme',
  description: 'Join Our Professional Development Programme - All Talentz Training',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="canonical" href="https://alltalentz.com/professional-development-programme" />
          <meta
            property="og:image"
            content="/alltalentz-homebg.jpg"
          />
          <meta name="google-site-verification" content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo" />
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
