/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-email/components", "@react-email/render"],
  async redirects() {
    return [
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/news/:path*", destination: "/blog/:path*", permanent: true },
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
