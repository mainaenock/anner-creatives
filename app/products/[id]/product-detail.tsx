"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import type { Product } from "@/lib/catalog";
import { discount, money } from "@/lib/catalog";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const gallery = product.images.length ? product.images : [product.image].filter(Boolean);
  const [selected, setSelected] = useState(gallery[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [added, setAdded] = useState(false);

  function addToBasket() {
    const current = JSON.parse(localStorage.getItem("anner-cart") || "[]") as Array<{id:number;quantity:number}>;
    const existing = current.find((item) => item.id === product.id);
    if (existing) existing.quantity += quantity; else current.push({ id: product.id, quantity });
    localStorage.setItem("anner-cart", JSON.stringify(current));
    setAdded(true);
  }

  return <main className="min-h-screen bg-[#fbfdff] text-[#17233b]">
    <SiteHeader showSearch onSearch={()=>setSearchOpen((value)=>!value)}/>
    {searchOpen&&<form action="/" className="sticky top-[76px] z-40 border-b border-sky-100 bg-white px-3 py-2 sm:top-[88px]"><label className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4"><Search className="size-4 text-slate-400"/><input autoFocus name="q" placeholder="Search pieces" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none"/></label></form>}
    <section className="mx-auto max-w-[1300px] px-4 py-6 sm:px-8 sm:py-12 lg:px-12"><Link href="/#collection" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700"><ArrowLeft className="size-4"/> Back to collection</Link>
      <div className="mt-5 grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div><div className="relative aspect-square overflow-hidden rounded-[1.6rem] sm:rounded-[2.2rem]" style={{background:product.color}}>{selected?<Image src={selected} alt={product.name} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 52vw"/>:<div className="flex h-full items-center justify-center"><ShoppingBag className="size-28 text-white/70" strokeWidth={1}/></div>}{discount(product)>0&&<span className="absolute left-4 top-4 rounded-full bg-[#e12b87] px-3 py-1.5 text-xs font-bold text-white">Save {discount(product)}%</span>}</div>{gallery.length>1&&<div className="mt-3 grid grid-cols-5 gap-2">{gallery.map((image)=><button key={image} onClick={()=>setSelected(image)} className={`relative aspect-square overflow-hidden rounded-xl border-2 ${selected===image?"border-sky-600":"border-transparent"}`}><Image src={image} alt="" fill className="object-cover"/></button>)}</div>}</div>
        <div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[.15em] text-sky-600">{product.category}</p><h1 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-5xl">{product.name}</h1><div className="mt-4 flex items-center gap-3"><span className="text-2xl font-bold">{money(product.price)}</span>{product.oldPrice&&<span className="text-base text-slate-400 line-through">{money(product.oldPrice)}</span>}</div><p className="mt-6 text-base leading-7 text-slate-600">{product.description}</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{product.details.map((detail)=><li key={detail} className="flex items-center gap-2 text-sm"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-100"><Check className="size-3.5 text-sky-700"/></span>{detail}</li>)}</ul><div className="mt-8 flex items-center gap-3"><div className="flex h-12 items-center rounded-full border border-sky-200 bg-white"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} className="flex size-11 items-center justify-center" aria-label="Decrease quantity"><Minus className="size-4"/></button><span className="w-8 text-center font-bold">{quantity}</span><button onClick={()=>setQuantity(quantity+1)} className="flex size-11 items-center justify-center" aria-label="Increase quantity"><Plus className="size-4"/></button></div><Button onClick={addToBasket} className="h-12 flex-1 rounded-full bg-[#1c89bd]"><ShoppingBag/> Add to basket</Button><button className="flex size-12 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white" aria-label="Save product"><Heart className="size-5"/></button></div>{added&&<div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Added to your basket. <Link href="/" className="underline">Continue shopping</Link></div>}<div className="mt-8 rounded-2xl bg-violet-50 p-5"><p className="font-bold">Handmade with care</p><p className="mt-1 text-sm leading-6 text-slate-600">Small variations make every Anner Creatives piece beautifully unique. Delivery is available across Kenya.</p></div></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1300px] px-4 pb-14 sm:px-8 lg:px-12"><h2 className="font-serif text-2xl font-bold sm:text-3xl">You may also like</h2><div className="mt-5 grid grid-cols-3 gap-2 sm:gap-5">{related.map((item)=><a key={item.id} href={`/products/${item.id}`} className="min-w-0 rounded-xl border border-sky-100 bg-white p-1.5 sm:rounded-2xl sm:p-3"><div className="relative aspect-square overflow-hidden rounded-lg" style={{background:item.color}}>{item.image?<Image src={item.image} alt={item.name} fill className="object-cover"/>:<ShoppingBag className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-white/70"/>}</div><h3 className="mt-2 line-clamp-2 font-serif text-xs font-bold sm:text-lg">{item.name}</h3><p className="mt-1 text-[11px] font-bold sm:text-sm">{money(item.price)}</p></a>)}</div></section>
  </main>;
}
