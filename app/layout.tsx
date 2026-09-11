import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://annercreatives.co.ke"),
  title: { default: "Anner Creatives | Handmade Bags & Crochet", template: "%s | Anner Creatives" },
  description: "Shop thoughtfully handmade bags and crochet pieces from Anner Creatives in Kenya.",
  keywords: ["handmade bags Kenya", "crochet bags", "Anner Creatives", "handmade gifts"],
  alternates: { canonical: "/" },
  icons: { icon: "/anner-logo.jpg", shortcut: "/anner-logo.jpg" },
  openGraph: { title: "Anner Creatives | Handmade Bags & Crochet", description: "Crafted with passion, designed with creativity. Shop handmade bags and crochet pieces in Kenya.", url: "/", siteName: "Anner Creatives", images: [{ url: "/og.png", width: 1536, height: 804, alt: "Anner Creatives handmade bags and crochet pieces" }], locale: "en_KE", type: "website" },
  twitter: { card: "summary_large_image", title: "Anner Creatives | Handmade Bags & Crochet", description: "Shop handmade bags and crochet pieces crafted in Kenya.", images: ["/og.png"] },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body className="antialiased">{children}</body></html> }
