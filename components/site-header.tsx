"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader({ showSearch = false, onSearch, cartCount = 0, onCart }: { showSearch?: boolean; onSearch?: () => void; cartCount?: number; onCart?: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/95 shadow-[0_1px_12px_rgba(23,35,59,.06)] backdrop-blur-xl">
    <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-3 sm:h-[88px] sm:px-8 lg:px-12">
      <Link href="/" className="flex h-[72px] w-[92px] items-center sm:h-[84px] sm:w-[116px]" aria-label="Anner Creatives home"><Image src="/anner-mark-v2.png" alt="Anner Creatives" width={180} height={180} priority className="h-[70px] w-auto max-w-[92px] object-contain sm:h-[82px] sm:max-w-[116px]"/></Link>
      <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">{links.map((link)=><Link key={link.href} href={link.href} className="text-slate-600 hover:text-sky-700">{link.label}</Link>)}</nav>
      <div className="flex items-center gap-2">
        {showSearch&&<button onClick={onSearch} className="flex size-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50" aria-label="Search products"><Search className="size-4"/></button>}
        {onCart&&<button onClick={onCart} className="relative flex h-9 items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 text-xs font-semibold sm:h-11 sm:text-sm" aria-label="Open cart"><ShoppingBag className="size-4"/><span className="hidden sm:inline">Cart</span>{cartCount>0&&<span className="flex size-4 items-center justify-center rounded-full bg-[#e12b87] text-[10px] text-white sm:size-5">{cartCount}</span>}</button>}
        <button onClick={()=>setOpen((value)=>!value)} className="flex size-9 items-center justify-center rounded-full border border-sky-200 bg-white md:hidden" aria-label={open?"Close menu":"Open menu"}>{open?<X className="size-4"/>:<Menu className="size-4"/>}</button>
      </div>
    </div>
    {open&&<nav className="border-t border-sky-100 bg-white px-4 py-3 md:hidden">{links.map((link)=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">{link.label}</Link>)}</nav>}
  </header>;
}
