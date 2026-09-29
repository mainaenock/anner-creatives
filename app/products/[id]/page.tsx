import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productImageUrl } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { and, eq, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import ProductDetail from "./product-detail";

const SITE_URL = "https://annercreatives.co.ke";
export const dynamic = "force-dynamic";

function toProduct(row:typeof products.$inferSelect):Product { return { id:row.id, name:row.name,category:row.category,description:row.description,price:row.price,oldPrice:row.oldPrice??undefined,image:productImageUrl(row.imageKey),images:row.imageKey?[productImageUrl(row.imageKey)]:[],color:"#d9e9f8",details:["Handmade by Anner Creatives","Made in small batches"],stockQuantity:row.stockTracked?row.stockQuantity:undefined }; }

async function findProduct(id: string): Promise<Product | undefined> {
  try {
    const [row] = await getDb().select().from(products).where(eq(products.id, Number(id))).limit(1);
    if (row?.active) return toProduct(row);
  } catch { /* The catalog may be temporarily unavailable. */ }
  return undefined;
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
  const related = await getDb().select().from(products).where(and(eq(products.active,true),ne(products.id,product.id))).limit(3);
  return <ProductDetail product={product} related={related.map(toProduct)} />;
}
