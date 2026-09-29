import { eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { inventoryMovements, orders, products } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

type SavedItem = { productId?: number; id?: number; quantity?: number };

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminRequest()) return forbidden();
  try {
    const { id } = await params;
    const body = await request.json() as { action?: string; paymentMethod?: string; paymentReference?: string };
    const db = getDb();
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return Response.json({ error: "Order not found." }, { status: 404 });
    if (order.status !== "awaiting_payment") return Response.json({ error: "This order has already been processed." }, { status: 409 });
    if (body.action === "cancel") {
      await db.update(orders).set({ status: "cancelled" }).where(eq(orders.id, id));
      return Response.json({ ok: true });
    }
    if (body.action !== "confirm_payment" || !["M-PESA", "Bank", "Cash", "Card", "Other"].includes(body.paymentMethod ?? "") || (body.paymentMethod === "M-PESA" && !body.paymentReference?.trim())) return Response.json({ error: "Select a payment method and enter the M-PESA reference." }, { status: 400 });
    const saved = JSON.parse(order.itemsJson) as SavedItem[];
    const quantities = new Map<number, number>();
    for (const item of saved) {
      const productId = Number(item.productId ?? item.id);
      const quantity = Number(item.quantity);
      if (!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1) return Response.json({ error: "This order has invalid item data." }, { status: 409 });
      quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
    }
    const productRows = await db.select().from(products).where(inArray(products.id, [...quantities.keys()]));
    if (productRows.length !== quantities.size || productRows.some(product => product.stockTracked && product.stockQuantity < quantities.get(product.id)!)) return Response.json({ error: "There is not enough stock. Record the received stock before confirming payment." }, { status: 409 });
    const occurredAt = new Date().toISOString();
    const costComplete = productRows.every(product => product.stockTracked);
    const trackedRows = productRows.filter(product => product.stockTracked);
    const costOfGoods = Math.round(trackedRows.reduce((sum, product) => sum + product.unitCost * quantities.get(product.id)!, 0) * 100) / 100;
    await db.batch([
      db.update(orders).set({ status: "paid", paidAt: occurredAt, paymentMethod: body.paymentMethod!, paymentReference: body.paymentReference?.trim() || null, costOfGoods, costComplete }).where(eq(orders.id, id)),
      ...trackedRows.map(product => db.update(products).set({ stockQuantity: sql`${products.stockQuantity} - ${quantities.get(product.id)!}` }).where(eq(products.id, product.id))),
      ...trackedRows.map(product => db.insert(inventoryMovements).values({ productId: product.id, kind: "sale", quantity: -quantities.get(product.id)!, unitCost: product.unitCost, totalCost: Math.round(product.unitCost * quantities.get(product.id)! * 100) / 100, note: `Order ${id}`, occurredAt, orderId: id })),
    ]);
    return Response.json({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({ event: "admin_order_update_failed", error: error instanceof Error ? error.message : "unknown" }));
    return Response.json({ error: "Could not update the order. Verify stock and try again." }, { status: 500 });
  }
}
