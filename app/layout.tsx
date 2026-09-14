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
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body className="antialiased">{children}<a href="https://wa.me/254106819119" target="_blank" rel="noreferrer" aria-label="Chat with Anner Creatives on WhatsApp" title="Chat with us on WhatsApp" className="fixed bottom-5 right-4 z-[70] inline-flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,.25)] transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7 sm:size-14"><SiWhatsapp className="size-5 sm:size-6"/></a></body></html> }
