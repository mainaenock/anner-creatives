"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Edit3, ImagePlus, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Row = { id:number; name:string; category:string; description:string; price:number; oldPrice:number|null; imageKey:string|null; active:boolean };
type Form = { name:string; category:string; description:string; price:string; oldPrice:string; imageKey:string|null; imageUrl:string };
const empty: Form = { name:"", category:"Bags", description:"", price:"", oldPrice:"", imageKey:null, imageUrl:"" };

export default function AdminPage() {
  const [products,setProducts]=useState<Row[]>([]);
  const [form,setForm]=useState<Form>(empty);
  const [editing,setEditing]=useState<number|null>(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState("");

  async function load() { setLoading(true); try { const response=await fetch("/api/admin/products",{cache:"no-store"}); if(!response.ok) throw new Error(); const data=await response.json() as {products:Row[]}; setProducts(data.products); } catch { setMessage("Products could not be loaded. Check the D1 binding and Access policy."); } finally { setLoading(false); } }
  useEffect(()=>{void load();},[]);

  async function upload(file:File) { const body=new FormData(); body.set("file",file); const response=await fetch("/api/admin/images",{method:"POST",body}); const data=await response.json() as {key?:string;url?:string;error?:string}; if(!response.ok||!data.key) throw new Error(data.error||"Upload failed"); setForm((current)=>({...current,imageKey:data.key!,imageUrl:data.url||""})); }
  async function save(event:FormEvent) { event.preventDefault(); setSaving(true); setMessage(""); try { const body={name:form.name,category:form.category,description:form.description,price:Number(form.price),oldPrice:form.oldPrice?Number(form.oldPrice):null,imageKey:form.imageKey}; const response=await fetch(editing?`/api/admin/products/${editing}`:"/api/admin/products",{method:editing?"PATCH":"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}); const data=await response.json() as {error?:string}; if(!response.ok) throw new Error(data.error||"Save failed"); setForm(empty); setEditing(null); setMessage(editing?"Product updated.":"Product added."); await load(); } catch(error){setMessage(error instanceof Error?error.message:"Could not save product.");} finally{setSaving(false);} }
  function edit(product:Row){setEditing(product.id);setForm({name:product.name,category:product.category,description:product.description,price:String(product.price),oldPrice:product.oldPrice?String(product.oldPrice):"",imageKey:product.imageKey,imageUrl:product.imageKey?`/api/images/${encodeURIComponent(product.imageKey)}`:""});window.scrollTo({top:0,behavior:"smooth"});}
  async function remove(product:Row){if(!confirm(`Remove ${product.name} from the shop?`))return;const response=await fetch(`/api/admin/products/${product.id}`,{method:"DELETE"});if(response.ok){setMessage("Product removed from the shop.");await load();}else setMessage("Could not remove the product.");}

  return <main className="min-h-screen bg-[#f6fbfe] text-[#17233b]"><SiteHeader/>
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12"><div><p className="eyebrow">Protected workspace</p><h1 className="mt-2 font-serif text-3xl font-bold sm:text-5xl">Admin dashboard</h1><p className="mt-2 text-sm text-slate-500">Add, edit and remove products stored in Cloudflare D1 and R2.</p></div>
      {message&&<div className="mt-5 rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm">{message}</div>}
      <div className="mt-7 grid gap-7 lg:grid-cols-[380px_1fr]">
        <form onSubmit={save} className="h-fit rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">{editing?"Edit product":"Add product"}</h2>{editing&&<button type="button" onClick={()=>{setEditing(null);setForm(empty)}} aria-label="Cancel editing"><X className="size-5"/></button>}</div><div className="mt-5 space-y-4"><Field label="Product name"><Input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></Field><Field label="Category"><Input required value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/></Field><Field label="Description"><textarea required value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="min-h-28 w-full rounded-xl border border-input p-3 text-sm outline-none focus:ring-2 focus:ring-sky-300"/></Field><div className="grid grid-cols-2 gap-3"><Field label="Price"><Input required min="1" type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}/></Field><Field label="Before price"><Input min="1" type="number" value={form.oldPrice} onChange={(e)=>setForm({...form,oldPrice:e.target.value})}/></Field></div><Field label="Product image"><label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 bg-sky-50 px-4 py-4 text-sm font-semibold text-sky-800"><ImagePlus className="size-4"/> Choose JPG, PNG or WebP<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={async(e)=>{const file=e.target.files?.[0];if(file)try{await upload(file)}catch(error){setMessage(error instanceof Error?error.message:"Upload failed")}}}/></label></Field>{form.imageUrl&&<div className="relative aspect-video overflow-hidden rounded-xl bg-sky-50"><Image src={form.imageUrl} alt="Product preview" fill unoptimized className="object-cover"/></div>}<Button disabled={saving} className="w-full rounded-full bg-sky-600">{saving?<Loader2 className="animate-spin"/>:editing?<Save/>:<Plus/>}{editing?"Save changes":"Add product"}</Button></div></form>
        <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm sm:p-6"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">Products</h2><span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">{products.filter((p)=>p.active).length} active</span></div>{loading?<div className="flex justify-center py-16"><Loader2 className="animate-spin text-sky-600"/></div>:products.length===0?<p className="py-16 text-center text-sm text-slate-500">No products have been added yet.</p>:<div className="mt-5 grid gap-3">{products.map((product)=><article key={product.id} className={`flex items-center gap-3 rounded-xl border p-3 ${product.active?"border-sky-100":"border-slate-100 opacity-55"}`}><div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sky-100">{product.imageKey&&<Image src={`/api/images/${encodeURIComponent(product.imageKey)}`} alt="" fill unoptimized className="object-cover"/>}</div><div className="min-w-0 flex-1"><h3 className="truncate font-bold">{product.name}</h3><p className="text-xs text-slate-500">{product.category} · KSh {product.price.toLocaleString("en-KE")}</p></div><button onClick={()=>edit(product)} className="flex size-9 items-center justify-center rounded-full bg-sky-50" aria-label={`Edit ${product.name}`}><Edit3 className="size-4"/></button><button onClick={()=>void remove(product)} className="flex size-9 items-center justify-center rounded-full bg-rose-50 text-rose-600" aria-label={`Remove ${product.name}`}><Trash2 className="size-4"/></button></article>)}</div>}</div>
      </div>
    </section>
  </main>;
}

function Field({label,children}:{label:string;children:React.ReactNode}){return <div><Label>{label}</Label><div className="mt-2">{children}</div></div>}
