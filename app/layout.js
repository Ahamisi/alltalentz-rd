import './globals.css'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
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

      {/* Analytics Scripts - Load only once site-wide */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-L3HFMLR4MD"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L3HFMLR4MD');
        `}
      </Script>
      
      {/* LinkedIn Insight Tag - Load only once, prevent duplicate loads */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          if (!window._linkedin_loaded) {
            window._linkedin_loaded = true;
            _linkedin_partner_id = "4798922";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            if (window._linkedin_data_partner_ids.indexOf(_linkedin_partner_id) === -1) {
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            }
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          }
        `}
      </Script>
      
      {/* Tawk.to Chat - Load only once, prevent duplicate loads */}
      <Script id="tawk-chat" strategy="lazyOnload">
        {`
          if (!window._tawk_loaded) {
            window._tawk_loaded = true;
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65ca47298d261e1b5f5f1919/1hmf2buph';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          }
        `}
      </Script>
    </body>
    
  </html>
  )
}
