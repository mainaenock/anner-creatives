import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export function SiteFooter() {
  return <footer className="mt-auto bg-[#13213d] px-4 py-8 text-white sm:px-8 sm:py-11">
    <div className="mx-auto grid max-w-[1300px] gap-7 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex items-center gap-3"><Image src="/anner-logo.jpg" alt="Anner Creatives" width={48} height={48} className="size-11 rounded-xl object-cover"/><div><p className="font-serif text-lg font-bold">Anner Creatives</p><p className="text-xs text-sky-200 sm:text-sm">Crafted with passion, designed with creativity.</p></div></div>
      <div className="flex flex-wrap gap-2 text-xs font-semibold"><a href="https://wa.me/254106819119" target="_blank" rel="noreferrer" aria-label="Chat with Anner Creatives on WhatsApp" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-3 text-white transition hover:bg-[#20bd5a]"><SiWhatsapp className="size-4"/><span>WhatsApp</span></a><a href="https://www.instagram.com/__anner_creatives_/" target="_blank" rel="noreferrer" aria-label="Anner Creatives on Instagram" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-3 transition hover:bg-white/20"><SiInstagram className="size-4 text-pink-400"/><span>Instagram</span></a><a href="mailto:annercreatives7@gmail.com" aria-label="Email Anner Creatives" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-3 transition hover:bg-white/20"><Mail className="size-4 text-sky-300"/><span>Email</span></a><a href="tel:+254106819119" aria-label="Call Anner Creatives" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-3 transition hover:bg-white/20"><Phone className="size-4 text-violet-300"/><span>Call</span></a><span title="Anna Creatives on Facebook" aria-label="Anna Creatives on Facebook" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-3"><SiFacebook className="size-4 text-sky-400"/><span>Facebook</span></span></div>
    </div>
    <div className="mx-auto mt-6 flex max-w-[1300px] flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:justify-between"><p>Handmade with love in Kenya · © 2026</p><p>M-PESA Till: 8595044</p></div>
  </footer>;
}
