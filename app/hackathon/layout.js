import Script from 'next/script'

export const metadata = {
  title: 'All Talentz Hackathon 2025 | Build Solutions That Matter',
  description: 'Join Nigeria\'s leading tech hackathon. Build innovative solutions across 8 challenge tracks, compete for ₦10M in prizes, and connect with top industry leaders.',
  keywords: 'hackathon, Nigeria tech, innovation challenge, tech hackathon, All Talentz, tech competition',
  openGraph: {
    type: 'website',
    title: 'All Talentz Hackathon 2025 | Build Solutions That Matter',
    description: 'Join Nigeria\'s leading tech hackathon. Build innovative solutions across 8 challenge tracks, compete for ₦10M in prizes, and connect with top industry leaders.',
    images: ['/hackathon/alltalentz.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Talentz Hackathon 2025',
    description: 'Join Nigeria\'s leading tech hackathon. Build solutions that matter, compete for ₦10M in prizes.',
    images: ['/hackathon/alltalentz.svg'],
  },
}

export default function HackathonLayout({ children }) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TCPKB87F');
        `}
      </Script>

      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '426834159682080');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Meta Pixel Noscript */}
      <noscript>
        <img height="1" width="1" style={{display:'none'}}
          src="https://www.facebook.com/tr?id=426834159682080&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCPKB87F"
          height="0" width="0" style={{display:'none', visibility:'hidden'}}></iframe>
      </noscript>

      {children}
    </>
  )
} 