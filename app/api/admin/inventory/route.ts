import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { inventoryMovements, products } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!await isAdminRequest()) return forbidden();
  try {
    const body = await request.json() as { productId?: number; quantity?: number; unitCost?: number; kind?: string; note?: string; paymentMethod?: string; reference?: string; occurredAt?: string };
    const quantity = Number(body.quantity);
    const unitCost = Number(body.unitCost);
    const date = body.occurredAt ? new Date(body.occurredAt) : new Date();
    if (!Number.isInteger(body.productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 1_000_000 || !Number.isFinite(unitCost) || unitCost < 0 || unitCost > 1_000_000_000 || !["purchase", "opening"].includes(body.kind ?? "") || Number.isNaN(date.getTime()) || (body.kind === "purchase" && !body.paymentMethod)) return Response.json({ error: "Choose a product, stock type, valid quantity, unit cost and payment method for purchases." }, { status: 400 });
    const db = getDb();
    const [product] = await db.select().from(products).where(eq(products.id, body.productId!));
    if (!product) return Response.json({ error: "Product not found." }, { status: 404 });
    const totalCost = Math.round(quantity * unitCost * 100) / 100;
    await db.batch([
      db.update(products).set({ stockQuantity: sql`${products.stockQuantity} + ${quantity}`, unitCost: sql`ROUND((${products.stockQuantity} * ${products.unitCost} + ${totalCost}) / (${products.stockQuantity} + ${quantity}), 2)` }).where(eq(products.id, product.id)),
      db.insert(inventoryMovements).values({ productId: product.id, kind: body.kind!, quantity, unitCost, totalCost, note: body.note?.trim() || null, paymentMethod: body.kind === "purchase" ? body.paymentMethod?.trim() || null : null, reference: body.reference?.trim() || null, occurredAt: date.toISOString() }),
    ]);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(JSON.stringify({ event: "admin_inventory_failed", error: error instanceof Error ? error.message : "unknown" }));
    return Response.json({ error: "Could not record the stock entry." }, { status: 500 });
  }
}
