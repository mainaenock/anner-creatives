import Image from "next/image";
import { Camera, Mail, Phone, Users } from "lucide-react";

export function SiteFooter() {
  return <footer className="mt-auto bg-[#13213d] px-4 py-8 text-white sm:px-8 sm:py-11">
    <div className="mx-auto grid max-w-[1300px] gap-7 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex items-center gap-3"><Image src="/anner-logo.jpg" alt="Anner Creatives" width={48} height={48} className="size-11 rounded-xl object-cover"/><div><p className="font-serif text-lg font-bold">Anner Creatives</p><p className="text-xs text-sky-200 sm:text-sm">Crafted with passion, designed with creativity.</p></div></div>
      <div className="flex flex-wrap gap-2"><a href="tel:+254106819119" aria-label="Call Anner Creatives" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Phone className="size-4"/></a><a href="mailto:annercreatives7@gmail.com" aria-label="Email Anner Creatives" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Mail className="size-4"/></a><a href="https://www.instagram.com/__anner_creatives_/" target="_blank" rel="noreferrer" aria-label="Anner Creatives on Instagram" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Camera className="size-4"/></a><span title="Anna Creatives on Facebook" aria-label="Anna Creatives on Facebook" className="flex size-9 items-center justify-center rounded-full bg-white/10"><Users className="size-4"/></span></div>
    </div>
    <div className="mx-auto mt-6 flex max-w-[1300px] flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:justify-between"><p>Handmade with love in Kenya · © 2026</p><p>M-PESA Till: 8595044</p></div>
  </footer>;
}
