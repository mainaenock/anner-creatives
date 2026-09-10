import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"Anner Creatives | Handmade Bags & Crochet", description:"Shop thoughtfully handmade bags and crochet pieces from Anner Creatives.", icons:{icon:"/anner-logo.jpg",shortcut:"/anner-logo.jpg"} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body className="antialiased">{children}</body></html> }
