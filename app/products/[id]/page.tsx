import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { starterProducts } from "@/lib/catalog";
import ProductDetail from "./product-detail";

const SITE_URL = "https://annercreatives.co.ke";

export function generateStaticParams() {
  return starterProducts.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = starterProducts.find((item) => item.id === Number(id));
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
  const product = starterProducts.find((item) => item.id === Number(id));
  if (!product) notFound();
  return <ProductDetail product={product} related={starterProducts.filter((item) => item.id !== product.id).slice(0, 3)} />;
}
