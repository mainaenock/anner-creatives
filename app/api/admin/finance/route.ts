import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { expenses, inventoryMovements, orders, products } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  if (!await isAdminRequest()) return forbidden();
  try {
    const db = getDb();
    const [productRows, orderRows, expenseRows, movementRows] = await Promise.all([
      db.select().from(products).orderBy(desc(products.id)),
      db.select().from(orders).orderBy(desc(orders.createdAt)),
      db.select().from(expenses).orderBy(desc(expenses.occurredAt)),
      db.select().from(inventoryMovements).orderBy(desc(inventoryMovements.occurredAt)),
    ]);
    return Response.json({ products: productRows, orders: orderRows, expenses: expenseRows, inventoryMovements: movementRows });
  } catch (error) {
    console.error(JSON.stringify({ event: "admin_finance_failed", error: error instanceof Error ? error.message : "unknown" }));
    return Response.json({ error: "Could not load the books. Apply the latest database migration and try again." }, { status: 500 });
  }
}
