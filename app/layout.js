import './globals.css'
import { Montserrat } from 'next/font/google'
import SocialMedia from '@/components/SocialMedia'
import SchemaMarkup, { OrganizationSchema, WebsiteSchema } from '@/components/SchemaMarkup'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata = {
  title: 'Services | AllTalentz',
  description: 'AllTalentz delivers expert, vetted talent solutions tailored to the unique demands of Technology, Healthcare, Finance, and Remediation. Scale your operations with our trained professionals.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
         <link rel="canonical" href="https://alltalentz.com/" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <meta
          property="og:image"
          content="/alltalentz-homebg.jpg"
        />
        <meta name="google-site-verification" content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo" />
        <SchemaMarkup schemas={[OrganizationSchema, WebsiteSchema]} />
       </head>
    <body className={montserrat.className} id="body" style={{overflowY: 'hidden'}}>
      <SocialMedia/>

      <main className=''>
        {/* <Header/> */}
        {children}
      </main>
    </body>
    
  </html>
  )
}
