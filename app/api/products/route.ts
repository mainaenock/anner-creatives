import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
  try { return Response.json({ products: await getDb().select().from(products).where(eq(products.active,true)).orderBy(desc(products.id)) }); }
  catch (error) { console.error(JSON.stringify({event:"products_list_failed",error:error instanceof Error?error.message:"unknown"})); return Response.json({error:"Products are temporarily unavailable."},{status:503}); }
}
