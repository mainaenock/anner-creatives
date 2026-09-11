import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Contact", description: "Contact Anner Creatives about handmade bags, crochet pieces and custom orders." };

export default function ContactPage() {
  return <main className="min-h-screen bg-[#fbfdff] text-[#17233b]"><SiteHeader/>
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8 sm:py-20"><div className="rounded-[2rem] bg-gradient-to-br from-sky-50 to-violet-100 p-7 sm:p-14"><p className="eyebrow">Contact Anner Creatives</p><h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold sm:text-6xl">Let’s create something lovely.</h1><p className="mt-5 max-w-2xl leading-7 text-slate-600">Questions about a product, delivery or a custom handmade piece? Send us a message and we’ll get back to you.</p><div className="mt-9 grid gap-4 sm:grid-cols-2"><a href="mailto:annercreatives7@gmail.com" className="rounded-2xl bg-white p-5 shadow-sm"><Mail className="size-5 text-sky-600"/><p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Email</p><p className="mt-1 break-all font-bold">annercreatives7@gmail.com</p></a><div className="rounded-2xl bg-white p-5 shadow-sm"><MapPin className="size-5 text-violet-600"/><p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Delivery</p><p className="mt-1 font-bold">Available across Kenya</p></div></div><Link href="/#collection" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17233b] px-6 py-3 text-sm font-bold text-white"><ShoppingBag className="size-4"/> Browse products</Link></div></section>
  </main>;
}
