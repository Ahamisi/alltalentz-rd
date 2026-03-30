/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: false,
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
