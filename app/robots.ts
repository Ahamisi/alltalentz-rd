export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/bootcamp-old/", "/services copy/", "/redesign/", "/cbt/", "/professional-development-programme/test/"],
    },
    sitemap: "https://alltalentz.com/sitemap.xml",
  };
}
