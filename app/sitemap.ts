import { client } from "@/lib/sanity/client";
import { allPostsForSitemapQuery } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function sitemap() {
  const baseUrl = "https://alltalentz.com";

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/hiring-services", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-tech-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-healthcare-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-finance-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-legal-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-remediation-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hire-pest-control-talents", priority: 0.9, changeFrequency: "weekly" },
    { url: "/pricing-model", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outsource-with-agency", priority: 0.8, changeFrequency: "monthly" },
    { url: "/why-african-talents", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about-us", priority: 0.7, changeFrequency: "monthly" },
    { url: "/success-stories", priority: 0.7, changeFrequency: "monthly" },
    { url: "/request-talent", priority: 0.8, changeFrequency: "monthly" },
    { url: "/professional-development-programme", priority: 0.7, changeFrequency: "monthly" },
    { url: "/our-watchlist", priority: 0.6, changeFrequency: "monthly" },
    { url: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
    { url: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { url: "/news", priority: 0.5, changeFrequency: "weekly" },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const posts = await client.fetch<Array<{ slug: string; lastModified: string }>>(
    allPostsForSitemapQuery,
  );

  const staticEntries = pages.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogPostEntries = posts.map(({ slug, lastModified }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(lastModified),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogPostEntries];
}
