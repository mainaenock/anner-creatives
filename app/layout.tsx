import type { Metadata } from "next";
import { SiWhatsapp } from "react-icons/si";
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
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body className="antialiased">{children}<a href="https://wa.me/254106819119" target="_blank" rel="noreferrer" aria-label="Chat with Anner Creatives on WhatsApp" className="fixed bottom-5 right-4 z-[70] inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,.25)] transition hover:scale-105 hover:bg-[#20bd5a] sm:bottom-7 sm:right-7 sm:h-14 sm:px-5 sm:text-sm"><SiWhatsapp className="size-5 sm:size-6"/><span>WhatsApp</span></a></body></html> }
