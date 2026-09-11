import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Heart, Palette, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "About", description: "Meet the maker behind Anner Creatives and discover how every handmade piece is created." };

export default function AboutPage() {
  return <main className="min-h-screen bg-[#fbfdff] text-[#17233b]"><SiteHeader/>
    <section className="mx-auto grid max-w-[1300px] gap-8 px-4 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:items-center lg:px-12">
      <div><p className="eyebrow">Meet the maker</p><h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-6xl">Creativity made useful, beautiful and personal.</h1><p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Anner Creatives is a Kenyan handmade studio turning imagination, yarn and thoughtfully chosen materials into bags, crochet pieces and joyful everyday essentials.</p><p className="mt-4 max-w-xl leading-7 text-slate-600">Every item is made with close attention to colour, texture and the little details that make a piece feel special. Small batches allow each creation to retain the warmth and individuality of work made by human hands.</p><a href="/#collection" className="mt-7 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white">Shop the collection <ArrowRight className="size-4"/></a></div>
      <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#ebe7fb] sm:min-h-[520px]"><Image src="/anner-logo.jpg" alt="Anner Creatives logo and craft motifs" fill priority className="object-contain p-8 mix-blend-multiply sm:p-14"/></div>
    </section>
    <section className="mx-auto max-w-[1300px] px-4 pb-16 sm:px-8 lg:px-12"><div className="grid gap-4 sm:grid-cols-3">{[[Heart,"Crafted with passion","Care lives in every stitch, seam and finish."],[Palette,"Designed with creativity","Playful colours and original ideas shape every piece."],[Sparkles,"Made in small batches","Thoughtful production keeps each creation distinctive."]].map(([Icon,title,copy])=><article key={String(title)} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"><Icon className="size-6 text-violet-600"/><h2 className="mt-4 font-serif text-xl font-bold">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{String(copy)}</p></article>)}</div></section>
  </main>;
}
