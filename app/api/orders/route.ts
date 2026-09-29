import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, products } from "@/db/schema";

type BasketItem = { id?: number; quantity?: number };

export async function POST(request: Request) {
  try {
    const body = await request.json() as { customerName?: string; phone?: string; location?: string; items?: BasketItem[] };
    if (!body.customerName?.trim() || !body.phone?.trim() || !body.location?.trim() || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 50) return Response.json({ error: "Customer, delivery and basket details are required." }, { status: 400 });
    const quantities = new Map<number, number>();
    for (const item of body.items) {
      if (!Number.isInteger(item.id) || !Number.isInteger(item.quantity) || Number(item.quantity) < 1 || Number(item.quantity) > 100) return Response.json({ error: "The basket contains an invalid item." }, { status: 400 });
      quantities.set(Number(item.id), (quantities.get(Number(item.id)) ?? 0) + Number(item.quantity));
    }
    const db = getDb();
    const catalog = await db.select().from(products).where(inArray(products.id, [...quantities.keys()]));
    if (catalog.length !== quantities.size || catalog.some(product => !product.active || (product.stockTracked && product.stockQuantity < (quantities.get(product.id) ?? 0)))) return Response.json({ error: "An item is unavailable or does not have enough stock. Please refresh your basket." }, { status: 409 });
    const items = catalog.map(product => ({ productId: product.id, name: product.name, quantity: quantities.get(product.id)!, unitPrice: product.price, lineTotal: Math.round(product.price * quantities.get(product.id)! * 100) / 100 }));
    const subtotal = Math.round(items.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100;
    const deliveryFee = 250;
    const id = `AN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const [order] = await db.insert(orders).values({ id, customerName: body.customerName.trim(), phone: body.phone.trim(), location: body.location.trim(), itemsJson: JSON.stringify(items), subtotal, deliveryFee, createdAt: new Date().toISOString() }).returning();
    return Response.json({ order }, { status: 201 });
  } catch (error) {
    console.error(JSON.stringify({ event: "order_create_failed", error: error instanceof Error ? error.message : "unknown" }));
    return Response.json({ error: "Could not place the order. Please try again." }, { status: 500 });
  }
}
