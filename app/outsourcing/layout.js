// import './globals.css'
import '../globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Outsourcing',
  description: 'All talentz offers comprehensive outsourcing solutions to improve your business operations.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <meta
          property="og:image"
          content="/alltalentz-homebg.jpg"
        />
        <meta name="google-site-verification" content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo" />
      
      
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
