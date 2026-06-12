/** @type {import('next').NextConfig} */

const cspHeader = [
  "default-src 'self'",
  // 'unsafe-inline' required for Next.js hydration scripts and inline JSON-LD; 'unsafe-eval' required by Tawk.to
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://snap.licdn.com https://embed.tawk.to https://va.tawk.to https://static.tawk.to",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://snap.licdn.com https://www.linkedin.com https://px.ads.linkedin.com https://va.tawk.to https://embed.tawk.to wss://ws.tawk.to",
  "frame-src 'self' https://embed.tawk.to",
  "media-src 'self'",
  "worker-src blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.alltalentz.com" }],
        destination: "https://alltalentz.com/:path*",
        permanent: true,
      },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/why-africa", destination: "/why-african-talents", permanent: true },
      { source: "/services", destination: "/hiring-services", permanent: true },
      { source: "/tech-talents", destination: "/hire-tech-talents", permanent: true },
      { source: "/finance-talents", destination: "/hire-finance-talents", permanent: true },
      { source: "/healthcare-talents", destination: "/hire-healthcare-talents", permanent: true },
      { source: "/legal-talents", destination: "/hire-legal-talents", permanent: true },
      { source: "/remediation-talents", destination: "/hire-remediation-talents", permanent: true },
      {
        source: "/outsourcing",
        destination: "/outsource-with-agency",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
