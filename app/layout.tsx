import type { ReactNode } from "react";
import "./globals.css";
import { Geist, Poppins } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import SocialMedia from "@/components/SocialMedia";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import {
  OrganizationSchema,
  WebsiteSchema,
  EmploymentAgencySchema,
  LocalBusinessSchema,
} from "@/components/SchemaMarkup";
import { cn } from "@/lib/utils";
import Footer from "@/components/shared/Footer";
import WelcomeLeadModal from "@/components/shared/WelcomeLeadModal";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  // 200 powers the extra-light display numerals (e.g. the Outsourcing process steps).
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Display script used by the about-page belief quote.
const anydore = localFont({
  src: "./fonts/anydore.otf",
  display: "swap",
  weight: "400",
  style: "normal",
  variable: "--font-anydore",
});

export const metadata = {
  metadataBase: new URL("https://alltalentz.com"),
  title: "Outsource to Africa & Save 75% on Staffing | All Talentz",
  description:
    "All Talentz connects US businesses with vetted remote talent from Africa. 75% cost savings across Tech, Healthcare, Finance, Legal & Construction.",
  alternates: { canonical: "https://alltalentz.com" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Outsource to Africa — Save 75% on Staffing | All Talentz",
    description:
      "All Talentz connects US businesses with vetted remote talent from Africa. 75% cost savings across Tech, Healthcare, Finance, Legal & Construction.",
    url: "https://alltalentz.com",
    images: [
      {
        url: "/twitter/twitter-card.png",
        width: 1200,
        height: 630,
        alt: "All Talentz — Outsource to Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outsource to Africa — Save 75% on Staffing | All Talentz",
    description:
      "All Talentz connects US businesses with vetted remote talent from Africa. 75% cost savings across Tech, Healthcare, Finance, Legal & Construction.",
    images: ["/twitter/twitter-card.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, poppins.variable, anydore.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta
          name="google-site-verification"
          content="lYMDAYOc3Se9uAkUoehfNd6vA7MfyKMJtvNc8gKOAQo"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WebsiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EmploymentAgencySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessSchema) }}
        />
      </head>
      {/* No overflow on <body>: it would scroll-contain the page and disable
          `position: sticky` everywhere. Horizontal bleed is clipped in globals.css. */}
      <body className="font-sans" id="body">
        {/* <SocialMedia /> */}
        <SmoothScroll />

        <main className="">
          {/* <Header/> */}
          <Navbar/>
          {children}
          <Footer/>
        </main>

        {/* Landing lead-capture popup — self-throttling, renders nothing until it opens */}
        <WelcomeLeadModal />

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

        {/* Tawk.to Chat - temporarily disabled (was throwing errors in the console) */}
        {/* <Script id="tawk-chat" strategy="lazyOnload">
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
        </Script> */}
      </body>
    </html>
  );
}
