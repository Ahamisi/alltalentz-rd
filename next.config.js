/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
