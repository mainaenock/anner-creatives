import { getDb } from "@/db";
import { expenses } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

const categories = new Set(["Consumables", "Packaging", "Transport", "Rent", "Utilities", "Marketing", "Wages", "Software", "Other"]);
const methods = new Set(["M-PESA", "Bank", "Cash", "Card", "Other"]);

export async function POST(request: Request) {
  if (!await isAdminRequest()) return forbidden();
  try {
    const body = await request.json() as { description?: string; category?: string; amount?: number; vendor?: string; paymentMethod?: string; reference?: string; occurredAt?: string };
    const amount = Number(body.amount);
    const date = body.occurredAt ? new Date(body.occurredAt) : new Date();
    if (!body.description?.trim() || !categories.has(body.category ?? "") || !Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000 || !methods.has(body.paymentMethod ?? "") || Number.isNaN(date.getTime())) return Response.json({ error: "Enter a description, category, positive amount, payment method and valid date." }, { status: 400 });
    const [expense] = await getDb().insert(expenses).values({ description: body.description.trim(), category: body.category!, amount: Math.round(amount * 100) / 100, vendor: body.vendor?.trim() || null, paymentMethod: body.paymentMethod!, reference: body.reference?.trim() || null, occurredAt: date.toISOString(), createdAt: new Date().toISOString() }).returning();
    return Response.json({ expense }, { status: 201 });
  } catch (error) {
    console.error(JSON.stringify({ event: "admin_expense_failed", error: error instanceof Error ? error.message : "unknown" }));
    return Response.json({ error: "Could not record the expense." }, { status: 500 });
  }
}
