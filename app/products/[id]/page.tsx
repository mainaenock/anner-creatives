import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { starterProducts } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import ProductDetail from "./product-detail";

const SITE_URL = "https://annercreatives.co.ke";

async function findProduct(id: string): Promise<Product | undefined> {
  try {
    const [row] = await getDb().select().from(products).where(eq(products.id, Number(id))).limit(1);
    if (row?.active) return { id:row.id, name:row.name,category:row.category,description:row.description,price:row.price,oldPrice:row.oldPrice??undefined,image:row.imageKey?`/api/images/${encodeURIComponent(row.imageKey)}`:"",images:row.imageKey?[`/api/images/${encodeURIComponent(row.imageKey)}`]:[],color:"#d9e9f8",details:["Handmade by Anner Creatives","Made in small batches"] };
  } catch { /* Local builds may not have a D1 binding. */ }
  return starterProducts.find((item) => item.id === Number(id));
}

export function generateStaticParams() {
  return starterProducts.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) return {};
  const image = product.image || "/og.png";
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: { title: product.name, description: product.description, url: `${SITE_URL}/products/${product.id}`, siteName: "Anner Creatives", images: [{ url: image }], type: "website" },
    twitter: { card: "summary_large_image", title: product.name, description: product.description, images: [image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) notFound();
  return <ProductDetail product={product} related={starterProducts.filter((item) => item.id !== product.id).slice(0, 3)} />;
}
