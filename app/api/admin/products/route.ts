import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { inventoryMovements, products } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  if (!await isAdminRequest()) return forbidden();
  try { return Response.json({ products: await getDb().select().from(products).orderBy(desc(products.id)) }); }
  catch (error) { console.error(JSON.stringify({event:"admin_products_list_failed",error:error instanceof Error?error.message:"unknown"})); return Response.json({error:"Could not load products."},{status:500}); }
}

export async function POST(request: Request) {
  if (!await isAdminRequest()) return forbidden();
  try {
    const body = await request.json() as {name?:string;category?:string;description?:string;price?:number;oldPrice?:number|null;imageKey?:string|null;unitCost?:number;stockQuantity?:number};
    if (!body.name?.trim() || !body.category?.trim() || !Number.isFinite(body.price) || Number(body.price)<=0 || !Number.isFinite(body.unitCost) || Number(body.unitCost)<0 || !Number.isInteger(body.stockQuantity) || Number(body.stockQuantity)<0) return Response.json({error:"Name, category, price, unit cost and whole-number stock quantity are required."},{status:400});
    const db = getDb();
    const [product] = await db.insert(products).values({name:body.name.trim(),category:body.category.trim(),description:body.description?.trim()??"",price:Number(body.price),oldPrice:body.oldPrice?Number(body.oldPrice):null,imageKey:body.imageKey??null,unitCost:Number(body.unitCost),stockQuantity:Number(body.stockQuantity),stockTracked:true}).returning();
    if (product.stockQuantity > 0) await db.insert(inventoryMovements).values({productId:product.id,kind:"opening",quantity:product.stockQuantity,unitCost:product.unitCost,totalCost:Math.round(product.stockQuantity*product.unitCost*100)/100,note:"Opening quantity entered with product",occurredAt:new Date().toISOString()});
    return Response.json({product},{status:201});
  } catch (error) { console.error(JSON.stringify({event:"admin_product_create_failed",error:error instanceof Error?error.message:"unknown"})); return Response.json({error:"Could not save this product."},{status:500}); }
}
