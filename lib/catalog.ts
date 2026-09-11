export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  color: string;
  description: string;
  details: string[];
};

export const starterProducts: Product[] = [
  { id: 1, name: "Sage Corduroy Backpack", category: "Backpacks", price: 2850, oldPrice: 3400, image: "/featured-backpack.jpg", images: ["/featured-backpack.jpg"], color: "#d9e9bb", description: "Soft corduroy, roomy pockets and a playful woven zip charm.", details: ["Soft ribbed corduroy finish", "Roomy main compartment", "Front and side pockets", "Adjustable shoulder straps"] },
  { id: 2, name: "Lavender Market Tote", category: "Tote bags", price: 1800, oldPrice: 2200, image: "", images: [], color: "#ded5f5", description: "A hand-crocheted everyday tote with comfortable woven handles.", details: ["Crocheted by hand", "Comfortable woven handles", "Lightweight everyday design", "Made in small batches"] },
  { id: 3, name: "Sky Mini Crossbody", category: "Crossbody", price: 1450, image: "", images: [], color: "#cbeefe", description: "A light little companion for phone, keys and the essentials.", details: ["Compact everyday size", "Adjustable crossbody strap", "Secure main compartment", "Lightweight finish"] },
  { id: 4, name: "Cloud Crochet Mat", category: "Home", price: 1200, oldPrice: 1500, image: "", images: [], color: "#f0eafd", description: "A soft textured accent, crocheted slowly and finished by hand.", details: ["Hand-crocheted texture", "Soft decorative finish", "Made in small batches", "Easy-care construction"] },
];

export const money = (value: number) => `KSh ${value.toLocaleString("en-KE")}`;
export const discount = (product: Product) => product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
export const productImageUrl = (key?: string | null) => !key ? "" : key.startsWith("/") ? key : `/api/images/${encodeURIComponent(key)}`;
