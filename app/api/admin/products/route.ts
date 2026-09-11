import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
  try { return Response.json({ products: await getDb().select().from(products).orderBy(desc(products.id)) }); }
  catch (error) { console.error(JSON.stringify({event:"admin_products_list_failed",error:error instanceof Error?error.message:"unknown"})); return Response.json({error:"Could not load products."},{status:500}); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {name?:string;category?:string;description?:string;price?:number;oldPrice?:number|null;imageKey?:string|null};
    if (!body.name?.trim() || !body.category?.trim() || !Number.isFinite(body.price) || Number(body.price)<=0) return Response.json({error:"Name, category and a valid price are required."},{status:400});
    const [product] = await getDb().insert(products).values({name:body.name.trim(),category:body.category.trim(),description:body.description?.trim()??"",price:Number(body.price),oldPrice:body.oldPrice?Number(body.oldPrice):null,imageKey:body.imageKey??null}).returning();
    return Response.json({product},{status:201});
  } catch (error) { console.error(JSON.stringify({event:"admin_product_create_failed",error:error instanceof Error?error.message:"unknown"})); return Response.json({error:"Could not save this product."},{status:500}); }
}
