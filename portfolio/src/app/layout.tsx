import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });
const origin = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "Sherzod Akhmedov | Middle Flutter & Full-stack Developer", template: "%s | Sherzod Akhmedov" },
  description: "Explore Sherzod Akhmedov’s work in Flutter, full-stack development, AI systems, and interactive games. Based in Tashkent. Open to remote and hybrid opportunities.",
  openGraph: { type: "website", locale: "en_US", siteName: "Sherzod Akhmedov", title: "Ideas into new worlds. Sherzod Akhmedov.", description: "Flutter. Full-stack. AI. Explore the work of a curious engineer." },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#10120f" }, { media: "(prefers-color-scheme: light)", color: "#eff0ea" }] };
const init = `(function(){try{var t=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.dataset.motion=(localStorage.getItem('portfolio-motion')==='calm'||matchMedia('(prefers-reduced-motion:reduce)').matches)?'calm':'full'}catch(e){}})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning className={`${manrope.variable} ${space.variable} ${mono.variable}`}><head><script dangerouslySetInnerHTML={{ __html: init }} /></head><body>{children}</body></html>;
}
