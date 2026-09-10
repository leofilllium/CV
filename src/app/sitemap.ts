import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
  return ["", "/ru", ...projects.flatMap((p) => [`/work/${p.slug}`, `/ru/work/${p.slug}`])].map(
    (path) => ({
      url: `${origin}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : path === "/ru" ? 0.9 : 0.7,
    }),
  );
}
